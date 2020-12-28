import { DefinitionProvider, TextDocument, Position, CancellationToken, Definition, Range, Location, workspace, commands, DocumentSymbol, Uri, SymbolInformation } from 'vscode'; // prettier-ignore

export class SystemVerilogDefinitionProvider implements DefinitionProvider {
    public provideDefinition(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): Promise<Definition> {
        return new Promise<Definition>(async (resolve, _reject) => {
            const range = document.getWordRangeAtPosition(position);
            const line = document.lineAt(position.line).text;
            const word = document.getText(range);
            const results: Location[] = [];

            if (!range) {
                return results;
            }

            // Port
            await findPortInModule();

            // Package
            await findInPackage();

            // Lookup all symbols in the current document
            if (results.length === 0) {
                await commands.executeCommand('vscode.executeDocumentSymbolProvider', document.uri, word).then(
                    (symbols: DocumentSymbol[]) => {
                        getDocumentSymbols(results, symbols, word, document.uri);
                    },
                    (reason: any) => {
                        console.log(reason); // eslint-disable-line no-console
                    }
                );
            }

            // Look up all indexed symbols
            if (results.length === 0) {
                await commands
                    .executeCommand('vscode.executeWorkspaceSymbolProvider', `¤${word}`, token)
                    .then((res: SymbolInformation[]) => {
                        if (res.length !== 0) {
                            res.map((x) => results.push(x.location));
                        }
                    });
            }

            resolve(results);

            async function findInPackage() {
                const regex_package = '\\b(\\w+)\\s*::\\s*(word)';
                const match_package = line.match(regex_package.replace('word', word));
                if (match_package && line.indexOf(word, match_package.index) === range.start.character) {
                    await commands
                        .executeCommand('vscode.executeWorkspaceSymbolProvider', `¤${match_package[1]}`, token)
                        .then((ws_symbols: SymbolInformation[]) => {
                            if (ws_symbols.length && ws_symbols[0].location) {
                                return ws_symbols[0].location.uri;
                            }
                        })
                        .then(async (uri) => {
                            if (uri) {
                                await commands
                                    .executeCommand('vscode.executeDocumentSymbolProvider', uri, word)
                                    .then((symbols) => {
                                        getDocumentSymbols(results, symbols, word, uri, match_package[1]);
                                    });
                            }
                        });
                }
            }

            async function findPortInModule() {
                const regex_port = '\\.word\\s*\\(';
                const match_port = line.match(regex_port.replace('word', word));
                if (match_port && match_port.index === range.start.character - 1) {
                    const container = moduleFromPort(document, range);
                    if (container) {
                        await commands
                            .executeCommand('vscode.executeWorkspaceSymbolProvider', `¤${container}`)
                            .then((res: SymbolInformation[]) =>
                                Promise.all(
                                    res.map(
                                        async (x) =>
                                            await commands
                                                .executeCommand(
                                                    'vscode.executeDocumentSymbolProvider',
                                                    x.location.uri,
                                                    word
                                                )
                                                .then((symbols) => {
                                                    getDocumentSymbols(
                                                        results,
                                                        symbols,
                                                        word,
                                                        x.location.uri,
                                                        container
                                                    );
                                                })
                                    )
                                )
                            );
                    }
                }
            }
        });
    }
}

// Retrieves locations from the hierarchical DocumentSymbols
function getDocumentSymbols(results: Location[], entries, word: string, uri: Uri, containerName?: string): void {
    if (!entries) {
        return;
    }
    for (const entry of entries) {
        if (entry.name === word) {
            if (containerName) {
                if (entry.containerName === containerName) {
                    results.push({
                        uri,
                        range: entry.range
                    });
                }
            } else {
                results.push({
                    uri,
                    range: entry.range
                });
            }
        }
        if (entry.children.length > 0) {
            getDocumentSymbols(results, entry.children, word, uri);
        }
    }
}

export function moduleFromPort(document, range): string {
    const text = document.getText(new Range(new Position(0, 0), range.end));
    let depthParathesis = 0;
    let i = 0;

    for (i = text.length; i > 0; i--) {
        if (text[i] === ')') depthParathesis += 1;
        else if (text[i] === '(') depthParathesis -= 1;

        if (depthParathesis === -1) {
            const match_param = text.slice(0, i).match(/(\w+)\s*#\s*$/);
            const match_simple = text.slice(0, i).match(/(\w+)\s+(\w+)\s*$/);
            if (match_param) return match_param[1];
            if (match_simple) return match_simple[1];
        }
    }
}
