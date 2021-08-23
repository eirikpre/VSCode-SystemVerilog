import { ReferenceProvider, TextDocument, Range, Position, workspace, Location, CancellationToken, Definition, Uri, SymbolInformation, commands } from 'vscode'; // prettier-ignore
import { SystemVerilogDefinitionProvider } from './DefinitionProvider';
import { SystemVerilogSymbol } from '../symbol';
import { SystemVerilogIndexer } from '../indexer';
import { SystemVerilogParser } from '../parser';
import { Integer_covergroup_expressionContext } from '../compiling/ANTLR/grammar/build/SystemVerilogParser';
import { resolve } from 'vscode-languageserver/lib/node/files';

export class SystemVerilogReferenceProvider implements ReferenceProvider {
    public definitionProvider: SystemVerilogDefinitionProvider;
    public results: Location[];
    public includeDeclaration: Boolean;

    public async provideReferences(
        document: TextDocument,
        position: Position,
        options: { includeDeclaration: boolean },
        token: CancellationToken
    ): Promise<Location[]> {
        return new Promise<Location[]>(async (resolve, _reject) => {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);
            let cancelled = false;
            this.results = [];
            this.includeDeclaration = options.includeDeclaration;

            if (!range) {
                return this.results;
            }

            //TODO: remove this
            //this.results.push(new Location(document.uri, position))

            this.definitionProvider = new SystemVerilogDefinitionProvider();
            const defLocation = await this.getDefinitionLocation(document, position, token);

            const parser = new SystemVerilogParser();
            var indexer = new SystemVerilogIndexer(null, parser, null);
            indexer.initialize();
            const uris = await indexer.find_files(token);
            for (let fileNumber = 0; fileNumber < uris.length; fileNumber += indexer.parallelProcessing) {
                const subset = uris.slice(fileNumber, fileNumber + indexer.parallelProcessing);
                if (token.isCancellationRequested) {
                    cancelled = true;
                    break;
                }
                for (const uri of subset) {
                    const locations = await this.processFile(uri, word, token, defLocation);
                    for (const loc of locations) {
                        this.results.push(loc);
                    }
                }
            }

            resolve(this.results);

            //return refAtPos ? (await findReferences(refAtPos.ref)).map(({ location }) => location) : [];
        });
    }

    public async getDefinitionLocation(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): Promise<Location> {
        const res = await this.definitionProvider.provideDefinition(document, position, token);
        var defLocation: Location;
        if (typeof res == typeof Location) {
            defLocation = res as Location;
        } else if (res[0] != null) {
            defLocation = res[0] as Location;
        } else {
            defLocation = new Location(document.uri, position);
        }
        return defLocation;
    }

    public async processFile(
        uri: Uri,
        symbol: string,
        token: CancellationToken,
        defLocation: Location
    ): Promise<Location[]> {
        const document = await workspace.openTextDocument(uri);
        const allLocations = await new Promise<Location[]>((resolve) => {
            let text = document.getText();
            let regex = new RegExp('\\b' + symbol + '\\b', 'g');
            let match;
            let results: Location[] = [];
            while ((match = regex.exec(text)) !== null) {
                let foundLocation = new Location(
                    document.uri,
                    new Range(document.positionAt(match.index), document.positionAt(match.index + regex.lastIndex))
                );

                results.push(foundLocation);
            }
            resolve(results);
        });

        let validLocations = [];
        for (const location of allLocations) {
            const thisDefLocation = await this.getDefinitionLocation(document, location.range.start, token);
            // don't include the definition in the list when it is not requested
            if(!this.includeDeclaration && this.isLocationShallowEqual(location, defLocation)) {
                continue;
            }
            if (this.isLocationShallowEqual(thisDefLocation, defLocation)) {
                validLocations.push(location);
            }
        }

        return validLocations;
    }

    public isLocationShallowEqual(location1: Location, location2: Location): Boolean {
        if (location1.uri.path === location2.uri.path) {
            // If the start location is the same. we know the end location must also match
            return location1.range.start.isEqual(location2.range.start);
        }
        return false;
    }
}
