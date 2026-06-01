import { parentPort } from 'worker_threads';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { SystemVerilogParser, StringSource } from './parser-core';
import { ParseAndUpsertParams, ParseTextParams, SymbolWire, UpsertParams } from './wire-types';

// Storage layout (under <storageDir>):
//   manifest.json                   { version, files: { <fspath>: FileMeta } }
//   shards/<aa>/<sha1>.json         { path, mtimeMs, size, parsedAt, symbols: [...] }
//
// Why per-file shards: each save rewrites at most one small file plus the
// (debounced) manifest. There is no central blob to keep coherent.

const STORAGE_VERSION = 1;
const MANIFEST_DEBOUNCE_MS = 250;

const parser = new SystemVerilogParser();

type FileMeta = { mtimeMs: number; size: number; parsedAt: number };

export type Req = { id: number; method: string; params?: any };
export type Res =
    | { id: number; ok: true; result: any }
    | { id: number; ok: false; error: string };

const state = {
    storageDir: '' as string,
    shardsDir: '' as string,
    manifestPath: '' as string,
    files: new Map<string, FileMeta>(),
    byFile: new Map<string, SymbolWire[]>(),
    byName: new Map<string, SymbolWire[]>(),
    byNameLower: new Map<string, SymbolWire[]>(),
    byType: new Map<string, SymbolWire[]>(),
    total: 0,
    manifestDirty: false,
    manifestTimer: null as NodeJS.Timeout | null
};

function shardPathFor(fspath: string): string {
    const h = crypto.createHash('sha1').update(fspath).digest('hex');
    return path.join(state.shardsDir, h.slice(0, 2), `${h}.json`);
}

function pushTo<K>(map: Map<K, SymbolWire[]>, key: K, sym: SymbolWire): void {
    let arr = map.get(key);
    if (!arr) {
        arr = [];
        map.set(key, arr);
    }
    arr.push(sym);
}

function removeAllByFile(fspath: string): void {
    const syms = state.byFile.get(fspath);
    if (!syms) return;
    // Build the set of unique keys this file touches first, so each map is
    // filtered at most once per key. Without this, popular identifiers (e.g.
    // "clk" appearing thousands of times in one file) trigger one O(N)
    // filter per occurrence — quadratic on file size in the worst case.
    const names = new Set<string>();
    const namesLower = new Set<string>();
    const types = new Set<string>();
    for (const s of syms) {
        names.add(s.name);
        namesLower.add(s.name.toLowerCase());
        types.add(s.type);
    }
    for (const k of names) pruneKey(state.byName, k, fspath);
    for (const k of namesLower) pruneKey(state.byNameLower, k, fspath);
    for (const k of types) pruneKey(state.byType, k, fspath);
    state.byFile.delete(fspath);
    state.total -= syms.length;
}

function pruneKey(map: Map<string, SymbolWire[]>, key: string, fspath: string): void {
    const arr = map.get(key);
    if (!arr) return;
    const next = arr.filter((s) => s.file !== fspath);
    if (next.length === 0) map.delete(key);
    else map.set(key, next);
}

function indexSymbols(fspath: string, wireSyms: SymbolWire[]): void {
    state.byFile.set(fspath, wireSyms);
    for (const s of wireSyms) {
        pushTo(state.byName, s.name, s);
        pushTo(state.byNameLower, s.name.toLowerCase(), s);
        pushTo(state.byType, s.type, s);
    }
    state.total += wireSyms.length;
}

function ensureDirs(): void {
    fs.mkdirSync(state.shardsDir, { recursive: true });
}

function readJsonSafe(filePath: string): any | null {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch {
        return null;
    }
}

function writeFileAtomic(target: string, data: string): void {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    const tmp = `${target}.tmp-${process.pid}-${Date.now()}`;
    fs.writeFileSync(tmp, data);
    fs.renameSync(tmp, target);
}

function writeManifestNow(): void {
    if (state.manifestTimer) {
        clearTimeout(state.manifestTimer);
        state.manifestTimer = null;
    }
    if (!state.manifestDirty) return;
    state.manifestDirty = false;
    const out = { version: STORAGE_VERSION, files: Object.fromEntries(state.files) };
    writeFileAtomic(state.manifestPath, JSON.stringify(out));
}

function scheduleManifestWrite(): void {
    state.manifestDirty = true;
    if (state.manifestTimer) return;
    state.manifestTimer = setTimeout(() => {
        state.manifestTimer = null;
        try {
            writeManifestNow();
        } catch (err) {
            // Surface via the next RPC; for now log to stderr.
            console.error('manifest write failed:', err);
        }
    }, MANIFEST_DEBOUNCE_MS);
}

function loadFromDisk(): void {
    const manifest = readJsonSafe(state.manifestPath);
    if (!manifest || manifest.version !== STORAGE_VERSION || typeof manifest.files !== 'object') {
        // Cold start (no manifest) or version mismatch; wipe shards.
        if (fs.existsSync(state.shardsDir)) {
            fs.rmSync(state.shardsDir, { recursive: true, force: true });
        }
        ensureDirs();
        if (fs.existsSync(state.manifestPath)) fs.unlinkSync(state.manifestPath);
        return;
    }

    for (const [fspath, meta] of Object.entries(manifest.files as Record<string, FileMeta>)) {
        const shard = readJsonSafe(shardPathFor(fspath));
        if (!shard || !Array.isArray(shard.symbols)) {
            // Shard missing or corrupt — drop this entry; it'll be re-parsed.
            continue;
        }
        state.files.set(fspath, meta);
        const wireSyms: SymbolWire[] = shard.symbols.map((s: Omit<SymbolWire, 'file'>) => ({
            ...s,
            file: fspath
        }));
        indexSymbols(fspath, wireSyms);
    }
}

function applyExclude<T extends { type: string }>(rows: T[], excludeTypes?: string[]): T[] {
    if (!excludeTypes || excludeTypes.length === 0) return rows;
    const ex = new Set(excludeTypes);
    return rows.filter((r) => !ex.has(r.type));
}

function applyUpsert(
    fspath: string,
    mtimeMs: number,
    size: number,
    symbols: Array<Omit<SymbolWire, 'file'>>
): void {
    const parsedAt = Date.now();
    const wireSyms: SymbolWire[] = symbols.map((s) => ({ ...s, file: fspath }));
    // Write the shard first; if the disk write fails we leave state untouched.
    const shard = { path: fspath, mtimeMs, size, parsedAt, symbols };
    writeFileAtomic(shardPathFor(fspath), JSON.stringify(shard));

    removeAllByFile(fspath);
    indexSymbols(fspath, wireSyms);
    state.files.set(fspath, { mtimeMs, size, parsedAt });
    scheduleManifestWrite();
}

const handlers: Record<string, (params: any) => any> = {
    init({ storageDir }: { storageDir: string }) {
        state.storageDir = storageDir;
        state.shardsDir = path.join(storageDir, 'shards');
        state.manifestPath = path.join(storageDir, 'manifest.json');
        ensureDirs();
        loadFromDisk();
        return null;
    },

    upsertFile(params: UpsertParams) {
        applyUpsert(params.path, params.mtimeMs, params.size, params.symbols);
        return null;
    },

    /**
     * Parse a file's text in the worker, then store the result. Avoids
     * paying the parsing cost on the extension-host main thread, which is
     * the main source of UI hitches during initial indexing.
     */
    parseAndUpsert(params: ParseAndUpsertParams): number {
        const src = new StringSource(params.text, params.path);
        const wireSyms = parser.parse(src, params.precision, params.maxDepth);
        const stripped = wireSyms.map(({ file: _f, ...rest }) => rest);
        applyUpsert(params.path, params.mtimeMs, params.size, stripped);
        return wireSyms.length;
    },

    /**
     * Parse a file's text and return the symbols WITHOUT touching the index.
     * Used by providers (e.g. DocumentSymbolProvider) that need a result for
     * a file they don't want to commit at the chosen precision — so the
     * cached full-precision entry from initial indexing isn't lost.
     */
    parseText(params: ParseTextParams): SymbolWire[] {
        const src = new StringSource(params.text, params.path);
        return parser.parse(src, params.precision, params.maxDepth);
    },

    deleteFile({ path: fspath }: { path: string }) {
        removeAllByFile(fspath);
        state.files.delete(fspath);
        const shard = shardPathFor(fspath);
        if (fs.existsSync(shard)) {
            try {
                fs.unlinkSync(shard);
            } catch {
                /* swallow */
            }
        }
        scheduleManifestWrite();
        return null;
    },

    getFileMeta({ paths }: { paths: string[] }) {
        const out: Record<string, { mtimeMs: number; size: number }> = {};
        for (const p of paths) {
            const m = state.files.get(p);
            if (m) out[p] = { mtimeMs: m.mtimeMs, size: m.size };
        }
        return out;
    },

    getFileSymbols({ path: fspath, excludeTypes }: { path: string; excludeTypes?: string[] }) {
        const rows = state.byFile.get(fspath) || [];
        return applyExclude(rows, excludeTypes);
    },

    queryByName({
        name,
        excludeTypes,
        limit
    }: {
        name: string;
        excludeTypes?: string[];
        limit?: number;
    }) {
        const rows = state.byName.get(name) || [];
        const filtered = applyExclude(rows, excludeTypes);
        return limit && filtered.length > limit ? filtered.slice(0, limit) : filtered;
    },

    queryFuzzy({
        pattern,
        excludeTypes,
        limit
    }: {
        pattern: string;
        excludeTypes?: string[];
        limit?: number;
    }) {
        const lower = pattern.replace(/\s/g, '').toLowerCase();
        const max = limit ?? 500;
        if (lower.length === 0) {
            // Empty pattern matches anything; return up to `limit` results.
            const out: SymbolWire[] = [];
            for (const arr of state.byNameLower.values()) {
                for (const s of arr) {
                    if (excludeTypes && excludeTypes.includes(s.type)) continue;
                    out.push(s);
                    if (out.length >= max) return out;
                }
            }
            return out;
        }
        const re = new RegExp(`.*${lower.split('').join('.*')}.*`, 'i');
        const ex = excludeTypes ? new Set(excludeTypes) : null;
        const seen = new Set<string>();
        const out: SymbolWire[] = [];
        for (const [key, arr] of state.byNameLower) {
            if (!re.test(key)) continue;
            for (const s of arr) {
                if (ex && ex.has(s.type)) continue;
                const id = `${s.file}:${s.sl}:${s.sc}:${s.name}`;
                if (seen.has(id)) continue;
                seen.add(id);
                out.push(s);
                if (out.length >= max) return out;
            }
        }
        return out;
    },

    getAllByType({ type, limit }: { type: string; limit?: number }) {
        const rows = state.byType.get(type) || [];
        return limit && rows.length > limit ? rows.slice(0, limit) : rows;
    },

    getMostRecent({ limit }: { limit: number }) {
        // Build a parsedAt-desc ordering from `files` and walk byFile.
        const entries = [...state.files.entries()].sort(
            (a, b) => b[1].parsedAt - a[1].parsedAt
        );
        const out: SymbolWire[] = [];
        for (const [fspath] of entries) {
            const syms = state.byFile.get(fspath);
            if (!syms) continue;
            for (const s of syms) {
                out.push(s);
                if (out.length >= limit) return out;
            }
        }
        return out;
    },

    clearAll() {
        if (state.manifestTimer) {
            clearTimeout(state.manifestTimer);
            state.manifestTimer = null;
        }
        state.files.clear();
        state.byFile.clear();
        state.byName.clear();
        state.byNameLower.clear();
        state.byType.clear();
        state.total = 0;
        if (fs.existsSync(state.shardsDir)) {
            fs.rmSync(state.shardsDir, { recursive: true, force: true });
        }
        if (fs.existsSync(state.manifestPath)) fs.unlinkSync(state.manifestPath);
        ensureDirs();
        return null;
    },

    count() {
        return state.total;
    },

    flush() {
        writeManifestNow();
        return null;
    }
};

export function dispatch(req: Req): Res {
    try {
        const h = handlers[req.method];
        if (!h) return { id: req.id, ok: false, error: `Unknown method: ${req.method}` };
        const result = h(req.params);
        return { id: req.id, ok: true, result };
    } catch (e: any) {
        return { id: req.id, ok: false, error: e && e.stack ? e.stack : String(e) };
    }
}

if (parentPort) {
    parentPort.on('message', (req: Req) => {
        parentPort!.postMessage(dispatch(req));
    });
    process.on('beforeExit', () => {
        try {
            writeManifestNow();
        } catch {
            /* swallow */
        }
    });
}
