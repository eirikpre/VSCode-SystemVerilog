import * as vscode from 'vscode';
import { SystemVerilogWorkspaceSymbolProvider } from './WorkspaceSymbolProvider';
import { SystemVerilogDocumentSymbolProvider } from './DocumentSymbolProvider';
import { resolve } from 'url';

export class SystemVerilogDefinitionProvider implements vscode.DefinitionProvider {

	private symProvider : SystemVerilogWorkspaceSymbolProvider;

	// Strings used in regex'es
	// private regex_module = '$\\s*word\\s*(';
	private regex_port = '\\.word\\s*\\(';

	constructor(symProvider: SystemVerilogWorkspaceSymbolProvider) {
		this.symProvider = symProvider;
    };

	public provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.Definition> {
		let range = document.getWordRangeAtPosition(position);
		let line = document.lineAt(position.line).text;
        let word = document.getText(range);

		if (!range) {
            return Promise.resolve(null);
        }
        if (line.match(this.regex_port.replace('word', word))) {
            let container = moduleFromPort()

            return Promise.resolve(this.symProvider.provideWorkspaceSymbols(container, token, true).then( res => {
                return Promise.all( res.map(x => findPortLocation(x, word)));
            }).then( arrWithUndefined => {
                return clean(arrWithUndefined, undefined)
            }));
        }
        
        /*
            FIXME:  WIP!

            return commands.executeCommand<SymbolInformation[]>(
                "vscode.executeDocumentSymbolProvider",
                vscode.window.activeTextEditor.document.uri
            );

        */

        return Promise.resolve(this.symProvider.provideWorkspaceSymbols(word, token, true).then( res => {
            if (res.length == 0) {
                return null;
            }
            return res.map( x => x.location );
		}));

        function moduleFromPort(): string {
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
