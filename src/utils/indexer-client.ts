import { Worker } from 'worker_threads';
import * as path from 'path';
import { ParseAndUpsertParams, ParseTextParams, SymbolWire, UpsertParams } from '../wire-types';

type RpcCall = { resolve: (v: any) => void; reject: (e: any) => void };

export interface IndexerClientOptions {
    storageDir: string;
    workerPath?: string; // path to compiled worker .js (when not inProcess)
    inProcess?: boolean; // run handlers in the same thread (tests)
    debounceMs?: number; // per-file upsert debounce window
    onCrash?: (err: Error) => void;
}

type PendingUpsert = { timer: NodeJS.Timeout; params: UpsertParams };

export class IndexerClient {
    private worker: Worker | null = null;
    private inProcess: boolean;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    private inProcessDispatch: ((req: any) => any) | null = null;
    /* eslint-enable @typescript-eslint/no-explicit-any */
    private nextId = 1;
    private pending = new Map<number, RpcCall>();
    private debounceMs: number;
    private debouncers = new Map<string, PendingUpsert>();
    private storageDir: string;
    private workerPath: string;
    private onCrash: (err: Error) => void;
    private ready: Promise<void>;
    private disposed = false;

    constructor(opts: IndexerClientOptions) {
        this.storageDir = opts.storageDir;
        this.workerPath = opts.workerPath || path.join(__dirname, 'indexer-worker.js');
        this.inProcess = !!opts.inProcess;
        this.debounceMs = opts.debounceMs ?? 300;
        this.onCrash = opts.onCrash || (() => undefined);
        this.ready = this.start();
    }

    private start(): Promise<void> {
        if (this.inProcess) {
            // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
            const mod = require('../indexer-worker');
            this.inProcessDispatch = mod.dispatch;
            const res = this.inProcessDispatch!({
                id: 0,
                method: 'init',
                params: { storageDir: this.storageDir }
            });
            if (!res.ok) return Promise.reject(new Error(res.error));
            return Promise.resolve();
        }

        this.worker = new Worker(this.workerPath);
        this.worker.on(
            'message',
            (msg: { id: number; ok: boolean; result?: unknown; error?: string }) => {
                const call = this.pending.get(msg.id);
                if (!call) return;
                this.pending.delete(msg.id);
                if (msg.ok) call.resolve(msg.result);
                else call.reject(new Error(msg.error));
            }
        );
        this.worker.on('error', (err) => this.handleCrash(err));
        this.worker.on('exit', (code) => {
            if (code !== 0 && !this.disposed) {
                this.handleCrash(new Error(`indexer worker exited with code ${code}`));
            }
        });
        return this.send('init', { storageDir: this.storageDir });
    }

    private handleCrash(err: Error): void {
        // Reject all pending calls so callers don't hang forever.
        for (const [, call] of this.pending) call.reject(err);
        this.pending.clear();
        this.worker = null;
        this.onCrash(err);
    }

    private send<T = unknown>(method: string, params?: unknown): Promise<T> {
        if (this.inProcess) {
            const res = this.inProcessDispatch!({ id: 0, method, params });
            if (!res.ok) return Promise.reject(new Error(res.error));
            return Promise.resolve(res.result as T);
        }
        if (!this.worker) return Promise.reject(new Error('indexer worker is not running'));
        const id = this.nextId++;
        return new Promise<T>((resolve, reject) => {
            this.pending.set(id, { resolve: resolve as (v: unknown) => void, reject });
            this.worker!.postMessage({ id, method, params });
        });
    }

    /** Block until the worker has finished `init`. */
    public whenReady(): Promise<void> {
        return this.ready;
    }

    /** Schedule a per-file upsert. Coalesces rapid edits to the same path. */
    public scheduleUpsert(params: UpsertParams): void {
        const existing = this.debouncers.get(params.path);
        if (existing) {
            clearTimeout(existing.timer);
        }
        const timer = setTimeout(() => {
            this.debouncers.delete(params.path);
            // Fire and forget; surface errors via onCrash channel.
            this.send('upsertFile', params).catch((err) => this.onCrash(err as Error));
        }, this.debounceMs);
        this.debouncers.set(params.path, { timer, params });
    }

    /** Flush any pending debounced upsert for a single path immediately. */
    public async flush(filePath?: string): Promise<void> {
        if (filePath) {
            const pending = this.debouncers.get(filePath);
            if (!pending) return;
            clearTimeout(pending.timer);
            this.debouncers.delete(filePath);
            await this.send('upsertFile', pending.params);
            return;
        }
        const all = [...this.debouncers.values()];
        this.debouncers.clear();
        await Promise.all(
            all.map((p) => {
                clearTimeout(p.timer);
                return this.send('upsertFile', p.params);
            })
        );
    }

    public async upsertFileNow(params: UpsertParams): Promise<void> {
        const existing = this.debouncers.get(params.path);
        if (existing) {
            clearTimeout(existing.timer);
            this.debouncers.delete(params.path);
        }
        await this.send('upsertFile', params);
    }

    /**
     * Parse a file's text in the worker and store the result. Returns the
     * number of symbols found. Use this instead of upsertFile when the
     * caller has the raw text but does not want to parse on the main thread.
     */
    public parseAndUpsert(params: ParseAndUpsertParams): Promise<number> {
        const existing = this.debouncers.get(params.path);
        if (existing) {
            clearTimeout(existing.timer);
            this.debouncers.delete(params.path);
        }
        return this.send<number>('parseAndUpsert', params);
    }

    /** Parse a file's text and return symbols WITHOUT mutating the index. */
    public parseText(params: ParseTextParams): Promise<SymbolWire[]> {
        return this.send<SymbolWire[]>('parseText', params);
    }

    public async deleteFile(filePath: string): Promise<void> {
        const existing = this.debouncers.get(filePath);
        if (existing) {
            clearTimeout(existing.timer);
            this.debouncers.delete(filePath);
        }
        await this.send('deleteFile', { path: filePath });
    }

    public getFileMeta(paths: string[]): Promise<Record<string, { mtimeMs: number; size: number }>> {
        return this.send('getFileMeta', { paths });
    }

    public getFileSymbols(filePath: string, excludeTypes?: string[]): Promise<SymbolWire[]> {
        return this.send('getFileSymbols', { path: filePath, excludeTypes });
    }

    public queryByName(
        name: string,
        opts?: { excludeTypes?: string[]; limit?: number }
    ): Promise<SymbolWire[]> {
        return this.send('queryByName', { name, ...opts });
    }

    public queryFuzzy(
        pattern: string,
        opts?: { excludeTypes?: string[]; limit?: number }
    ): Promise<SymbolWire[]> {
        return this.send('queryFuzzy', { pattern, ...opts });
    }

    public getAllByType(type: string, limit?: number): Promise<SymbolWire[]> {
        return this.send('getAllByType', { type, limit });
    }

    public getMostRecent(limit: number): Promise<SymbolWire[]> {
        return this.send('getMostRecent', { limit });
    }

    public clearAll(): Promise<void> {
        return this.send('clearAll');
    }

    public count(): Promise<number> {
        return this.send('count');
    }

    /** Force a synchronous manifest write (best-effort on shutdown). */
    public flushManifest(): Promise<void> {
        return this.send('flush');
    }

    public async dispose(): Promise<void> {
        this.disposed = true;
        await this.flush().catch(() => undefined);
        await this.flushManifest().catch(() => undefined);
        if (this.worker) {
            await this.worker.terminate();
            this.worker = null;
        }
    }
}
