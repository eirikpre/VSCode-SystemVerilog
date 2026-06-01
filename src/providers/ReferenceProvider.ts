import { ReferenceProvider, TextDocument, Position, workspace, Location, CancellationToken, SymbolInformation, commands } from 'vscode'; // prettier-ignore
import { SystemVerilogDefinitionProvider } from './DefinitionProvider';

// Cap how long any single per-candidate definition lookup is allowed to take.
// Without this, a single never-resolving provider promise would hang the
// entire Find References operation via Promise.all.
const CANDIDATE_TIMEOUT_MS = 3000;

export class SystemVerilogReferenceProvider implements ReferenceProvider {
    public definitionProvider: SystemVerilogDefinitionProvider;
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
        this.includeDeclaration = options.includeDeclaration;
        const range = document.getWordRangeAtPosition(position);
        if (!range) return [];

        const word = document.getText(range);
        const defLocation = await this.getDefinitionLocation(document, position, token);
        if (defLocation === undefined) return [];

        const allSymbols = ((await commands.executeCommand<SymbolInformation[]>(
            'vscode.executeWorkspaceSymbolProvider',
            `¬¤${word}`,
            token
        )) || []) as SymbolInformation[];

        // Per-candidate timeout + cancellation guard so one stuck provider
        // call cannot stall the whole search.
        const results: Location[] = [];
        const checks = allSymbols.map((symbol) =>
            withTimeout(this.isLocationDefinedByDefinition(symbol.location, token, defLocation), CANDIDATE_TIMEOUT_MS)
                .then((r) => {
                    if (r !== undefined) results.push(r);
                })
                .catch(() => undefined)
        );

        await Promise.all(checks);
        return results;
    }

    public async getDefinitionLocation(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): Promise<Location> {
        let res;
        try {
            res = await this.definitionProvider.provideDefinition(document, position, token);
        } catch {
            res = undefined;
        }
        if (Array.isArray(res)) {
            if (res.length === 0) return new Location(document.uri, position);
            return res[0] as Location;
        }
        if (res) return res as Location;
        return new Location(document.uri, position);
    }

    public async isLocationDefinedByDefinition(
        location: Location,
        token: CancellationToken,
        defLocation: Location
    ): Promise<Location> {
        if (token.isCancellationRequested) return undefined;
        let document: TextDocument;
        try {
            document = await workspace.openTextDocument(location.uri);
        } catch {
            return undefined;
        }
        const thisDefLocation = await this.getDefinitionLocation(document, location.range.start, token);
        if (thisDefLocation === undefined) return undefined;
        if (!this.includeDeclaration && this.isLocationShallowEqual(location, defLocation)) {
            return undefined;
        }
        if (this.isLocationShallowEqual(thisDefLocation, defLocation)) {
            return location;
        }
        return undefined;
    }

    private isLocationShallowEqual(location1: Location, location2: Location): Boolean {
        if (location1.uri.path === location2.uri.path) {
            return location1.range.start.isEqual(location2.range.start);
        }
        return false;
    }
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const t = setTimeout(() => reject(new Error('candidate timeout')), ms);
        p.then(
            (v) => {
                clearTimeout(t);
                resolve(v);
            },
            (err) => {
                clearTimeout(t);
                reject(err);
            }
        );
    });
}
