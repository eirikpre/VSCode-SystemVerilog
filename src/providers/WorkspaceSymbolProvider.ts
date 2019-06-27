import {
    SymbolInformation,
    WorkspaceSymbolProvider,
    CancellationToken,
    workspace,
    window,
    StatusBarItem,
    ProgressLocation,
    GlobPattern,
    TextDocument,
    Uri
} from 'vscode';
import { SystemVerilogDocumentSymbolProvider } from './DocumentSymbolProvider';
import { FastMap } from 'collections/fast-map';
import { List } from 'collections/list';

export class SystemVerilogWorkspaceSymbolProvider implements WorkspaceSymbolProvider {
    /* 
    * this.symbols: filePath => List<SymbolInformation>
    * each entry's key represents a file path, 
    * and the entry's value is a list of the symbols that exist in the file
    */
    public symbols: FastMap<string, List<SymbolInformation>>;
    public building: Boolean = false;
    public statusbar: StatusBarItem;
    public docProvider: SystemVerilogDocumentSymbolProvider;
    public symbolsCount: number;

    public NUM_FILES: number = 250;
    public parallelProcessing: number = 50;
    public systemVerilogFileExtensions = ["sv", "v", "svh", "vh"];
    public globPattern: string = "**/*.{" + this.systemVerilogFileExtensions.join(",") + "}";
    public exclude: GlobPattern = undefined;

    private regex = new RegExp([
        , /(?<=^\s*(?:virtual\s+)?)/
        , /(module|class|interface|package|program)\s+/
        , /(?:automatic\s+)?/
        , /(\w+)/
        , /[\w\W.]*?/
        , /(end\1)/
    ].map(x => x.source).join(''), 'mg');

    constructor(statusbar: StatusBarItem, docProvider: SystemVerilogDocumentSymbolProvider,
        disabled?: Boolean, exclude?: GlobPattern, parallelProcessing?: number) {
        this.statusbar = statusbar;
        this.docProvider = docProvider;
        this.symbolsCount = 0;
        if (disabled) {
            this.statusbar.text = "SystemVerilog: Indexing disabled"
        } else {
            if (exclude != "insert globPattern here") {
                this.exclude = exclude;
            }
            if (parallelProcessing) {
                this.parallelProcessing = parallelProcessing;
            }
            this.statusbar.text = "SystemVerilog: Indexing";
            this.build_index().then(res => this.statusbar.text = res);
        }
    };

    public dispose() {
        delete this.symbols
    }

    /** 
        Queries a symbol from `this.symbols`, performs an exact match if `exactMatch` is set to true,
        and a partial match if it's not passed or set to false.

        @param query the symbol's name
        @param token the CancellationToken
        @param exactMatch whether to perform an exact or a partial match
        @return an array of matching SymbolInformation 
    */
    public provideWorkspaceSymbols(query: string, token: CancellationToken, exactMatch?: Boolean): Thenable<List<SymbolInformation>> {
        return new Promise((resolve, reject) => {
            if (query.length === 0) {
                // Show maximum `NUM_FILES` symbols for speedup
                let maxSymbols = new List<SymbolInformation>();
                this.symbols.values().forEach(list => {
                    if (maxSymbols.length + list.length >= this.NUM_FILES) {
                        let limit = this.NUM_FILES - maxSymbols.length;
                        maxSymbols.concat(list.splice(0, limit));
                    }
                    else {
                        maxSymbols.concat(list);
                    }
                });

                resolve(maxSymbols);
            } else {
                const pattern = new RegExp(".*" + query.replace(" ", "").split("").map((c) => c).join(".*") + ".*", 'i');
                let results = new List<SymbolInformation>();

                this.symbols.values().forEach(list => {
                    list.forEach(symbol => {
                        if (exactMatch === true) {
                            if (symbol.name == query) {
                                results.push(symbol);
                            }
                        }
                        else if (symbol.name.match(pattern)) {
                            results.push(symbol)
                        }
                    });
                });

                resolve(results);
            }
        });
    }

    /**  
        Queries a `module` with a given name from `this.symbols`, performs an exact match if `exactMatch` is set to true,
        and a partial match if it's not passed or set to false.
        @param query the symbol's name
        @return the module's SymbolInformation
    */
    public provideWorkspaceModule(query: string): SymbolInformation {
        if (query.length === 0) {
            return undefined;
        } else {
            let symbolInfo = undefined;
            this.symbols.values().forEach(list => {
                list.forEach(symbol => {
                    if (symbol.name == query && symbol.containerName == "module") {
                        symbolInfo = symbol;
                        return false;
                    }
                });

                if (symbolInfo) {
                    return false;
                }
            });

            return symbolInfo;
        }
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

        return await window.withProgress({
            location: ProgressLocation.Notification,
            title: "SystemVerilog Indexing...",
            cancellable: true
        }, async (progress, token) => {
            this.symbols = new FastMap<string, List<SymbolInformation>>();
            let uris = await Promise.resolve(workspace.findFiles(this.globPattern, this.exclude, undefined, token));

            for (var filenr = 0; filenr < uris.length; filenr += this.parallelProcessing) {
                let subset = uris.slice(filenr, filenr + this.parallelProcessing)
                if (token.isCancellationRequested) {
                    cancelled = true;
                    break;
                }
                await Promise.all(subset.map(uri => {
                    return new Promise(async (resolve) => {
                        resolve(workspace.openTextDocument(uri).then(doc => {
                            return this.docProvider.provideDocumentSymbols(doc, token, this.regex, this.symbols)
                        }))
                    }).then((output: List<SymbolInformation>) => {
                        this.symbolsCount += output.length;
                    }).catch((error) => {
                        console.log("SystemVerilog: Indexing: Unable to process file: ", uri.toString());
                        console.log(error);
                        return undefined
                    });
                }));
            }
        }).then(() => {
            this.building = false;
            if (cancelled) {
                return "SystemVerilog: Indexing cancelled";
            } else {
                return 'SystemVerilog: ' + this.symbolsCount + ' indexed objects'
            }
        });
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
            console.log("SystemVerilog: Indexing: Unable to process file: ", document.uri.toString());
            console.log(error);
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
            console.log("SystemVerilog: Indexing: Unable to process file: ", uri.toString());
            console.log(error);
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
            console.log(error);
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
                return this.docProvider.provideDocumentSymbols(document, undefined, this.regex, symbolsMap)
            }))
        }).then((output: List<SymbolInformation>) => {
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