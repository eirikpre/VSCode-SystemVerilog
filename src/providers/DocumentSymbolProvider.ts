import {
    DocumentSymbolProvider,
    SymbolInformation,
    CancellationToken,
    TextDocument,
    Location,
    SymbolKind,
    Range
} from 'vscode'
import { FastMap } from 'collections/fast-map';
import { List } from 'collections/list';

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

export class SystemVerilogDocumentSymbolProvider implements DocumentSymbolProvider {
    // XXX: Does not match input/output/inout ports, eg input logic din, ..
    private illegalTypes = /(?!return|begin|end|else|join|fork|for|if|virtual|static|automatic|generate)/

    private comment = /(?:\/\/.*$)?/

    public regex: RegExp = new RegExp([
        // Potential identifier
        , /(?<=^\s*(?:(?:virtual|static|automatic|rand|randc|pure virtual)\s+)?)/
        // Illegal Symbol types
        , this.illegalTypes
        // Symbol type
        , /([:\w]+)\s+/
        // (modifier? returnType [.*]?      | parameterlist)?
        , /(?:(?:\w*\s+)?\w+(?:\s*\[.*?\])?\s+|\s*#\s*\([\s\S]*?\)\s*)?/
        // Symbol name, ignore multiple defines FIXME
        , this.comment, this.illegalTypes
        , /(\w+)(?:\s*,\s*\w+)*?/
        , this.comment
        // Port-list | class suffix
        , /(?:\s*\([\s\S]*?\)|(?:\s+(?:extends|implements)\s+\w+)+)?/
        // End of definition
        , /\s*;/
    ].map(x => x.source).join(''), 'mg');


    /**  
        Matches the regex pattern with the document's text. If a match is found, it creates a `SymbolInformation` object.
        If `documentSymbols` is not `undefined`, than the object is added to it, 
        otherwise add the objects to an empty list and return it.
        
        @param document The document in which the command was invoked.
        @param token A cancellation token.
        @param regex the pattern to match symbols with
        @param documentSymbols the list to add the objects to
        @return A list of `SymbolInformation` objects or a thenable that resolves to such. The lack of a result can be
        signaled by returning `undefined`, `null`, or an empty list.
    */
    public provideDocumentSymbols(document: TextDocument, token?: CancellationToken, regex?: RegExp, documentSymbols?: List<SymbolInformation>): Thenable<Array<SymbolInformation>> {
        return new Promise((resolve) => {
            let uri = document.uri;
            var symbols;

            if (documentSymbols) {
                //pass the reference of the symbols list to add the objects to
                symbols = documentSymbols;
            }
            else {
                symbols = new Array<SymbolInformation>();
            }

            var match;
            let text = document.getText();

            if (regex == undefined) {
                regex = this.regex;
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
}
