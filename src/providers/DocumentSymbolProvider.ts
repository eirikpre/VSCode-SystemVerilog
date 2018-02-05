import {DocumentSymbolProvider, SymbolInformation, CancellationToken, TextDocument, Location, Position, SymbolKind, Range} from 'vscode'



export class SystemVerilogDocumentSymbolProvider implements DocumentSymbolProvider {
    public regex: RegExp = /^\s*(logic|class|program|module|task|function|package|interface)(?:\s+(?:automatic|static|void|int))?\s+(\w+)/;
    private _inst_regex = /^\s*(?:virtual)?\s*(\w+)\s*(\w+)\s*;/;

    public varToSymbolKind: { [key: string]: SymbolKind } = {
        'package': SymbolKind.Package,
        'import': SymbolKind.Package,
        'logic': SymbolKind.Variable,
        'string': SymbolKind.Variable,
        'class': SymbolKind.Class,
        'program': SymbolKind.Module,
        'module': SymbolKind.Module,
        'task': SymbolKind.Method,
        'function': SymbolKind.Function,
        'interface': SymbolKind.Interface,
    }

    public provideDocumentSymbols(document: TextDocument, token: CancellationToken): Thenable<SymbolInformation[]> {
        return new Promise((resolve, reject) => {
            var symbols = [];
            // for (let i = 0; i < document.lineCount; i++) {
            //     let line = document.lineAt(i);
            //     let match = this.regex.exec(line.text);
            //     let match2 = this._inst_regex.exec(line.text);

            //     if (match !== null) {
            //         symbols.push(new SymbolInformation(
            //             match[2],
            //             this.varToSymbolKind[match[1]],
            //             match[1],
            //             new Location(document.uri, new Position(line.lineNumber, line.text.indexOf(match[2])))
            //         ));
            //         names.push(match[2]);
            //     } else if (match2 !== null) {
            //         symbols.push(new SymbolInformation(
            //             match2[2],
            //             SymbolKind.Module,
            //             match2[1],
            //             new Location(document.uri, new Position(line.lineNumber, line.text.indexOf(match2[2])))
            //         ));
            //         names.push(match2[2]);
            //     }
            // }
            let text = document.getText()
            let r_multiline: RegExp = new RegExp('^\\s*(\\w+)(?:\\s+|#\\s*\\([\\s\\S]*?\\))(\\w+)\\s*(?:\\([\\s\\S]*?\\))?\\s*;','mg');
            var match;
            do {
                match = r_multiline.exec(text);
                if (match) {
                    symbols.push(new SymbolInformation(
                        match[2],
                        SymbolKind.Module,
                        match[1],
                        new Location(document.uri, new Range(0,0,0,0))
                    ));
                }
            } while (match != null);
            // TODO: Find container name and inside comment block
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