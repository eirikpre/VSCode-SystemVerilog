import {DocumentSymbolProvider, SymbolInformation, CancellationToken, TextDocument, Location, Position, SymbolKind, Range} from 'vscode'

// See test/SymbolKind_icons.png for an overview of the icons
function getSymbolKind(name: String): SymbolKind {
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
        case 'program':
        case 'module': return SymbolKind.Module;
        default: return SymbolKind.Variable;
    }
    /* Not used! / Free SymbolKind icons
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

    // XXX: Does not match virtual interface instantiantion, eg virtual intf u_virtInterface;
    // XXX: Does not match arrays of variables, eg logic [6:0] var;
    // XXX: Does not match input/output/inout ports, eg input logic din, ..
    // TODO: Match labels with SymbolKind.Enum
    public regex: RegExp = new RegExp('^\\s*(\\w+)(?:\\s+|\\s*#\\s*\\([\\s\\S]*?\\)\\s*)(\\w+)\\s*(?:\\([\\s\\S]*?\\))?\\s*;','mg');

    public provideDocumentSymbols(document: TextDocument, token: CancellationToken): Thenable<SymbolInformation[]> {
        return new Promise((resolve, reject) => {
            /* 
                First loop finds every instantiation of 
                variables/modules/objects in the file
            */
            var symbols = [];
            let text = document.getText()
            var match;
            do {
                match = this.regex.exec(text);
                if (match) {
                    symbols.push(new SymbolInformation(
                        match[2],
                        getSymbolKind(match[1]),
                        match[1],
                        new Location(document.uri, new Range(0,0,0,0))
                    ));
                }
            } while (match != null);
            console.log(symbols)
            /*
                Second loop finds the position of every symbol
            */

            // TODO: Find container name and inside comment block (track current scope)
            // XXX: Does not match multiple in sequence, eg. logic a, b;
            var line_no: number = 0;
            symbols.forEach( function(symbol) {
                let word = symbol.name;
                let regex: RegExp = new RegExp('\\b(word)\\b'.replace('word', word))
                while (line_no < document.lineCount) {
                    let line = document.lineAt(line_no).text;
                    let commentStart = line.indexOf('//');
                    if (commentStart != -1) {
                        line = line.substr(0, commentStart);
                    }
                    let match = regex.exec(line);
                    if (match) {
                        symbol.name = "type word".replace('type', symbol.containerName).replace('word', symbol.name);
                        symbol.location.range = new Range(line_no, match.index, line_no, match.index+word.length);
                        break;
                    }
                    line_no++;
                }
            })
            resolve(symbols);
        });
    }
}