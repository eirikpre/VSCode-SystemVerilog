import { SymbolInformation, Location, Range, WorkspaceSymbolProvider, CancellationToken, workspace } from 'vscode';
import { getSymbolKind } from './DocumentSymbolProvider';

export class SystemVerilogWorkspaceSymbolProvider implements WorkspaceSymbolProvider {
    private regex = /^\s*(module|program|class|interface)\s+(\w+)/;

    public NUM_FILES = 250;

    public provideWorkspaceSymbols(query: string, token: CancellationToken): Thenable<SymbolInformation[]> {
        return new Promise((resolve, reject) => {
            var results = [];
            
            workspace.findFiles('**/*.sv', undefined, this.NUM_FILES, token).then(uris => {
                for(let uri of uris) {
                    workspace.openTextDocument(uri).then( document => {
                        for (let i = 0; i < document.lineCount; i++) {
                            let line = document.lineAt(i);
                            let match = this.regex.exec(line.text);
                            if (match) {
                                results.push( new SymbolInformation(
                                    match[2], getSymbolKind(match[1]), document.fileName,
                                    new Location(document.uri,
                                        new Range(
                                            i, line.text.indexOf(match[2]),
                                            i, line.text.indexOf(match[2])+match[2].length))));
                            }
                        }
                    });
                }
                return results
            }).then( results => {
                resolve(results);
            });
        });
    }
}
