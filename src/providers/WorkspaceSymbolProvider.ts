import { WorkspaceSymbolProvider, CancellationToken } from 'vscode';
import { SystemVerilogIndexer } from '../indexer';
import { getSymbolKind, SystemVerilogSymbol, wireToSymbol } from '../symbol';

export class SystemVerilogWorkspaceSymbolProvider implements WorkspaceSymbolProvider {
    public indexer: SystemVerilogIndexer;

    public NUM_FILES = 250;

    constructor(indexer: SystemVerilogIndexer) {
        this.indexer = indexer;
    }

    /**
        Queries a symbol by name, performing an exact match if the query is
        prefixed with `¤`, otherwise a fuzzy case-insensitive match.

        @param query the symbol's name. Prefix with `¤` for exact match,
                     prefix with `¬` to include potential references.
        @param token the CancellationToken
        @return an array of matching SystemVerilogSymbol
    */
    public async provideWorkspaceSymbols(
        query: string,
        token: CancellationToken
    ): Promise<Array<SystemVerilogSymbol>> {
        if (query === undefined || query.length === 0) {
            await this.indexer.updateMostRecentSymbols(undefined);
            return this.indexer.mostRecentSymbols;
        }

        let exactMatch = false;
        let ignorePotentialReferences = true;
        if (query.startsWith('¬')) {
            ignorePotentialReferences = false;
            query = query.substr(1);
        }
        if (query.startsWith('¤')) {
            exactMatch = true;
            query = query.substr(1);
        }

        const excludeTypes = ignorePotentialReferences ? ['potential_reference'] : undefined;
        const rows = exactMatch
            ? await this.indexer.client.queryByName(query, { excludeTypes })
            : await this.indexer.client.queryFuzzy(query, { excludeTypes });

        if (token.isCancellationRequested) {
            return undefined;
        }

        const results = rows.map(wireToSymbol);
        await this.indexer.updateMostRecentSymbols(results.slice(0));
        return this.uniquifyResults(results);
    }

    public async getAllModules(): Promise<Array<SystemVerilogSymbol>> {
        const rows = await this.indexer.client.getAllByType('module');
        return rows.map(wireToSymbol);
    }

    // filter out duplicate locations if any.
    // Make sure 'potential_references' are removed when sorting instead of legit matches
    private uniquifyResults(results: Array<SystemVerilogSymbol>) {
        // sympols with a larger end range are likely form more interesting
        // types, like modules, tasks, etc. so we put them at the top
        const sorted = results.sort((a, b) => {
            if (a.location.range.end.isAfter(b.location.range.end)) {
                return -1;
            }
            if (a.location.range.end.isBefore(b.location.range.end)) {
                return 1;
            }
            return 0;
        });
        // Filter out duplicates that were found to be 'potential_reference's
        const newResults = sorted.filter(
            (value, index, self) =>
                index ===
                self.findIndex(
                    (t) =>
                        t.location.range.start.isEqual(value.location.range.start) &&
                        t.location.uri.toString() === value.location.uri.toString()
                )
        );
        return newResults;
    }

    /**
        Queries a `module` with a given name, performing an exact match.
        @param query the symbol's name
        @return the module's SystemVerilogSymbol
    */
    public async provideWorkspaceModule(query: string): Promise<SystemVerilogSymbol> {
        if (query.length === 0) {
            return undefined;
        }
        const rows = await this.indexer.client.queryByName(query, { limit: 50 });
        const moduleKind = getSymbolKind('module');
        const match = rows.find((r) => r.kind === moduleKind);
        if (!match) {
            return undefined;
        }
        const symbol = wireToSymbol(match);
        await this.indexer.updateMostRecentSymbols([symbol]);
        return symbol;
    }
}
