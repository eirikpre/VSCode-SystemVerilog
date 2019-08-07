import { DocumentSymbolProvider, SymbolInformation, CancellationToken, TextDocument } from 'vscode'
import { SystemVerilogParser } from '../parser';

export class SystemVerilogDocumentSymbolProvider implements DocumentSymbolProvider {
    private parser: SystemVerilogParser;

    constructor(parser) {
        this.parser = parser;
    }

    /**
        Matches the regex pattern with the document's text. If a match is found, it creates a `SymbolInformation` object.
        If `documentSymbols` is not `undefined`, than the object is added to it, 
        otherwise add the objects to an empty list and return it.
        
        @param document The document in which the command was invoked.
        @param token A cancellation token.
        @return A list of `SymbolInformation` objects or a thenable that resolves to such. The lack of a result can be
        signaled by returning `undefined`, `null`, or an empty list.
    */
    public provideDocumentSymbols(document: TextDocument, token?: CancellationToken): Thenable<Array<SymbolInformation>> {
        return new Promise((resolve) => {
            let text = document.getText();
            /* 
            Matches the regex and uses the index from the regex to find the position
            TODO: Look through the symbols to check if it either is defined in the current file or in the workspace.
                  Use that information to figure out if an instanciated 'unknown' object is of a known type.
            */
            resolve(this.parser.get_all_recursive(document, text));
        });
    }
}
