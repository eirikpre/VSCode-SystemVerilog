import { FastMap } from 'collections/fast-map';
import { List } from 'collections/list';
import { SymbolInformation, StatusBarItem, GlobPattern, window, ProgressLocation, workspace, TextDocument, Uri, OutputChannel } from 'vscode';
import { SystemVerilogParser } from './parser';

export class SystemVerilogIndexerMap {
    /*
    * this.symbols: filePath => List<SymbolInformation>
    * each entry's key represents a file path,
    * and the entry's value is a list of the symbols that exist in the file
    */
    public symbols: FastMap<string, List<SymbolInformation>>;
    public building: Boolean = false;
    public statusbar: StatusBarItem;
    public parser: SystemVerilogParser;
    public symbolsCount: number;

    public NUM_FILES: number = 250;
    public parallelProcessing: number = 50;
    public systemVerilogFileExtensions = ["sv", "v", "svh", "vh"];
    public globPattern: string = "**/*.{" + this.systemVerilogFileExtensions.join(",") + "}";
    public exclude: GlobPattern = undefined;

    public outputChannel: OutputChannel;

    private regex = new RegExp([
        , /(?<=^\s*(?:virtual\s+)?)/
        , /(module|class|interface|package|program)\s+/
        , /(?:automatic\s+)?/
        , /(\w+)/
        , /[\w\W.]*?/
        , /(end\1)/
    ].map(x => x.source).join(''), 'mg');

    constructor(statusbar: StatusBarItem, parser: SystemVerilogParser, channel: OutputChannel) {
        this.statusbar = statusbar;
        this.parser = parser;
        this.outputChannel = channel;

        const settings = workspace.getConfiguration();
        const exclude: GlobPattern = settings.get('systemverilog.excludeIndexing');
        const parallelProcessing: number = settings.get('systemverilog.parallelProcessing');
        if (settings.get('systemverilog.disableIndexing')) {
            this.statusbar.text = "SystemVerilog: Indexing disabled"
        } else {
            if (exclude != "insert globPattern here") {
                this.exclude = exclude;
            }
            if (parallelProcessing) {
                this.parallelProcessing = parallelProcessing;
            }

            this.build_index();
        }
    };


    public dispose() {
        delete this.symbols
    }

    /**
        Scans the `workspace` for SystemVerilog and Verilog files,
        Looks up all the `symbols` that it exist on the queried files,
        and saves the symbols as `SymbolInformation` objects to `this.symbols`.

        @return status message when indexing is successful or failed with an error.
    */
    public async build_index(): Promise<any> {
        var cancelled = false;
        this.building = true;
        this.symbolsCount = 0;
        this.statusbar.text = "SystemVerilog: Indexing.."

        return await window.withProgress({
            location: ProgressLocation.Notification,
            title: "SystemVerilog Indexing...",
            cancellable: true
        }, async (_progress, token) => {
            this.symbols = new FastMap<string, List<SymbolInformation>>();
            let uris = await Promise.resolve(workspace.findFiles(this.globPattern, this.exclude, undefined, token));
            console.time('build_index');

            for (var filenr = 0; filenr < uris.length; filenr += this.parallelProcessing) {
                let subset = uris.slice(filenr, filenr + this.parallelProcessing)
                if (token.isCancellationRequested) {
                    cancelled = true;
                    break;
                }
                await Promise.all(subset.map(uri => {
                    return new Promise(async (resolve) => {
                        resolve(workspace.openTextDocument(uri).then(doc => {
                            return this.parser.get_symbols(doc, this.regex);
                        }))
                    }).then((output: List<SymbolInformation>) => {
                        if (output.length > 0) {
                            this.symbols.set(uri.fsPath, output);
                            this.symbolsCount += output.length;
                        }
                    }).catch((error) => {
                        this.outputChannel.appendLine("SystemVerilog: Indexing: Unable to process file: " + uri.toString());
                        this.outputChannel.appendLine(error);
                        return undefined
                    });
                }));
            }
        }).then(() => {
            this.building = false;
            console.timeEnd('build_index');
            if (cancelled) {
                this.statusbar.text = "SystemVerilog: Indexing cancelled";
            } else {
                this.statusbar.text = 'SystemVerilog: ' + this.symbolsCount + ' indexed objects'
            }
        });
    }


    /**
     * Builds the symbols index. Scans the workspace for symbols.
     */
    public async rebuild(): Promise<any> {
        if (!this.building) {
            let settings = workspace.getConfiguration();
            const exclude: GlobPattern = settings.get('systemverilog.excludeIndexing');
            const parallelProcessing: number = settings.get('systemverilog.parallelProcessing');
            if (exclude != "insert globPattern here") {
                this.exclude = exclude;
            }
            if (parallelProcessing) {
                this.parallelProcessing = parallelProcessing;
            }
            return await this.build_index();
        }
    }


    /**
        Removes the given `document`'s symbols from `this.symbols`,
        Gets the current symbols which exist on the document to add to `this.symbols`.
        Updates the status bar with the current symbols count in the workspace.

        @param document the document that's been saved
        @return status message when indexing is successful or failed with an error.
    */
    public async onSave(document: TextDocument): Promise<any> {
        this.building = true;

        return await new Promise(async (resolve) => {
            if (!this.isSystemVerilogDocument(document)) {
                return;
            }
            let count = this.removeDocumentSymbols(document.uri.fsPath, this.symbols);

            count += await this.addDocumentSymbols(document, this.symbols);

            resolve(count);
        }).then((count: number) => {
            this.building = false;
            this.symbolsCount += count;
            this.statusbar.text = 'SystemVerilog: ' + this.symbolsCount + ' indexed objects';
        }).catch((error) => {
            this.building = false;
            this.outputChannel.appendLine("SystemVerilog: Indexing: Unable to process file: " + document.uri.toString());
            this.outputChannel.appendLine(error);
        });
    }

    /**
        Adds the given `document`'s symbols to `this.symbols`.
        Updates the status bar with the current symbols count in the workspace.

        @param uri the document's Uri
        @return status message when indexing is successful or failed with an error.
    */
    public async onCreate(uri: Uri): Promise<any> {
        this.building = true;

        return await new Promise(async (resolve) => {
            resolve(workspace.openTextDocument(uri).then((document) => {
                return this.addDocumentSymbols(document, this.symbols);
            }));
        }).then((count: number) => {
            this.building = false;
            this.symbolsCount += count;
            this.statusbar.text = 'SystemVerilog: ' + this.symbolsCount + ' indexed objects';
        }).catch((error) => {
            this.building = false;
            this.outputChannel.appendLine("SystemVerilog: Indexing: Unable to process file: " + uri.toString());
            this.outputChannel.appendLine(error);
        });
    }

    /**
        Removes the given `document`'s symbols from `this.symbols`.
        Updates the status bar with the current symbols count in the workspace.

        @param uri the document's Uri
        @return status message when indexing is successful or failed with an error.
    */
    public async onDelete(uri: Uri): Promise<any> {
        this.building = true;

        return await new Promise(async (resolve) => {
            resolve(this.removeDocumentSymbols(uri.fsPath, this.symbols));
        }).then((count: number) => {
            this.building = false;
            this.symbolsCount += count;
            this.statusbar.text = 'SystemVerilog: ' + this.symbolsCount + ' indexed objects';
        }).catch((error) => {
            this.building = false;
            this.outputChannel.appendLine(error);
        });
    }

    /**
        Check if a given `document` is a Verilog/SystemVerilog file.

        @param document the document to check
        @return true if the document is a Verilog/SystemVerilog file
    */
    isSystemVerilogDocument(document: TextDocument): boolean {
        if (!document) {
            return false;
        }

        let filePath = document.uri.path;
        let fileName = filePath.substr(filePath.lastIndexOf('\\') + 1).split('.');
        let fileExtension = fileName[fileName.length - 1];

        for (let i = 0; i < this.systemVerilogFileExtensions.length; i++) {
            if (fileExtension == this.systemVerilogFileExtensions[i]) {
                return true;
            }
        }

        return false;
    }


    /**
        Adds the given `document`'s symbols to `symbolsMap`.

        @param fsPath the file path to the document
        @param symbolsMap the symbols map
        @return number of added files
    */
    addDocumentSymbols(document: TextDocument, symbolsMap: FastMap<string, List<SymbolInformation>>): Thenable<number> {
        return new Promise(async (resolve) => {
            if (!document || !symbolsMap) {
                resolve(new List<SymbolInformation>());
                return;
            }

            if (!this.isSystemVerilogDocument(document)) {
                resolve(new List<SymbolInformation>());
                return;
            }

            resolve(workspace.openTextDocument(document.uri).then(doc => {
                return this.parser.get_symbols(document, this.regex);
            }))
        }).then((output: List<SymbolInformation>) => {
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
    removeDocumentSymbols(fsPath: string, symbolsMap: FastMap<string, List<SymbolInformation>>): number {
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

}