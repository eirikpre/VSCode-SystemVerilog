import { TextDocument } from 'vscode';

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
