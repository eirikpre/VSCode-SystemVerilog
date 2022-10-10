import { DefinitionProvider, TextDocument, Position, CancellationToken, Definition, Range, Location, commands, DocumentSymbol, Uri, SymbolInformation } from 'vscode'; // prettier-ignore
import { getSymbolKind } from '../symbol';
import { regexGetIndexes } from '../utils/common';

export class SystemVerilogDefinitionProvider implements DefinitionProvider {
    public provideDefinition(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): Promise<Definition> {
        return new Promise<Definition>((resolve, _reject) => {
            const range = document.getWordRangeAtPosition(position);
            const line = document.lineAt(position.line).text;
            const word = document.getText(range);
            const results: Location[] = [];

            if (!range) {
                return undefined;
            }
            if (isLineInsideComments()) {
                return undefined;
            }

            const matchPort = line.match(`\\.\\s*${word}\\s*\\(`);
            const matchPackage = line.match(`\\b(\\w+)\\s*::\\s*(${word})`);

            // Return a promise to find object in a portlist
            if (matchPort && matchPort.index === range.start.character - 1) {
                const container = moduleFromPort(document, range);
                if (container) {
                    commands
                        .executeCommand('vscode.executeWorkspaceSymbolProvider', `¤${container}`)
                        .then((res: SymbolInformation[]) => {
                            return Promise.all(
                                res.map(async (x) => {
                                    commands
                                        .executeCommand('vscode.executeDocumentSymbolProvider', x.location.uri, word)
                                        .then((symbols: Array<SymbolInformation | DocumentSymbol>) => {
                                            results.concat(extractLocations(symbols, word, x.location.uri, container));
                                        });
                                })
                            );
                        })
                        .then(() => {
                            resolve(results);
                        });
                }
            }
            // Return a promise to find object in a package
            else if (matchPackage && line.indexOf(word, matchPackage.index) === range.start.character) {
                commands
                    .executeCommand('vscode.executeWorkspaceSymbolProvider', `¤${matchPackage[1]}`, token)
                    .then((ws_symbols: SymbolInformation[]) => {
                        if (ws_symbols.length && ws_symbols[0].location) {
                            return ws_symbols[0].location.uri;
                        }
                    })
                    .then((uri) => {
                        if (uri) {
                            return commands
                                .executeCommand('vscode.executeDocumentSymbolProvider', uri, word)
                                .then((symbols: Array<DocumentSymbol | SymbolInformation>) => {
                                    results.concat(extractLocations(symbols, word, uri, matchPackage[1]));
                                    resolve(results);
                                });
                        } else {
                            resolve(undefined);
                        }
                    });
            }
            // Lookup all symbols in the current document
            else {
                commands
                    .executeCommand('vscode.executeDocumentSymbolProvider', document.uri, word, token)
                    .then((res: Array<DocumentSymbol | SymbolInformation>) => {
                        let o = extractLocations(res, word, document.uri);
                        if (o.length) {
                            resolve(o);
                        } else {
                            // Look up all indexed symbols
                            commands
                                .executeCommand('vscode.executeWorkspaceSymbolProvider', `¤${word}`, token)
                                .then((syms: SymbolInformation[]) => {
                                    resolve(syms.map((x) => x.location));
                                });
                        }
                    });
            }

            function isLineInsideComments(): Boolean {
                /* eslint-disable spaced-comment */
                //is line commented out with a single line comment (//)?
                const isSingleComment = /^\s*\/\/.*/.test(line);
                if (isSingleComment) {
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
                const lastStartComment = commentStart.find((x) => x.isBeforeOrEqual(range.start));
                const lastEndComment = commentEnd.find((x) => x.isBeforeOrEqual(range.start));

                // If there is begin comment (/*) that is not yet closed,
                // we know the symbol must be commented out.
                if (lastStartComment > lastEndComment) {
                    // we must be within a block comment
                    return true;
                }
                return false;
            }
        });
    }
}

function flattenDocumentSymbols(docSyms) {
    let o = [];
    if (docSyms) {
        for (let s of docSyms) {
            o.push(s);
            o = o.concat(flattenDocumentSymbols(s.children));
        }
    }
    return o;
}

function extractLocations(
    docSyms: Array<DocumentSymbol | SymbolInformation>,
    word: string,
    uri: Uri,
    containerName?: string
): Location[] {
    let locs: Location[] = [];
    for (let s of flattenDocumentSymbols(docSyms)) {
        if (s.name === word && s.kind !== getSymbolKind('potential_reference')) {
            if (containerName) {
                if (s.containerName === containerName) {
                    locs.push({
                        uri,
                        range: s.range
                    });
                }
            } else {
                locs.push({
                    uri,
                    range: s.range
                });
            }
        }
    }
    return locs;
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
