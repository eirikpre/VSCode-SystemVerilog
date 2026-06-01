import { DocumentSymbolProvider, SymbolInformation, CancellationToken, TextDocument, Uri, SymbolKind, Location, Position, workspace } from 'vscode' // prettier-ignore
import { SystemVerilogIndexer } from '../indexer';
import { SystemVerilogSymbol, wireToSymbol } from '../symbol';

export class SystemVerilogDocumentSymbolProvider implements DocumentSymbolProvider {
    private indexer: SystemVerilogIndexer;
    private precision: string;
    private depth = -1;

    constructor(indexer: SystemVerilogIndexer) {
        this.indexer = indexer;
        const settings = workspace.getConfiguration();
        this.precision = settings.get('systemverilog.documentSymbolsPrecision');
        if (this.precision === 'full') {
            this.precision = 'full_no_references';
        } else if (this.precision !== 'full') {
            this.depth = 1;
        }
    }

    /**
        Returns the symbols for the given document. Prefers the cached symbols
        in the shard-backed index; on a cache miss, asks the worker to parse
        the document so the main thread stays responsive.

        @param document The document in which the command was invoked.
        @return A list of `SystemVerilogSymbol` objects.
    */
    public async provideDocumentSymbols(
        document: TextDocument,
        _token?: CancellationToken
    ): Promise<Array<SystemVerilogSymbol>> {
        const fspath = document.uri.fsPath;
        const rows = await this.indexer.client.getFileSymbols(fspath, [
            'potential_reference'
        ]);
        if (rows.length > 0) {
            return rows.map(wireToSymbol);
        }
        // No non-reference symbols. If the file is known to the index already,
        // there's nothing to show — don't re-parse, or we'd overwrite the
        // `potential_reference` rows that Find References depends on.
        const meta = await this.indexer.client.getFileMeta([fspath]);
        if (meta[fspath]) {
            return [];
        }
        // Truly not indexed yet — parse on demand in the worker without
        // mutating the cache.
        const text = document.getText();
        const depth = this.depth >= 0
            ? this.depth
            : this.precision === 'full' || this.precision === 'full_no_references' ? 1 : 0;
        const wireSyms = await this.indexer.client.parseText({
            path: fspath,
            text,
            precision: this.precision,
            maxDepth: depth
        });
        return wireSyms
            .filter((s) => s.type !== 'potential_reference')
            .map(wireToSymbol);
    }
}

// Function to easily show all the SymbolKind icons
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function showSymbolKinds(uri: Uri): Array<SymbolInformation> {
    // prettier-ignore
    return new Array<SymbolInformation>(
        new SymbolInformation("File",          SymbolKind.File,          "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Module",        SymbolKind.Module,        "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Namespace",     SymbolKind.Namespace,     "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Package",       SymbolKind.Package,       "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Class",         SymbolKind.Class,         "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Method",        SymbolKind.Method,        "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Property",      SymbolKind.Property,      "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Field",         SymbolKind.Field,         "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Constructor",   SymbolKind.Constructor,   "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Enum",          SymbolKind.Enum,          "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Interface",     SymbolKind.Interface,     "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Function",      SymbolKind.Function,      "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Variable",      SymbolKind.Variable,      "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Constant",      SymbolKind.Constant,      "", new Location(uri, new Position(0,0))),
        new SymbolInformation("String",        SymbolKind.String,        "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Number",        SymbolKind.Number,        "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Boolean",       SymbolKind.Boolean,       "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Array",         SymbolKind.Array,         "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Object",        SymbolKind.Object,        "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Key",           SymbolKind.Key,           "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Null",          SymbolKind.Null,          "", new Location(uri, new Position(0,0))),
        new SymbolInformation("EnumMember",    SymbolKind.EnumMember,    "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Struct",        SymbolKind.Struct,        "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Event",         SymbolKind.Event,         "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Operator",      SymbolKind.Operator,      "", new Location(uri, new Position(0,0))),
        new SymbolInformation("TypeParameter", SymbolKind.TypeParameter, "", new Location(uri, new Position(0,0)))
    );
}
