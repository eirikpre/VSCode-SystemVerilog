import { DefinitionProvider, TextDocument, Position, CancellationToken, Definition, Range, Location, workspace, commands, DocumentSymbol, Uri, SymbolInformation } from 'vscode';
import { SystemVerilogWorkspaceSymbolProvider } from './WorkspaceSymbolProvider';
import { SystemVerilogSymbol } from '../symbol';

export class SystemVerilogDefinitionProvider implements DefinitionProvider {
    private workspaceSymProvider : SystemVerilogWorkspaceSymbolProvider;

    // Strings used in regex'es
    // private regex_module = '$\\s*word\\s*(';
    private regex_port = '\\.word\\s*\\(';
    private regex_package = '\\b(\\w+)\\s*::\\s*(word)';

    constructor(workspaceSymProvider: SystemVerilogWorkspaceSymbolProvider) {
        this.workspaceSymProvider = workspaceSymProvider;
    };

    public provideDefinition(document: TextDocument, position: Position, token: CancellationToken): Promise<Definition> {
        return new Promise ( async (resolve, reject) => {
            let range = document.getWordRangeAtPosition(position);
            let line = document.lineAt(position.line).text;
            let word = document.getText(range);

            // Check for port
            let match_port = line.match(this.regex_port.replace('word', word));
            let match_package = line.match(this.regex_package.replace('word', word));

            if (!range) {
                reject();
            }

            // Port
            else if (match_port && match_port.index === range.start.character-1) {
                let container = moduleFromPort(document, range)

                resolve(Promise.resolve(this.workspaceSymProvider.provideWorkspaceSymbols(container, token, true).then( res => {
                    return Promise.all( res.map(x => findPortLocation(x, word)));
                }).then( arrWithUndefined => {
                    return clean(arrWithUndefined, undefined)
                })));
                reject();
            }

            // Parameter
            else if (match_package && line.indexOf(word, match_package.index) == range.start.character) {
                await this.workspaceSymProvider.provideWorkspaceSymbols(match_package[1], token, true)
                .then( (ws_symbols: SymbolInformation[]) => {
                    if (ws_symbols.length && ws_symbols[0].location) {
                        return ws_symbols[0].location.uri;
                    }
                }).then( uri => {
                    if (uri) {
                        commands.executeCommand("vscode.executeDocumentSymbolProvider", uri, word).then( (symbols) => {
                            let results: Location[] = [];
                            getDocumentSymbols(results, symbols, word, uri, match_package[1]);
                            resolve(results)
                        })
                    }
                });
                reject();
            }

            else {
                // Lookup all symbols in the current document
                await commands.executeCommand("vscode.executeDocumentSymbolProvider", document.uri, word)
                .then( (symbols : DocumentSymbol[]) => {
                    let results: Location[] = [];
                    getDocumentSymbols(results, symbols, word, document.uri);
                    if (results.length !== 0) {
                        resolve(results);
                    }
                });

                await this.workspaceSymProvider.provideWorkspaceSymbols(word, token, true)
                .then( res => {
                    if (res.length !== 0) {
                        resolve(res.map( x => x.location ));
                    }
                });
                reject();
            }
        });
    }
}


// Retrieves locations from the hierarchical DocumentSymbols
function getDocumentSymbols(results: Location[], entries, word: string, uri: Uri, containerName?: string): void {
    for (let entry of entries) {
        if (entry.name === word) {
            if (containerName) {
                if (entry.containerName === containerName) {
                    results.push({
                        uri: uri,
                        range: entry.range,
                    });
                } 
            } else {
                results.push({
                    uri: uri,
                    range: entry.range,
                });
            }
        }
        if (entry.children) {
            getDocumentSymbols(results, entry.children, word, uri);
        }
    }
}

export function moduleFromPort(document, range): string {
    let text = document.getText(new Range(new Position(0,0), range.end))
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


function findPortLocation(symbol: SystemVerilogSymbol, port:string): Thenable<Location> {
    return workspace.openTextDocument(symbol.location.uri).then( doc => {

        for (let i = symbol.location.range.start.line; i<doc.lineCount; i++) {
            let line = doc.lineAt(i).text;
            if (line.match("\\bword\\b".replace('word', port))) {
                return new Location(symbol.location.uri, new Position(i, line.indexOf(port)));
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
