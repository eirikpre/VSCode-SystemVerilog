import * as vscode from 'vscode';
import { SystemVerilogWorkspaceSymbolProvider } from './WorkspaceSymbolProvider';
import { SystemVerilogDocumentSymbolProvider } from './DocumentSymbolProvider';

export class SystemVerilogDefinitionProvider implements vscode.DefinitionProvider {

	private symProvider : SystemVerilogWorkspaceSymbolProvider;

	constructor(symProvider: SystemVerilogWorkspaceSymbolProvider) {
		this.symProvider = symProvider;
    };

	public provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.Location> {
		let range = document.getWordRangeAtPosition(position);
		let line = document.lineAt(position.line).text;

		if (!range || line.startsWith('//')) {
			return Promise.resolve(null);
		}

		let word = document.getText(range);

		let documentSymbol = new SystemVerilogDocumentSymbolProvider().provideDocumentSymbols(document);
		if (documentSymbol !== undefined) {
			documentSymbol.then( res => {
				for (let n = 0; n>res.length; n++) {
					if (res[n].name === word) {
						return res[n].location;
					}
				}
			});
		}
		
		let workspaceSymbol = this.symProvider.provideWorkspaceSymbols(word, token).then( res => {
			if (res[0].name === word) {
				return res[0].location;
			}
		})

		return Promise.resolve(null);

		// return definitionLocation(document, position, this.goConfig, false, token).then(definitionInfo => {
		// 	if (definitionInfo == null || definitionInfo.file == null) return null;
		// 	let definitionResource = vscode.Uri.file(definitionInfo.file);
		// 	let pos = new vscode.Position(definitionInfo.line, definitionInfo.column);
		// 	return new vscode.Location(definitionResource, pos);
		// }, err => {
		// 	if (err) {
		// 		// Prompt for missing tool is located here so that the
		// 		// prompts dont show up on hover or signature help
		// 		if (typeof err === 'string' && err.startsWith(missingToolMsg)) {
		// 			promptForMissingTool(err.substr(missingToolMsg.length));
		// 		} else {
		// 			return Promise.reject(err);
		// 		}
		// 	}
		// 	return Promise.resolve(null);
		// });
	}
}