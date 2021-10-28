import { WorkspaceSymbolProvider, CancellationToken } from 'vscode';
import { SystemVerilogIndexer } from '../indexer';
import { getSymbolKind, SystemVerilogSymbol } from '../symbol';

export class SystemVerilogWorkspaceSymbolProvider implements WorkspaceSymbolProvider {
    /*
     * this.symbols: filePath => Array<SystemVerilogSymbol>
     * each entry's key represents a file path,
     * and the entry's value is a list of the symbols that exist in the file
     */
    public indexer: SystemVerilogIndexer;

    public NUM_FILES = 250;

    constructor(indexer: SystemVerilogIndexer) {
        this.indexer = indexer;
    }

    /**
        Queries a symbol from `this.symbols`, performs an exact match if `exactMatch` is set to true,
        and a partial match if it's not passed or set to false.

        @param query the symbol's name, if it is prepended with a ¤ it signifies an exact match
        @param _token the CancellationToken
        @return an array of matching SystemVerilogSymbol
    */
    public provideWorkspaceSymbols(query: string, _token: CancellationToken): Thenable<Array<SystemVerilogSymbol>> {
        return new Promise((resolve, reject) => {
            if (query === undefined || query.length === 0) {
                resolve(this.indexer.mostRecentSymbols);
            } else {
                const pattern = new RegExp(`.*${query.replace(" ", "").split("").map((c) => c).join(".*")}.*`, 'i'); // prettier-ignore
                const results = new Array<SystemVerilogSymbol>();
                let exactMatch = false;
                if (query.startsWith('¤')) {
                    exactMatch = true;
                    query = query.substr(1);
                }
                this.indexer.symbols.forEach((list) => {
                    list.forEach((symbol) => {
                        if (exactMatch === true) {
                            if (symbol.name === query) {
                                results.push(symbol);
                            }
                        } else if (symbol.name.match(pattern)) {
                            results.push(symbol);
                        }
                    });
                });

                this.indexer.updateMostRecentSymbols(results.slice(0)); // pass a shallow copy of the array
                resolve(results);
            }
        });
    }

    /**
        Queries a `module` with a given name from `this.symbols`, performs an exact match if `exactMatch` is set to true,
        and a partial match if it's not passed or set to false.
        @param query the symbol's name
        @return the module's SystemVerilogSymbol
    */
    public provideWorkspaceModule(query: string): SystemVerilogSymbol {
        if (query.length === 0) {
            return undefined;
        }
        let symbolInfo;
        this.indexer.symbols.forEach((list) => {
            list.forEach((symbol) => {
                if (symbol.name === query && symbol.kind === getSymbolKind('module')) {
                    symbolInfo = symbol;
                    return false;
                }
            });

            if (symbolInfo) {
                return false;
            }
        });

        this.indexer.updateMostRecentSymbols([symbolInfo]);
        return symbolInfo;
    }
}
