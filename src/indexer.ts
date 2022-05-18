import { StatusBarItem, GlobPattern, window, ProgressLocation, workspace, TextDocument, Uri, OutputChannel } from 'vscode'; // prettier-ignore
import { CancellationToken } from 'vscode-languageclient/node';
import * as glob from 'glob';
import * as minimatch from 'minimatch';
import { SystemVerilogParser } from './parser';
import { isSystemVerilogDocument, isVerilogDocument } from './utils/client';
import { SystemVerilogSymbol } from './symbol';

export class SystemVerilogIndexer {
    /*
     * this.symbols: filePath => Array<SystemVerilogSymbol>
     * each entry's key represents a file path,
     * and the entry's value is a list of the symbols that exist in the file
     */
    public symbols: Map<string, Array<SystemVerilogSymbol>>;
    public mostRecentSymbols: Array<SystemVerilogSymbol>;
    public building = false;
    public statusbar: StatusBarItem;
    public parser: SystemVerilogParser;
    public symbolsCount: number = 0;

    public NUM_FILES: number = 250;
    public parallelProcessing: number = 1;
    public filesGlob: string = undefined;
    public exclude: GlobPattern = undefined;
    public forceFastIndexing: Boolean = false;
    public maxLineCountIndexing: Number = 5000;
    public documentSymbolPrecision: string = 'full';

    public outputChannel: OutputChannel;

    constructor(statusbar: StatusBarItem, parser: SystemVerilogParser, channel: OutputChannel) {
        this.statusbar = statusbar;
        this.parser = parser;
        this.outputChannel = channel;
        this.symbols = new Map<string, Array<SystemVerilogSymbol>>();
    }

    public initialize() {
        const settings = workspace.getConfiguration();
        this.parallelProcessing = settings.get('systemverilog.parallelProcessing');
        this.forceFastIndexing = settings.get('systemverilog.forceFastIndexing');
        this.maxLineCountIndexing = settings.get('systemverilog.maxLineCountIndexing');
        this.documentSymbolPrecision = settings.get('systemverilog.documentSymbolsPrecision');
    }

    /**
        Scans the `workspace` for SystemVerilog and Verilog files,
        Looks up all the `symbols` that it exist on the queried files,
        and saves the symbols as `SystemVerilogSymbol` objects to `this.symbols`.

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
                async (_progress, token) => {
                    if (!this.building) {
                        this.building = true;
                        this.symbols = new Map<string, Array<SystemVerilogSymbol>>();
                        const uris: Uri[] = await this.find_files(token);
                        console.time('build_index'); // eslint-disable-line no-console
                        for (let filenr = 0; filenr < uris.length; filenr += this.parallelProcessing) {
                            const subset = uris.slice(filenr, filenr + this.parallelProcessing);
                            if (token.isCancellationRequested) {
                                cancelled = true;
                                break;
                            }
                            await Promise.all(subset.map((uri) => this.processFile(uri, uris.length))); // eslint-disable-line no-await-in-loop
                        }
                    } else {
                        return Promise.reject();
                    }
                }
            )
            .then(() => {
                console.timeEnd('build_index'); // eslint-disable-line no-console
                this.building = false;
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
        Processes one file and updates this.symbols with an entry if symbols exist in the file.

        @param uri uri to the document
        @param total_files total number of files to determine parse-precision
    */
    public async processFile(uri: Uri, total_files = 0) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            resolve(
                workspace.openTextDocument(uri).then((doc) => {
                    if (total_files >= 1000 * this.parallelProcessing || this.forceFastIndexing) {
                        return this.parser.get_all_recursive(doc, 'fast', 0);
                    }
                    if (total_files >= 100 * this.parallelProcessing) {
                        return this.parser.get_all_recursive(doc, 'declaration', 0);
                    }
                    if (doc.lineCount > this.maxLineCountIndexing) {
                        window.showInformationMessage(
                            `The character count of ${workspace.asRelativePath(uri)} is larger than ${this.maxLineCountIndexing}. Falling back to fast parse. To fully parse this file, please set 'systemverilog.maxLineCountIndexing > ${doc.lineCount} in the systemverilog extension settings.`
                        ); // prettier-ignore
                        return this.parser.get_all_recursive(doc, 'fast', 0);
                    }
                    // Otherwise, we parse the file with the precision requested by the user
                    return this.parser.get_all_recursive(doc, this.documentSymbolPrecision, 1);
                })
            );
        })
            .then((output: Array<SystemVerilogSymbol>) => {
                if (output.length > 0) {
                    if (this.symbols.has(uri.fsPath)) {
                        this.symbolsCount += output.length - this.symbols.get(uri.fsPath).length;
                    } else {
                        this.symbolsCount += output.length;
                    }
                    this.symbols.set(uri.fsPath, output);
                    if (total_files === 0) {
                        // If total files is 0, it is being used onChange
                        this.statusbar.text = `SystemVerilog: ${this.symbolsCount} indexed objects`;
                    }
                }
            })
            .catch((error) => {
                this.outputChannel.appendLine(`SystemVerilog: Indexing: Unable to process file: ${uri.toString()}`);
                this.outputChannel.appendLine(error);
                if (this.symbols.has(uri.fsPath)) {
                    this.symbolsCount -= this.symbols.get(uri.fsPath).length;
                    this.symbols.delete(uri.fsPath);
                }
                return undefined;
            });
    }

    /**
        Removes the given `document`'s symbols from `this.symbols`,
        Gets the current symbols which exist on the document to add to `this.symbols`.
        Updates the status bar with the current symbols count in the workspace.

        @param document the document that's been changed
        @return status message when indexing is successful or failed with an error.
    */
    public async onChange(document: TextDocument): Promise<any> {
        return new Promise(() => {
            if (!isSystemVerilogDocument(document) && !isVerilogDocument(document)) {
                return;
            }
            if (!workspace.getConfiguration().get('systemverilog.enableIncrementalIndexing')) {
                return;
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
        });
    }

    /**
        Adds the given `document`'s symbols to `this.symbols`.
        Updates the status bar with the current symbols count in the workspace.

        @param uri the document's Uri
        @return status message when indexing is successful or failed with an error.
    */
    public async onCreate(uri: Uri): Promise<any> {
        return new Promise(() => workspace.openTextDocument(uri).then((document) => this.onChange(document)));
    }

    /**
        Removes the given `document`'s symbols from `this.symbols`.
        Updates the status bar with the current symbols count in the workspace.

        @param uri the document's Uri
        @return status message when indexing is successful or failed with an error.
    */
    public async onDelete(uri: Uri): Promise<any> {
        return new Promise(() => workspace.openTextDocument(uri).then((document) => this.onChange(document)));
    }

    /**
        Adds the given `document`'s symbols to `symbolsMap`.

        @param fsPath the file path to the document
        @param symbolsMap the symbols map
        @return number of added files
    */
    addDocumentSymbols(document: TextDocument, symbolsMap: Map<string, Array<SystemVerilogSymbol>>): Thenable<number> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            if (!document || !symbolsMap) {
                resolve(new Array<SystemVerilogSymbol>());
                return;
            }

            if (!isSystemVerilogDocument(document) && !isVerilogDocument(document)) {
                resolve(new Array<SystemVerilogSymbol>());
                return;
            }

            resolve(
                workspace
                    .openTextDocument(document.uri)
                    .then((doc) => this.parser.get_all_recursive(doc, 'declaration', 1))
            );
        }).then((output: Array<SystemVerilogSymbol>) => {
            if (output.length > 0) {
                symbolsMap.set(document.uri.fsPath, output);
            }
            return output.length;
        });
    }

    /**
        Removes the given `document`'s symbols from `symbolsMap`.

        @param fsPath the file path to the document
        @param symbolsMap the symbols map
        @return number of deleted files multiplied by -1
    */
    removeDocumentSymbols(fsPath: string, symbolsMap: Map<string, Array<SystemVerilogSymbol>>): number {
        if (!fsPath || !symbolsMap) {
            return 0;
        }

        let deletedCount = 0;

        if (symbolsMap.has(fsPath)) {
            deletedCount = symbolsMap.get(fsPath).length;
            symbolsMap.delete(fsPath);
        }

        return deletedCount * -1;
    }

    /**
        Updates `mostRecentSymbols` with the most recently used symbols
        When `mostRecentSymbols` is undefined, add the top `this.NUM_FILES` symbol from `this.symbols`
        When `mostRecentSymbols` is defined, add the symbols in `recentSymbols` one by one to the top of the array

        @param recentSymbols the recent symbols
    */
    updateMostRecentSymbols(recentSymbols: Array<SystemVerilogSymbol>): void {
        if (this.mostRecentSymbols) {
            if (!recentSymbols) {
                return;
            }

            while (recentSymbols.length > 0) {
                const currentSymbol = recentSymbols.pop();

                // If symbol already exists, remove it
                for (let i = 0; i < this.mostRecentSymbols.length; i++) {
                    const symbol = this.mostRecentSymbols[i];
                    if (symbol === currentSymbol) {
                        this.mostRecentSymbols.splice(i, 1);
                        break;
                    }
                }

                // If the array has reached maximum capacity, remove the last element
                if (this.mostRecentSymbols.length >= this.NUM_FILES) {
                    this.mostRecentSymbols.pop();
                }

                // Add the symbol to the top of the array
                this.mostRecentSymbols.unshift(currentSymbol);
            }
        } else {
            let maxSymbols = new Array<SystemVerilogSymbol>();

            // Collect the top symbols in `this.symbols`
            for (const list of this.symbols.values()) {
                if (maxSymbols.length + list.length >= this.NUM_FILES) {
                    const limit = this.NUM_FILES - maxSymbols.length;
                    maxSymbols = maxSymbols.concat(list.slice(-1 * limit));
                    break;
                } else {
                    maxSymbols = maxSymbols.concat(list);
                }
            }

            this.mostRecentSymbols = maxSymbols;
        }
    }
}
