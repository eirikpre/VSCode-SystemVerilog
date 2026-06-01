import { StatusBarItem, GlobPattern, window, ProgressLocation, workspace, TextDocument, Uri, OutputChannel } from 'vscode'; // prettier-ignore
import { CancellationToken } from 'vscode-languageclient/node';
import * as fs from 'fs';
import * as glob from 'glob';
import * as minimatch from 'minimatch';
import { isSystemVerilogDocument, isVerilogDocument, isVerilogAMSDocument } from './utils/client';
import { IndexerClient } from './utils/indexer-client';
import { SystemVerilogSymbol, wireToSymbol } from './symbol';

export class SystemVerilogIndexer {
    public client: IndexerClient;
    public mostRecentSymbols: Array<SystemVerilogSymbol>;
    public building = false;
    public statusbar: StatusBarItem;
    public symbolsCount: number = 0;

    public NUM_FILES: number = 250;
    public filesGlob: string = undefined;
    public exclude: GlobPattern = undefined;
    public forceFastIndexing: Boolean = false;
    public maxLineCountIndexing: Number = 5000;
    public documentSymbolPrecision: string = 'full';

    public outputChannel: OutputChannel;

    constructor(statusbar: StatusBarItem, channel: OutputChannel, client: IndexerClient) {
        this.statusbar = statusbar;
        this.outputChannel = channel;
        this.client = client;
    }

    public initialize() {
        const settings = workspace.getConfiguration();
        this.forceFastIndexing = settings.get('systemverilog.forceFastIndexing');
        this.maxLineCountIndexing = settings.get('systemverilog.maxLineCountIndexing');
        this.documentSymbolPrecision = settings.get('systemverilog.documentSymbolsPrecision');
    }

    /** Resolves the parse precision for one file given the active settings. */
    public resolvePrecision(lineCount: number): string {
        if (this.forceFastIndexing) return 'fast';
        if (lineCount > this.maxLineCountIndexing.valueOf()) return 'fast';
        return this.documentSymbolPrecision;
    }

    public maxDepthForPrecision(precision: string): number {
        return precision === 'full' || precision === 'full_no_references' ? 1 : 0;
    }

    /**
        Scans the `workspace` for SystemVerilog and Verilog files,
        Looks up all the `symbols` that exist on the queried files,
        and saves the symbols to the SQLite-backed index.

        @return status message when indexing is successful or failed with an error.
    */
    public async build_index(): Promise<any> {
        let cancelled = false;
        this.symbolsCount = 0;
        this.statusbar.text = 'SystemVerilog: Indexing..';
        this.initialize();

        return window
            .withProgress(
                {
                    location: ProgressLocation.Notification,
                    title: 'SystemVerilog Indexing...',
                    cancellable: true
                },
                async (progress, token) => {
                    if (this.building) {
                        return Promise.reject();
                    }
                    this.building = true;
                    await this.client.clearAll();
                    const uris: Uri[] = await this.find_files(token);
                    console.time('build_index'); // eslint-disable-line no-console

                    const total = uris.length;
                    let lastReportedPct = 0;

                    // Yield to the event loop so VSCode can process UI events
                    // and respond to other provider requests between files.
                    const yieldToEventLoop = (): Promise<void> => new Promise<void>((resolve) => setImmediate(resolve));

                    for (let i = 0; i < total; i += 1) {
                        if (token.isCancellationRequested) {
                            cancelled = true;
                            break;
                        }
                        // eslint-disable-next-line no-await-in-loop
                        await this.processFile(uris[i], total);

                        // eslint-disable-next-line no-await-in-loop
                        await yieldToEventLoop();

                        // Report progress at most every 1% to avoid notification spam.
                        const processed = i + 1;
                        const pct = Math.floor((processed / total) * 100);
                        if (pct > lastReportedPct) {
                            progress.report({
                                increment: pct - lastReportedPct,
                                message: `${processed}/${total} files`
                            });
                            this.statusbar.text = `SystemVerilog: Indexing ${processed}/${total}`;
                            lastReportedPct = pct;
                        }
                    }
                    return undefined;
                }
            )
            .then(async () => {
                console.timeEnd('build_index'); // eslint-disable-line no-console
                this.building = false;
                this.symbolsCount = await this.client.count();
                if (cancelled) {
                    this.statusbar.text = `SystemVerilog: Indexing cancelled at ${this.symbolsCount} indexed objects`;
                } else {
                    this.statusbar.text = `SystemVerilog: ${this.symbolsCount} indexed objects`;
                }
            });
    }

    /**
     * find_files
     */
    public async find_files(token: CancellationToken): Promise<Uri[]> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            const settings = workspace.getConfiguration();
            const globArray: string[] = settings.get('systemverilog.includeIndexing');
            const exclude: string = settings.get('systemverilog.excludeIndexing');
            let uris: Uri[] = [];

            const find = (str: string) => {
                if (str.startsWith('*')) {
                    return workspace.findFiles(str, exclude, undefined, token).then((files) => {
                        uris = uris.concat(files);
                    });
                }
                const files: string[] = glob.sync(str, { ignore: exclude });
                uris = uris.concat(files.map(Uri.file));
            };
            await Promise.all(globArray.map(find));
            resolve(uris);
        });
    }

    /**
        Processes one file: stat-gates against the on-disk cache (skip if
        mtime+size match), reads the file text, and delegates parsing +
        storage to the worker. The extension-host main thread does no CPU
        work in this path.

        @param uri uri to the document
        @param total_files total number of files (kept for API compat; no longer affects precision)
    */
    public async processFile(uri: Uri, total_files = 0): Promise<void> {
        const isSingleFilePath = total_files === 0;
        try {
            let mtimeMs = 0;
            let size = 0;
            try {
                const st = await fs.promises.stat(uri.fsPath);
                mtimeMs = st.mtimeMs;
                size = st.size;
                const meta = await this.client.getFileMeta([uri.fsPath]);
                const cached = meta[uri.fsPath];
                if (cached && cached.mtimeMs === mtimeMs && cached.size === size) {
                    return;
                }
            } catch {
                // If stat fails the file may have been deleted between glob
                // and process — fall through and let the parse fail cleanly.
            }

            // At this point we know we're going to actually re-parse this file.
            // Surface that in the status bar so the user knows incremental
            // indexing is happening on save.
            if (isSingleFilePath) {
                this.statusbar.text = 'SystemVerilog: Indexing...';
            }

            // Read text directly from disk (cheaper than workspace.openTextDocument,
            // which would also pull the file into VSCode's document model).
            const text = await fs.promises.readFile(uri.fsPath, 'utf8');
            // Cheap line-count: number of '\n' + 1. Avoids materialising a doc.
            let lineCount = 1;
            for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) === 10) lineCount += 1;
            const precision = this.resolvePrecision(lineCount);
            const maxDepth = this.maxDepthForPrecision(precision);

            await this.client.parseAndUpsert({
                path: uri.fsPath,
                mtimeMs,
                size,
                text,
                precision,
                maxDepth
            });

            if (isSingleFilePath) {
                this.symbolsCount = await this.client.count();
                this.statusbar.text = `SystemVerilog: ${this.symbolsCount} indexed objects`;
            }
        } catch (error) {
            this.outputChannel.appendLine(`SystemVerilog: Indexing: Unable to process file: ${uri.toString()}`);
            this.outputChannel.appendLine(String(error));
            try {
                await this.client.deleteFile(uri.fsPath);
            } catch {
                /* swallow */
            }
            // Restore the status bar even on error so it doesn't stay at "Indexing...".
            if (isSingleFilePath) {
                try {
                    this.symbolsCount = await this.client.count();
                    this.statusbar.text = `SystemVerilog: ${this.symbolsCount} indexed objects`;
                } catch {
                    /* swallow */
                }
            }
        }
    }

    /**
        Re-indexes the given document if it is a SystemVerilog/Verilog file
        and incremental indexing is enabled.
    */
    public async onChange(document: TextDocument): Promise<any> {
        if (!isSystemVerilogDocument(document) && !isVerilogDocument(document) && !isVerilogAMSDocument(document)) {
            return undefined;
        }
        if (!workspace.getConfiguration().get('systemverilog.enableIncrementalIndexing')) {
            return undefined;
        }
        if (
            !minimatch(
                document.uri.toString(),
                workspace.getConfiguration().get('systemverilog.excludeIndexing').toString()
            )
        ) {
            this.outputChannel.appendLine('Auto Indexing: ' + document.uri.toString());
            return this.processFile(document.uri);
        }
        return undefined;
    }

    public async onCreate(uri: Uri): Promise<any> {
        const document = await workspace.openTextDocument(uri);
        return this.onChange(document);
    }

    public async onDelete(uri: Uri): Promise<any> {
        await this.client.deleteFile(uri.fsPath);
        this.symbolsCount = await this.client.count();
        this.statusbar.text = `SystemVerilog: ${this.symbolsCount} indexed objects`;
    }

    /**
        Updates `mostRecentSymbols` with the most recently used symbols.
        When `recentSymbols` is undefined, populates from the SQLite index
        using parsed_at ordering. When provided, splices the supplied entries
        to the top of the in-memory cap-N list.

        @param recentSymbols the recent symbols
    */
    public async updateMostRecentSymbols(recentSymbols: Array<SystemVerilogSymbol>): Promise<void> {
        if (this.mostRecentSymbols) {
            if (!recentSymbols) {
                return;
            }

            while (recentSymbols.length > 0) {
                const currentSymbol = recentSymbols.pop();

                for (let i = 0; i < this.mostRecentSymbols.length; i++) {
                    const symbol = this.mostRecentSymbols[i];
                    if (symbol === currentSymbol) {
                        this.mostRecentSymbols.splice(i, 1);
                        break;
                    }
                }

                if (this.mostRecentSymbols.length >= this.NUM_FILES) {
                    this.mostRecentSymbols.pop();
                }

                this.mostRecentSymbols.unshift(currentSymbol);
            }
            return;
        }

        const rows = await this.client.getMostRecent(this.NUM_FILES);
        this.mostRecentSymbols = rows.map(wireToSymbol);
    }
}
