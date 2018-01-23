import {DocumentSymbolProvider, SymbolInformation, CancellationToken, TextDocument, Location, Position, SymbolKind} from 'vscode'



export class SystemVerilogDocumentSymbolProvider implements DocumentSymbolProvider {
    public regex = /^\s*(logic|class|program|module|task|function|package|interface)(?:\s+(?:automatic|static|void|int))?\s+(\w+)/;
    
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

            for (var i = 0; i < document.lineCount; i++) {
                var line = document.lineAt(i);
                var match = this.regex.exec(line.text)

                if (match !== null) {
                    let symbol = new SymbolInformation(
                        match[2],
                        this.varToSymbolKind[match[1]],
                        match[1],
                        new Location(document.uri, new Position(line.lineNumber, line.text.indexOf(match[2])))
                    );
                    symbols.push(symbol)
                }
            }
            resolve(symbols);
        });
    }
}