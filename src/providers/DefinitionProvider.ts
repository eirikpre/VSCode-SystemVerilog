import { DefinitionProvider, TextDocument, Position, SymbolKind, CancellationToken, Definition, Range, Location, commands, DocumentSymbol, Uri, SymbolInformation } from 'vscode'; // prettier-ignore
import { regexGetIndexes } from '../utils/common';

export class SystemVerilogDefinitionProvider implements DefinitionProvider {
    public provideDefinition(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): Promise<Definition> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<Definition>(async (resolve, _reject) => {
            const range = document.getWordRangeAtPosition(position);
            const line = document.lineAt(position.line).text;
            const word = document.getText(range);
            const results: Location[] = [];

            if (!range) {
                resolve(results);
            }

            // don't attempt to find a reference for a symbol in a comment
            const inside = isLineInsideComments();
            if(inside) {
                resolve(results);
            }
            // Port
            await findPortInModule();

            // Package
            await findInPackage();

            // Lookup all symbols in the current document
            if (results.length === 0) {
                try {
                    const symbols: DocumentSymbol[] = await commands.executeCommand('vscode.executeDocumentSymbolProvider', document.uri, word);
                    getDocumentSymbols(results, symbols, word, range, document.uri);
                } catch(reason) {
                    console.log(reason); // eslint-disable-line no-console
                }
            }

            // Look up all indexed symbols
            if (results.length === 0) {
                const res: SymbolInformation[] = await commands.executeCommand('vscode.executeWorkspaceSymbolProvider', `¤${word}`, token)
                if (res.length !== 0) {
                    res.map((x) => results.push(x.location));
                }
            }

            resolve(results);

            function isLineInsideComments(): Boolean {
                /* eslint-disable spaced-comment */
                //is line commented out with a single line comment (//)?
                const isSingleComment = /^\s*\/\/.*/.test(line);
                if(isSingleComment) {
                    return true;
                }
                // only look at text before symbol. If we see a begin comment, an end comment
                // must be implied and we can ignore looking for one
                const text = document.getText(new Range(new Position(0, 0), range.start));
                // Get the locations of begin and end comment blocks
                const commentStart = regexGetIndexes(document, text, /(?<!\/)\/\*/g, 0);
                const commentEnd = regexGetIndexes(document, text, /\*\//g, 0);

                // only look at text before symbol. If we see a begin comment, an end comment
                // must be implied and we can ignore looking for one
                const lastStartComment = commentStart.find(x => x.isBeforeOrEqual(range.start));
                const lastEndComment = commentEnd.find(x => x.isBeforeOrEqual(range.start));

                // If there is begin comment (/*) that is not yet closed,
                // we know the symbol must be commented out.
                if(lastStartComment > lastEndComment) {
                    // we must be within a block comment
                    return true;
                }
                return false;
            }

            async function findInPackage() {
                const regexPackage = '\\b(\\w+)\\s*::\\s*(word)';
                const matchPackage = line.match(regexPackage.replace('word', word));
                if (matchPackage && line.indexOf(word, matchPackage.index) === range.start.character) {
                    await commands
                        .executeCommand('vscode.executeWorkspaceSymbolProvider', `¤${matchPackage[1]}`, token)
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
                                        getDocumentSymbols(results, symbols, word, range, uri, matchPackage[1]);
                                    });
                            }
                        });
                }
            }

            async function findPortInModule() {
                const regexPort = '\\.word\\s*\\(';
                const matchPort = line.match(regexPort.replace('word', word));
                if (matchPort && matchPort.index === range.start.character - 1) {
                    const container = moduleFromPort(document, range);
                    if (container) {
                        await commands
                            .executeCommand('vscode.executeWorkspaceSymbolProvider', `¤${container}`)
                            .then((res: SymbolInformation[]) =>
                                Promise.all(
                                    res.map(async (x) =>
                                        commands
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
                                                    range,
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
function getDocumentSymbols(
    results: Location[],
    entries,
    word: string,
    range: Range,
    uri: Uri,
    containerName?: string
): void {
    if (!entries) {
        return;
    }
    for (const entry of entries) {
        if (entry.name === word && entry.kind !== SymbolKind.Key) {
            if (containerName) {
                if (entry.containerName === containerName) {
                    results.push({
                        uri,
                        range: entry.range
                    });
                }
            } else if (range.start.line !== entry.range.start.line) {
                results.push({
                    uri,
                    range: entry.range
                });
            }
        }
        if (entry.children.length > 0) {
            getDocumentSymbols(results, entry.children, word, range, uri);
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
            const matchParam = text.slice(0, i).match(/(\w+)\s*#\s*$/);
            const matchSimple = text.slice(0, i).match(/(\w+)\s+(\w+)\s*$/);
            if (matchParam) return matchParam[1];
            if (matchSimple) return matchSimple[1];
        }
    }
}
