import { DefinitionProvider, TextDocument, Position, CancellationToken, Definition, Range, Location, commands, DocumentSymbol, Uri, SymbolInformation } from 'vscode'; // prettier-ignore
import { getSymbolKind } from '../symbol';
import { regexGetIndexes } from '../utils/common';

export class SystemVerilogDefinitionProvider implements DefinitionProvider {
    public async provideDefinition(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): Promise<Definition> {
        try {
            const range = document.getWordRangeAtPosition(position);
            if (!range) return [];

            const line = document.lineAt(position.line).text;
            const word = document.getText(range);

            if (isLineInsideComments(document, range, line)) return [];

            const matchPort = line.match(`\\.\\s*${word}\\s*\\(`);
            const matchPackage = line.match(`\\b(\\w+)\\s*::\\s*(${word})`);

            // Port connection: ".port(expr)" — definition is the port in the
            // surrounding module's declaration.
            if (matchPort && matchPort.index === range.start.character - 1) {
                const container = moduleFromPort(document, range);
                if (!container) return [];
                const res =
                    (await commands.executeCommand<SymbolInformation[]>(
                        'vscode.executeWorkspaceSymbolProvider',
                        `¤${container}`,
                        token
                    )) || [];
                const locs: Location[] = [];
                for (const x of res) {
                    if (token.isCancellationRequested) break;
                    const symbols =
                        (await commands.executeCommand<Array<SymbolInformation | DocumentSymbol>>(
                            'vscode.executeDocumentSymbolProvider',
                            x.location.uri,
                            word
                        )) || [];
                    locs.push(...extractLocations(symbols, word, x.location.uri, container));
                }
                return locs;
            }

            // Package-qualified name: "Pkg::name" — definition is in Pkg.
            if (matchPackage && line.indexOf(word, matchPackage.index) === range.start.character) {
                const wsSyms =
                    (await commands.executeCommand<SymbolInformation[]>(
                        'vscode.executeWorkspaceSymbolProvider',
                        `¤${matchPackage[1]}`,
                        token
                    )) || [];
                if (wsSyms.length === 0 || !wsSyms[0].location) return [];
                const uri = wsSyms[0].location.uri;
                const symbols =
                    (await commands.executeCommand<Array<DocumentSymbol | SymbolInformation>>(
                        'vscode.executeDocumentSymbolProvider',
                        uri,
                        word
                    )) || [];
                return extractLocations(symbols, word, uri, matchPackage[1]);
            }

            // Module instantiation: "ModuleType [#(...)] inst_name (...)". When the
            // instance is given the same name as its module (issue #242), the local
            // document-symbol lookup below would resolve the type to the instance
            // itself. Detect a click on the type position and jump to the module
            // definition instead. The type is the first token on the line and is
            // followed by an optional parameter list, the instance name, then '(' or '#'.
            const beforeWord = line.slice(0, range.start.character);
            const afterWord = line.slice(range.end.character);
            const isInstantiationType =
                /^\s*$/.test(beforeWord) && /^\s*(?:#\s*\([\s\S]*?\)\s*)?[a-zA-Z_]\w*\s*[#(]/.test(afterWord);
            if (isInstantiationType) {
                const moduleKind = getSymbolKind('module');
                const wsModules =
                    (await commands.executeCommand<SymbolInformation[]>(
                        'vscode.executeWorkspaceSymbolProvider',
                        `¤${word}`,
                        token
                    )) || [];
                const moduleLocs = wsModules.filter((s) => s.kind === moduleKind).map((x) => x.location);
                if (moduleLocs.length) return moduleLocs;
            }

            // Conversely, the instance *name* is its own declaration — there is no
            // definition to navigate to — so only the module type should be
            // clickable (issue #242). Suppress go-to-definition when the click is on
            // the instance name: a type token (not a declaration keyword), an
            // optional parameter list, then this word, then a port list '('.
            const declKeyword =
                /^(?:module|macromodule|interface|program|package|primitive|config|checker|class|function|task|property|sequence|modport|typedef|import|export|extern|virtual|static|automatic)$/;
            const typeBefore = beforeWord.match(/^\s*([a-zA-Z_][\w:]*)\s*(?:#\s*\([\s\S]*?\)\s*)?$/);
            const isInstanceName =
                !!typeBefore && !declKeyword.test(typeBefore[1]) && /^\s*(?:\[[^\]]*\]\s*)*\(/.test(afterWord);
            if (isInstanceName) return [];

            // Default path: look in the current document first, then workspace.
            const docSyms =
                (await commands.executeCommand<Array<DocumentSymbol | SymbolInformation>>(
                    'vscode.executeDocumentSymbolProvider',
                    document.uri,
                    word,
                    token
                )) || [];
            const localLocs = extractLocations(docSyms, word, document.uri);
            if (localLocs.length) return localLocs;

            const wsSyms =
                (await commands.executeCommand<SymbolInformation[]>(
                    'vscode.executeWorkspaceSymbolProvider',
                    `¤${word}`,
                    token
                )) || [];
            return wsSyms.map((x) => x.location);
        } catch {
            // Any failure — most often a cancelled executeCommand — surfaces
            // as an empty Definition rather than a hung promise.
            return [];
        }
    }
}

function isLineInsideComments(document: TextDocument, range: Range, line: string): boolean {
    /* eslint-disable spaced-comment */
    if (/^\s*\/\/.*/.test(line)) return true;
    const text = document.getText(new Range(new Position(0, 0), range.start));
    const commentStart = regexGetIndexes(document, text, /(?<!\/)\/\*/g, 0);
    const commentEnd = regexGetIndexes(document, text, /\*\//g, 0);
    const lastStart = commentStart.find((x) => x.isBeforeOrEqual(range.start));
    const lastEnd = commentEnd.find((x) => x.isBeforeOrEqual(range.start));
    if (lastStart && (!lastEnd || lastStart.isAfter(lastEnd))) return true;
    return false;
}

function flattenDocumentSymbols(docSyms, parentName?: string) {
    let o = [];
    if (docSyms) {
        for (let s of docSyms) {
            // `executeDocumentSymbolProvider` returns a hierarchical
            // `DocumentSymbol` tree (no `containerName`); the container lives in
            // the parent/child structure. Older VS Code returned flat
            // `SymbolInformation` with `containerName` populated. Cover both:
            // keep an existing `containerName`, otherwise inherit the parent's.
            if (!s.containerName && parentName) {
                s.containerName = parentName;
            }
            o.push(s);
            o = o.concat(flattenDocumentSymbols(s.children, s.name));
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
