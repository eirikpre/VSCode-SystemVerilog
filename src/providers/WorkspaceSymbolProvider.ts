import { SystemVerilogDocumentSymbolProvider } from './DocumentSymbolProvider';
import * as vscode from 'vscode';
import * as console from 'console';

// FIXME: Only a copy of DocumentSymbolProvider

export class SystemVerilogWorkspaceSymbolProvider implements vscode.WorkspaceSymbolProvider {
    private regex = /^\s*(module|program|class|interface)\s+(\w+)/;

    public provideWorkspaceSymbols(query: string, token: vscode.CancellationToken): Thenable<vscode.SymbolInformation[]> {
        return new Promise((resolve, reject) => {

            var symbolProvider = new(SystemVerilogDocumentSymbolProvider);
            symbolProvider.regex = this.regex;
            var results = [];
            
            vscode.workspace.findFiles('**/*.sv', undefined, 50, token).then(uris => {
                for(let uri of uris) {
                    vscode.workspace.openTextDocument(uri).then(function(document) {
                        symbolProvider.provideDocumentSymbols(document, token).then(symbols => {
                            for (let symbol of symbols) {
                                results.push(symbol);
                            }
                        });
                    });
                }
                return results
            }).then( results => {
                resolve(results);
            });
        });
    }
}
