/* Defines tools that require `vscode` module */

import { TextDocument } from 'vscode';

/**
    Check if a given `document` is a SystemVerilog file.

    @param document the document to check
    @return true if the document is a SystemVerilog file
*/
export function isSystemVerilogDocument(document: TextDocument | undefined): boolean {
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