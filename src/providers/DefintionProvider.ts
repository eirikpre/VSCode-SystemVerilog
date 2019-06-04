import * as vscode from 'vscode';
import { SystemVerilogWorkspaceSymbolProvider } from './WorkspaceSymbolProvider';
import { SystemVerilogDocumentSymbolProvider } from './DocumentSymbolProvider';

export class SystemVerilogDefinitionProvider implements vscode.DefinitionProvider {

    private workspaceSymProvider : SystemVerilogWorkspaceSymbolProvider;
    private docSymProvider       : SystemVerilogDocumentSymbolProvider;

    // Strings used in regex'es
    // private regex_module = '$\\s*word\\s*(';
    private regex_port = '\\.word\\s*\\(';

    constructor(workspaceSymProvider: SystemVerilogWorkspaceSymbolProvider, docSymProvider : SystemVerilogDocumentSymbolProvider) {
        this.workspaceSymProvider = workspaceSymProvider;
        this.docSymProvider = docSymProvider;
    };

    public provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<vscode.Definition> {
        return new Promise ( async (resolve, reject) => {
            let range = document.getWordRangeAtPosition(position);
            let line = document.lineAt(position.line).text;
            let word = document.getText(range);

            if (!range) {
                reject();
            }

            // Check for port
            else if (line.match(this.regex_port.replace('word', word))) {
                let container = moduleFromPort(document, range)

                resolve(Promise.resolve(this.workspaceSymProvider.provideWorkspaceSymbols(container, token, true).then( res => {
                    return Promise.all( res.map(x => findPortLocation(x, word)));
                }).then( arrWithUndefined => {
                    return clean(arrWithUndefined, undefined)
                })));
            }

            else {
                // Lookup all symbols in the current document
                await this.docSymProvider.provideDocumentSymbols(document).then(symbols => {
                    symbols.forEach(x => {
                        if(x.name === word) {
                            resolve(x.location);
                        }
                    });
                });

                await this.workspaceSymProvider.provideWorkspaceSymbols(word, token, true).then( res => {
                    if (res.length == 0) {
                        reject();
                    }
                    resolve(res.map( x => x.location ));
                });
            }
        });
    }
}

export function moduleFromPort(document, range): string {
    let text = document.getText(new vscode.Range(new vscode.Position(0,0), range.end))
    let depthParathesis = 0;
    let i = 0;

    for (i = text.length; i>0; i--) {
        if (text[i] == ')')
            depthParathesis++;
        else if (text[i] == '(')
            depthParathesis--;
        
        if (depthParathesis == -1) {
            let match_param = text.slice(0, i).match(/(\w+)\s*#\s*$/);
            let match_simple = text.slice(0, i).match(/(\w+)\s+(\w+)\s*$/);
            if (match_param)
                return match_param[1]
            else if (match_simple)
                return match_simple[1]
        }
    }
}


function findPortLocation(symbol: vscode.SymbolInformation, port:string): Thenable<vscode.Location> {
    return vscode.workspace.openTextDocument(symbol.location.uri).then( doc => {

        for (let i = symbol.location.range.start.line; i<doc.lineCount; i++) {
            let line = doc.lineAt(i).text;
            if (line.match("\\bword\\b".replace('word', port))) {
                return new vscode.Location(symbol.location.uri, new vscode.Position(i, line.indexOf(port)));
            }
        }
    });
}

function clean(arr: Array<any>, deleteValue): Array<any> {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == deleteValue) {
        arr.splice(i, 1);
        i--;
      }
    }
    return arr;
}
