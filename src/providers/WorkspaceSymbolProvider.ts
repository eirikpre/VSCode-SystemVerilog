import { WorkspaceSymbolProvider, CancellationToken, SymbolKind } from 'vscode';
import { SystemVerilogIndexer } from '../indexer';
import { getSymbolKind, SystemVerilogSymbol } from '../symbol';

export class SystemVerilogWorkspaceSymbolProvider implements WorkspaceSymbolProvider {
    /*
     * this.symbols: filePath => Array<SystemVerilogSymbol>
     * each entry's key represents a file path,
     * and the entry's value is a list of the symbols that exist in the file
     */
    public indexer: SystemVerilogIndexer;
    public NUM_FILES: number = 250;

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
                let exactMatch: Boolean = false;
                let ignorePotentialReferences: Boolean = true;
                if (query.startsWith('¬')) {
                    ignorePotentialReferences = false;
                    query = query.substr(1);
                }
                if (query.startsWith('¤')) {
                    exactMatch = true;
                    query = query.substr(1);
                }
                this.indexer.symbols.forEach((list) => {
                    list.forEach((symbol) => {
                        if (exactMatch === true) {
                            if (symbol.name === query) {
                                if(!ignorePotentialReferences || symbol.kind !== SymbolKind.Key) {
                                    results.push(symbol);
                                }
                            }
                        } else if (symbol.name.match(pattern)) {
                            if(!ignorePotentialReferences || symbol.kind !== SymbolKind.Key) {
                                results.push(symbol);
                            }
                        }
                    });
                });

                this.indexer.updateMostRecentSymbols(results.slice(0)); // pass a shallow copy of the array
                resolve(this.uniquifyResults(results))
            }
        });
    }

    // filter out duplicate locations if any.
    // Make sure 'potential_references' are removed when sorting instead of legit matches
    private uniquifyResults(results: Array<SystemVerilogSymbol>) {
        // sympols with a larger end range are likely form more interesting
        // types, like modules, tasks, etc. so we put them at the top
        const sorted = results.sort((a,b) => {
            if(a.location.range.end.isAfter(b.location.range.end)) {
                return -1;
            }
            if(a.location.range.end.isBefore(b.location.range.end)) {
                return 1;
            }
            return 0;
        });
        // Filter out duplicates that were found to be 'potential_reference's
        const new_results = sorted.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.location.range.start.isEqual(value.location.range.start) && t.location.uri.toString() === value.location.uri.toString()
            ))
        )
        return new_results;
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
