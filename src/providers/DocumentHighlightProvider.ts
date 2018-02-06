'use strict';

import {SystemVerilogDocumentSymbolProvider} from './DocumentSymbolProvider';
import {DocumentHighlightProvider, DocumentHighlight, DocumentHighlightKind, CancellationToken, TextDocument, Position, Range} from 'vscode';

export default class SystemVerilogDocumentHighlightProvider implements DocumentHighlightProvider {

    public provideDocumentHighlights(document: TextDocument, position: Position, token: CancellationToken): Promise<DocumentHighlight[]> {
        return new Promise((resolve, reject) => {
            let line = document.lineAt(position.line).text;
            let match = line.match(/\b(\w+)\b/)
            let word = ""
            if (match === undefined) { reject() }
            else {
                match.forEach( w => {
                let start = line.indexOf(w);
                let end = start + w.length;
                if ( start < position.character && position.character < end ) {
                    word = w;
                    }
                });
            }
            if (word === "") { reject() }
            let symbolProvider = new(SystemVerilogDocumentSymbolProvider);
            symbolProvider.provideDocumentSymbols(document, token).then( symbols => {
                return symbols.map(e => e.name);
            }).then( names => {
                if (names.indexOf(word) > -1) {
                    return word;
                }
            }).then( word => {
                var highlights = [];
                var regex = new RegExp('\b(' + word + ')\b');
                for (var i = 0; i < document.lineCount; i++) {
                    var line = document.lineAt(i);
                    var match = regex.exec(line.text);
                    
                    if (match !== null) {
                        highlights.push(new DocumentHighlight(new Range(
                            line.lineNumber,
                            line.text.indexOf(match[1]),
                            line.lineNumber, 
                            line.text.indexOf(match[1]) + match[2].length
                        )))
                    }
                }
                return highlights
            }).then( h => {
                resolve(h)
            });
        });
    }
}