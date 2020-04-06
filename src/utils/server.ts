/* Defines tools that require `vscode-languageserver` module */

import { TextDocument,
        Range,
        Position } from 'vscode-languageserver';

/**
    Check if a given `document` is a SystemVerilog file.

    @param document the document to check
    @return true if the document is a SystemVerilog file
*/
export function isSystemVerilogDocument(document: TextDocument): boolean {
    if (!document) {
        return false;
    }

    if (document.languageId === "systemverilog") {
        return true;
    }

    return false;
}

/**
    Check if a given `document` is a Verilog file.

    @param document the document to check
    @return true if the document is a Verilog file
*/
export function isVerilogDocument(document: TextDocument): boolean {
    if (!document) {
        return false;
    }

    if (document.languageId === "verilog") {
        return true;
    }

    return false;
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
    if(offendingSymbol == null || offendingSymbol == undefined){ // When offendingSymbol is null, we assume the error is marked to the end of the line.
        endPosition = Number.MAX_VALUE;
    } else {
        endPosition = startPosition + offendingSymbol.length;
    }
    return Range.create(Position.create(line, startPosition), Position.create(line, (endPosition)));
}