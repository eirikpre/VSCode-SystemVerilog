import { ReferenceProvider, TextDocument, Range, Position, workspace, Location, CancellationToken, Definition, Uri, SymbolInformation, commands } from 'vscode'; // prettier-ignore
import { SystemVerilogDefinitionProvider } from './DefinitionProvider';
import { SystemVerilogIndexer } from '../indexer';
import { SystemVerilogParser } from '../parser';

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
                resolve(this.results);
            }

            // Get the original definition of the symbol 'Location' so we can compare against other symbols we find
            this.definitionProvider = new SystemVerilogDefinitionProvider();
            const defLocation = await this.getDefinitionLocation(document, position, token);

            const parser = new SystemVerilogParser();
            var indexer = new SystemVerilogIndexer(null, parser, null);
            indexer.initialize();
            // Fins all systemVerilog files that could contain references to the symbol of interest
            const uris = await indexer.find_files(token);

            // For each file in the workspace
            for (let fileNumber = 0; fileNumber < uris.length; fileNumber += indexer.parallelProcessing) {
                const subset = uris.slice(fileNumber, fileNumber + indexer.parallelProcessing);
                if (token.isCancellationRequested) {
                    cancelled = true;
                    break;
                }
                for (const uri of subset) {
                    // Find any tokens symbols (word) that that reference back to the Location we found above
                    const locations = await this.processFile(uri, word, token, defLocation);
                    for (const loc of locations) {
                        this.results.push(loc);
                    }
                }
            }

            resolve(this.results);

        });
    }

    // Get the Location of the word at a given Postition
    // This function is used to get the Location of the word under the suer's cursor
    // when getting references.
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

    // Read the given uri (file) and search for a symbol (word) that may be 
    // declared at the original Location. If the declared Location matches
    // when we do a reverse search for the symbol's location, we know we have found
    // a reference of the symbol.
    public async processFile(
        uri: Uri,
        symbol: string,
        token: CancellationToken,
        defLocation: Location
    ): Promise<Location[]> {
        // Read the document into memory
        const document = await workspace.openTextDocument(uri);
        // Find all references to the word `symbol`
        const allLocations = await new Promise<Location[]>((resolve) => {
            let text = document.getText();
            let regex = new RegExp('\\b' + symbol + '\\b', 'g');
            let match;
            let results: Location[] = [];
            // Iterate through the document and find all Words that match `symbol`
            while ((match = regex.exec(text)) !== null) {
                let foundLocation = new Location(
                    document.uri,
                    new Range(document.positionAt(match.index), document.positionAt(match.index + symbol.length))
                );
                // Push the found Location onto the list.
                results.push(foundLocation);
            }
            resolve(results);
        });

        let validLocations = [];
        for (const location of allLocations) {
            // Get the definition (i.e. declaration) of the found symbol Locations
            const thisDefLocation = await this.getDefinitionLocation(document, location.range.start, token);
            if(thisDefLocation == undefined) {
                // we found a symbol in a comment probably
                continue;
            }
            // don't include the definition in the list when it is not requested
            if(!this.includeDeclaration && this.isLocationShallowEqual(location, defLocation)) {
                continue;
            }
            if (this.isLocationShallowEqual(thisDefLocation, defLocation)) {
                // The declaration of the symbol matches hte original Location the user requested.
                validLocations.push(location);
            }
        }

        return validLocations;
    }

    // We can't compare Location objects with `==` we have to compare the properties using this function
    public isLocationShallowEqual(location1: Location, location2: Location): Boolean {
        if (location1.uri.path === location2.uri.path) {
            // If the start location is the same. we know the end location must also match
            return location1.range.start.isEqual(location2.range.start);
        }
        return false;
    }
}
