import * as vscode from 'vscode';
import { basename } from 'path'
import { SystemVerilogWorkspaceSymbolProvider } from './WorkspaceSymbolProvider';
import { SystemVerilogDocumentSymbolProvider } from './DocumentSymbolProvider';

export class SystemVerilogHoverProvider implements vscode.HoverProvider {
    private workspaceSymProvider: SystemVerilogWorkspaceSymbolProvider;
    private docSymProvider: SystemVerilogDocumentSymbolProvider;

    constructor(workspaceSymProvider: SystemVerilogWorkspaceSymbolProvider, docSymProvider : SystemVerilogDocumentSymbolProvider) {
        this.workspaceSymProvider = workspaceSymProvider;
        this.docSymProvider = docSymProvider;
    };

    provideHover(document : vscode.TextDocument, position : vscode.Position, token: vscode.CancellationToken) : vscode.ProviderResult<vscode.Hover> {
        return new Promise(resolve => {
            var lookupRange = document.getWordRangeAtPosition(position);
            var lookupTerm = document.getText(lookupRange);

            // First, lookup in the current document
            return this.docSymProvider.provideDocumentSymbols(document).then(docSyms => {
                docSyms.forEach(docSym => {
                    if(docSym.name === lookupTerm) {
                        return resolve(buildHover(document, docSym, lookupRange));
                    }
                });

                // Then, lookup in the workspace if current document failed
                return this.workspaceSymProvider.provideWorkspaceSymbols(lookupTerm, token, true).then((sym) => {
                    if(sym.length !== 0) {
                        resolve(buildHover(document, sym[0], lookupRange));
                    } else {
                        resolve(undefined);
                    }
                });
            });
        });
    }
}

function buildHover(document: vscode.TextDocument, symbol: vscode.SymbolInformation, range?:vscode.Range) : vscode.ProviderResult<vscode.Hover> {
    // Open document containing the symbol
    if (symbol.location.uri === document.uri) {
        // Same document, don't provide a path
        return hoverSymbol(document.lineAt(symbol.location.range.start).text);
    } else {
        return vscode.workspace.openTextDocument(symbol.location.uri).then (symbol_doc => {
            return hoverSymbol(
                symbol_doc.lineAt(symbol.location.range.start).text,
                basename(symbol_doc.uri.path)
            );
        });
    }

    function hoverSymbol (line: string, fileName?:string) {
        // Return the line where the symbol is declared, highlighted as SV
        return new vscode.Hover([
            {
                language: 'systemverilog',
                value: line
            },
            fileName
        ]);
    }
}
