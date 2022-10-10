import { ReferenceProvider, TextDocument, Position, workspace, Location, CancellationToken, SymbolInformation, commands } from 'vscode'; // prettier-ignore
import { SystemVerilogDefinitionProvider } from './DefinitionProvider';

export class SystemVerilogReferenceProvider implements ReferenceProvider {
    public definitionProvider: SystemVerilogDefinitionProvider;
    public results: Location[];
    public includeDeclaration: Boolean;

    public constructor(definitionProvider) {
        this.definitionProvider = definitionProvider;
    }

    public async provideReferences(
        document: TextDocument,
        position: Position,
        options: { includeDeclaration: boolean },
        token: CancellationToken
    ): Promise<Location[]> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<Location[]>(async (resolve, _reject) => {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);
            this.results = [];
            const promises: Promise<Location>[] = [];
            this.includeDeclaration = options.includeDeclaration;

            if (!range) {
                resolve(this.results);
            }

            // Get the original definition of the symbol 'Location' so we can compare against other symbols we find
            const defLocation = await this.getDefinitionLocation(document, position, token);

            // Get all symbols in the workspace that match `word`
            const allSymbols: SymbolInformation[] = await commands.executeCommand(
                'vscode.executeWorkspaceSymbolProvider',
                `¬¤${word}`,
                token
            );

            if (defLocation !== undefined) {
                // For each file in the workspace
                for (const symbol of allSymbols) {
                    // Find any tokens symbols (word) that that reference back to the Location we found above
                    promises.push(this.isLocationDefinedByDefinition(symbol.location, token, defLocation));
                }
                // Run all promises in parallel
                this.results = await Promise.all(promises);

                // filter out undefined locations (i.e. non references)
                this.results = this.results.filter((x) => x !== undefined);
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
        let defLocation: Location;
        if (typeof res === typeof Location) {
            defLocation = res as Location;
        } else if (res[0] !== null) {
            defLocation = res[0] as Location;
        } else {
            defLocation = new Location(document.uri, position);
        }
        return defLocation;
    }

    // Find the definition of the symbol at `location`. If the declared Location matches
    // when we do a reverse search for the symbol's location, we know we have found
    // a reference of the symbol.
    public async isLocationDefinedByDefinition(
        location: Location,
        token: CancellationToken,
        defLocation: Location // The definition we are testing against
    ): Promise<Location> {
        // Read the document into memory
        const document = await workspace.openTextDocument(location.uri);
        // Find all references to the word `symbol`

        // Get the definition (i.e. declaration) of the found symbol Locations
        const thisDefLocation = await this.getDefinitionLocation(document, location.range.start, token);
        if (thisDefLocation === undefined) {
            // we found a symbol in a comment probably
            return undefined;
        }
        // don't include the definition in the list when it is not requested
        if (!this.includeDeclaration && this.isLocationShallowEqual(location, defLocation)) {
            return undefined;
        }
        if (this.isLocationShallowEqual(thisDefLocation, defLocation)) {
            // The declaration of the symbol matches hte original Location the user requested.
            return location;
        }

        return undefined;
    }

    // We can't compare Location objects with `==` we have to compare the properties using this function
    private isLocationShallowEqual(location1: Location, location2: Location): Boolean {
        if (location1.uri.path === location2.uri.path) {
            // If the start location is the same. we know the end location must also match
            return location1.range.start.isEqual(location2.range.start);
        }
        return false;
    }
}
