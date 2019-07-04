import { SymbolInformation, WorkspaceSymbolProvider, CancellationToken } from 'vscode';
import { SystemVerilogIndexerMap } from '../indexer_map';
import { List } from 'collections/list';


export class SystemVerilogWorkspaceSymbolProvider implements WorkspaceSymbolProvider {
    /* 
    * this.symbols: filePath => List<SymbolInformation>
    * each entry's key represents a file path, 
    * and the entry's value is a list of the symbols that exist in the file
    */
    public indexer: SystemVerilogIndexerMap;
    public NUM_FILES: number = 250;

    constructor(indexer: SystemVerilogIndexerMap) {
        this.indexer = indexer;
    };

    /** 
        Queries a symbol from `this.symbols`, performs an exact match if `exactMatch` is set to true,
        and a partial match if it's not passed or set to false.

        @param query the symbol's name
        @param token the CancellationToken
        @param exactMatch whether to perform an exact or a partial match
        @return an array of matching SymbolInformation 
    */
    public provideWorkspaceSymbols(query: string, token: CancellationToken, exactMatch?: Boolean): Thenable<Array<SymbolInformation>> {
        return new Promise((resolve, reject) => {
            if (query.length === 0) {
                // Show maximum `NUM_FILES` symbols for speedup
                let maxSymbols = new List<SymbolInformation>();

                this.indexer.symbols.forEach(list => {
                    if (maxSymbols.length + list.length >= this.NUM_FILES) {
                        let limit = this.NUM_FILES - maxSymbols.length;
                        maxSymbols = maxSymbols.concat(list.splice(0, limit));
                    }
                    else {
                        maxSymbols = maxSymbols.concat(list);
                    }
                });

                resolve(maxSymbols.toArray());
            } else {
                const pattern = new RegExp(".*" + query.replace(" ", "").split("").map((c) => c).join(".*") + ".*", 'i');
                let results = new Array<SymbolInformation>();

                this.indexer.symbols.forEach(list => {
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
            this.indexer.symbols.forEach(list => {
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
}