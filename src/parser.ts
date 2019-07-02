import { FastMap } from 'collections/fast-map';
import { List } from 'collections/list';
import { SymbolKind, TextDocument, SymbolInformation, Location, Range, Uri } from "vscode";


// See test/SymbolKind_icons.png for an overview of the icons
export function getSymbolKind(name: String): SymbolKind {
    switch (name) {
        case 'parameter':
        case 'localparam': return SymbolKind.Constant;
        case 'package':
        case 'import': return SymbolKind.Package;
        case 'wire':
        case 'reg':
        case 'logic': return SymbolKind.Boolean;
        case 'string': return SymbolKind.String;
        case 'class': return SymbolKind.Class;
        case 'task': return SymbolKind.Method;
        case 'function': return SymbolKind.Function;
        case 'interface': return SymbolKind.Interface;
        case 'event': return SymbolKind.Event;
        case 'struct': return SymbolKind.Struct;
        case 'program': return SymbolKind.Module;
        case 'module':
        default: return SymbolKind.Variable;
    }
    /* Unused/Free SymbolKind icons
        return SymbolKind.Number;
        return SymbolKind.Enum;
        return SymbolKind.EnumMember;
        return SymbolKind.Operator;
        return SymbolKind.TypeParameter;
        return SymbolKind.Property;
        return SymbolKind.Array;
    */
}

export class SystemVerilogParser {

    /**
        Matches the regex pattern with the document's text. If a match is found, it creates a `SymbolInformation` object.
        If `workspaceSymbols` is not `undefined`, than the object is added to a mapped list to the document's `fsPath`,
        otherwise add the objects to an empty list and return it.

        @param document The document in which the command was invoked.
        @param regex pattern that maps symbols, group(1) is the type, group(2) is the name
        @return A list of `SymbolInformation` objects or a thenable that resolves to such. The lack of a result can be
        signaled by returning `undefined`, `null`, or an empty list.
    */
   public get_symbols(document: TextDocument, regex: RegExp, workspaceSymbols?: FastMap<string, List<SymbolInformation>>): Thenable<Array<SymbolInformation>> {
        return new Promise((resolve) => {
            var symbols: Array<SymbolInformation> = [];

            var match;
            let text = document.getText();

            if (workspaceSymbols) {
                workspaceSymbols.set(document.uri.fsPath, new List<SymbolInformation>());
                //pass the reference of the symbols list to add the objects to
                symbols = workspaceSymbols.get(document.uri.fsPath);
            }
            else {
                symbols = new Array<SymbolInformation>();
            }

            /*
                Matches the regex and uses the index from the regex to find the position
            */
            do {
                match = regex.exec(text);
                if (match) {
                    let symbolInfo = new SymbolInformation(
                        match[2],
                        getSymbolKind(match[1]),
                        match[1],
                        new Location(document.uri,
                            new Range(document.positionAt(match.index),
                                document.positionAt(match.index + match[0].length)
                            )))
                    symbols.push(symbolInfo);
                }
            } while (match != null);

            resolve(symbols);
        });
    }

    /**
     * TODO
     * @param document
     * @param module
     */
    public get_portlist(document: TextDocument, module: String): Thenable<Array<SymbolInformation>> {
        return new Promise((resolve) => {
            resolve();
        });
    }

}