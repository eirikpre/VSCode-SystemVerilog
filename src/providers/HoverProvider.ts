import { HoverProvider, TextDocument, Position, CancellationToken, ProviderResult, Hover, Range, workspace } from 'vscode';
import { basename } from 'path'
import { SystemVerilogWorkspaceSymbolProvider } from './WorkspaceSymbolProvider';
import { SystemVerilogDocumentSymbolProvider } from './DocumentSymbolProvider';
import { SystemVerilogSymbol } from '../symbol';

export class SystemVerilogHoverProvider implements HoverProvider {
    private workspaceSymProvider: SystemVerilogWorkspaceSymbolProvider;
    private docSymProvider: SystemVerilogDocumentSymbolProvider;

    constructor(workspaceSymProvider: SystemVerilogWorkspaceSymbolProvider, docSymProvider : SystemVerilogDocumentSymbolProvider) {
        this.workspaceSymProvider = workspaceSymProvider;
        this.docSymProvider = docSymProvider;
    };

    provideHover(document : TextDocument, position : Position, token: CancellationToken) : ProviderResult<Hover> {
        return new Promise( (resolve, reject) => {
            var lookupRange = document.getWordRangeAtPosition(position);
            
            if (!lookupRange) {
                return resolve(undefined);
            }
            
            var lookupTerm = document.getText(lookupRange);
            
            // First, lookup in the current document
            return this.docSymProvider.provideDocumentSymbols(document).then(docSyms => {
                docSyms.forEach(docSym => {
                    if(docSym.name === lookupTerm) {
                        return resolve(buildHover(document, docSym, lookupRange));
                    }
                });

                // Then, lookup in the workspace if current document failed
                return this.workspaceSymProvider.provideWorkspaceSymbols(lookupTerm, token, true).then((res: Array<SystemVerilogSymbol>) => {
                    if(res.length !== 0) {
                        resolve(buildHover(document, res[0], lookupRange));
                    } else {
                        resolve(undefined);
                    }
                });
            });
        });
    }
}

function buildHover(document: TextDocument, symbol: SystemVerilogSymbol, range?:Range) : ProviderResult<Hover> {
    // Open document containing the symbol
    if (symbol.location.uri === document.uri) {
        // Same document, don't provide a path
        return hoverSymbol(document.lineAt(symbol.location.range.start).text);
    } else {
        return workspace.openTextDocument(symbol.location.uri).then (symbol_doc => {
            return hoverSymbol(
                symbol_doc.lineAt(symbol.location.range.start).text,
                basename(symbol_doc.uri.path)
            );
        });
    }

    function hoverSymbol (line: string, fileName?:string) {
        // Return the line where the symbol is declared, highlighted as SV
        return new Hover([
            {
                language: 'systemverilog',
                value: line
            },
            fileName
        ]);
    }
}
