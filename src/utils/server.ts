import { Range, Position } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

/**
    Check if a given `document` is a SystemVerilog file.

    @param document the document to check
    @return true if the document is a SystemVerilog file
*/
export function isSystemVerilogDocument(document: TextDocument | undefined): boolean {
    return document?.languageId === 'systemverilog';
}

/**
    Check if a given `document` is a Verilog file.

    @param document the document to check
    @return true if the document is a Verilog file
*/
export function isVerilogDocument(document: TextDocument | undefined): boolean {
    return document?.languageId === 'verilog';
}

/** 
        Gets the `range` of a line given the line number

        @param line the line number
        @return the line's range
    */
export function getLineRange(line: number, offendingSymbol: string, startPosition: number): Range {
    let endPosition: number;
    if (startPosition == null) {
        startPosition = 0;
    }
    if (offendingSymbol == null || offendingSymbol === undefined) {
        // When offendingSymbol is null, assume the error is marked to the end of the line
        endPosition = Number.MAX_VALUE;
    } else {
        endPosition = startPosition + offendingSymbol.length;
    }
    return Range.create(Position.create(line, startPosition), Position.create(line, endPosition));
}
