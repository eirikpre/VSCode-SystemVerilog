import { DocumentSymbolProvider, SymbolInformation, CancellationToken, TextDocument, Uri, SymbolKind, Location, Position, workspace, CommentThreadCollapsibleState } from 'vscode'
import { SystemVerilogParser } from '../parser';
import { SystemVerilogSymbol } from '../symbol';

export class SystemVerilogDocumentSymbolProvider implements DocumentSymbolProvider {
    private parser: SystemVerilogParser;
    private precision: string;
    private depth: number = -1;

    constructor(parser) {
        this.parser = parser;
        const settings = workspace.getConfiguration();
        this.precision = settings.get("systemverilog.documentSymbolsPrecision");
        if (this.precision != "full") {
            this.depth = 1;
        }
    }

    /**
        Matches the regex pattern with the document's text. If a match is found, it creates a `SystemVerilogSymbol` object.
        If `documentSymbols` is not `undefined`, than the object is added to it,
        otherwise add the objects to an empty list and return it.

        @param document The document in which the command was invoked.
        @param token A cancellation token.
        @return A list of `SystemVerilogSymbol` objects or a thenable that resolves to such. The lack of a result can be
        signaled by returning `undefined`, `null`, or an empty list.
    */
    public provideDocumentSymbols(document: TextDocument, token?: CancellationToken): Thenable<Array<SystemVerilogSymbol>> {
        return new Promise((resolve) => {
            /*
            Matches the regex and uses the index from the regex to find the position
            TODO: Look through the symbols to check if it either is defined in the current file or in the workspace.
                  Use that information to figure out if an instanciated 'unknown' object is of a known type.
            */
            resolve(this.parser.get_all_recursive(document, this.precision, this.depth));
            // resolve(show_SymbolKinds(document.uri));
        });
    }
}


// Function to easily show all the SymbolKind icons
function show_SymbolKinds(uri: Uri): Array<SymbolInformation> {
    return new Array<SymbolInformation>(
        new SymbolInformation("File",           SymbolKind.File,          "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Module",         SymbolKind.Module,        "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Namespace",      SymbolKind.Namespace,     "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Package",        SymbolKind.Package,       "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Class",          SymbolKind.Class,         "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Method",         SymbolKind.Method,        "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Property",       SymbolKind.Property,      "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Field",          SymbolKind.Field,         "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Constructor",    SymbolKind.Constructor,   "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Enum",           SymbolKind.Enum,          "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Interface",      SymbolKind.Interface,     "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Function",       SymbolKind.Function,      "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Variable",       SymbolKind.Variable,      "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Constant",       SymbolKind.Constant,      "", new Location(uri, new Position(0,0))),
        new SymbolInformation("String",         SymbolKind.String,        "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Number",         SymbolKind.Number,        "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Boolean",        SymbolKind.Boolean,       "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Array",          SymbolKind.Array,         "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Object",         SymbolKind.Object,        "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Key",            SymbolKind.Key,           "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Null",           SymbolKind.Null,          "", new Location(uri, new Position(0,0))),
        new SymbolInformation("EnumMember",     SymbolKind.EnumMember,    "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Struct",         SymbolKind.Struct,        "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Event",          SymbolKind.Event,         "", new Location(uri, new Position(0,0))),
        new SymbolInformation("Operator",       SymbolKind.Operator,      "", new Location(uri, new Position(0,0))),
        new SymbolInformation("TypeParameter",  SymbolKind.TypeParameter, "", new Location(uri, new Position(0,0)))
    );
}
