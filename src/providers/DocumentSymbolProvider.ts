import {DocumentSymbolProvider, SymbolInformation, CancellationToken, TextDocument, Location, Position, SymbolKind, Range} from 'vscode'



export class SystemVerilogDocumentSymbolProvider implements DocumentSymbolProvider {
    public regex = /^\s*(logic|class|program|module|task|function|package|interface)(?:\s+(?:automatic|static|void|int))?\s+(\w+)/;
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

            for (let i = 0; i < document.lineCount; i++) {
                let line = document.lineAt(i);
                let match = this.regex.exec(line.text);
                let match2 = this._inst_regex.exec(line.text);

                if (match !== null) {
                    symbols.push(new SymbolInformation(
                        match[2],
                        this.varToSymbolKind[match[1]],
                        match[1],
                        new Location(document.uri, new Position(line.lineNumber, line.text.indexOf(match[2])))
                    ));
                } else if (match2 !== null) {
                    symbols.push(new SymbolInformation(
                        match2[2],
                        SymbolKind.Module,
                        match2[1],
                        new Location(document.uri, new Position(line.lineNumber, line.text.indexOf(match2[2])))
                    ));
                }
            }
            let r_multiline = new RegExp('^\s*(\w+)[\s\r\n]*(?:#[\s\r\n]*\((?!;).*\))?[\s\r\n]*(\w+)[\s\r\n]+\(.*?\)[\s\r\n]+;', 'm');
            let m_multiline = r_multiline.exec(document.getText())
            if (m_multiline !== null) {
                m_multiline.forEach(match => {
                    console.log("Match!")
                });
            }
            resolve(symbols);
        });
    }
}