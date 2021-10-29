import { Range, Position } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import * as vscode from 'vscode';
import { Uri, workspace } from 'vscode';
import * as path from 'path';
import * as assert from 'assert';
import { ANTLRBackend } from '../compiling/ANTLRBackend';

const testFolderLocation = '../../src/test';

suite('Macro Replacement Tests', () => {
    test('test #1: Macro replacement/definition removal for text without macro definitions', async () => {
        const inputFileName = 'test-files/MacroReplace.test/no_macros.sv';
        const expectedFileName = 'test-files/MacroReplace.test/no_macros_expected.sv';
        await macroReplaceTest(inputFileName, expectedFileName);
    }).timeout(10000);

    test('test #2: Macro replacement/definition removal for text with single macro definition but no macro uses', async () => {
        const inputFileName = 'test-files/MacroReplace.test/single_macro_no_uses.sv';
        const expectedFileName = 'test-files/MacroReplace.test/single_macro_no_uses_expected.sv';
        await macroReplaceTest(inputFileName, expectedFileName);
    }).timeout(10000);

    test('test #3: Macro replacement/definition removal for text with single macro definition with multiple macro uses', async () => {
        const inputFileName = 'test-files/MacroReplace.test/single_macro_multiple_uses.sv';
        const expectedFileName = 'test-files/MacroReplace.test/single_macro_multiple_uses_expected.sv';
        await macroReplaceTest(inputFileName, expectedFileName);
    }).timeout(10000);

    test('test #4: Macro replacement/definition removal for text with multiple macro definitions with multiple macro uses', async () => {
        const inputFileName = 'test-files/MacroReplace.test/multiple_macros_multiple_uses.sv';
        const expectedFileName = 'test-files/MacroReplace.test/multiple_macros_multiple_uses_expected.sv';
        await macroReplaceTest(inputFileName, expectedFileName);
    }).timeout(10000);

    test('test #5: Macro replacement/definition removal for text with multiple macro definitions interspersed throughout the file', async () => {
        const inputFileName = 'test-files/MacroReplace.test/multiple_macros_interspersed.sv';
        const expectedFileName = 'test-files/MacroReplace.test/multiple_macros_interspersed_expected.sv';
        await macroReplaceTest(inputFileName, expectedFileName);
    }).timeout(10000);

    // This feature is not currently implemented
    /* test('test #6: Macro replacement/definition removal for text with single macro defined twice and used after each definition', async () => {
        let inputFileName: string = 'test-files/MacroReplace.test/redefined_macro.sv';
        let expectedFileName: string = 'test-files/MacroReplace.test/redefined_macro_expected.sv';
        await macroReplaceTest(inputFileName, expectedFileName);
    }).timeout(10000); */

    test('test #7: Macro replacement/definition removal for text with single multiline macro definition with one use', async () => {
        const inputFileName = 'test-files/MacroReplace.test/multiline_macro.sv';
        const expectedFileName = 'test-files/MacroReplace.test/multiline_macro_expected.sv';
        await macroReplaceTest(inputFileName, expectedFileName);
    }).timeout(10000);
});

/**
 * Tests that the output of macroReplace when given the text from input_file matches the text from expected_file
 * @param input_file The file to retrieve the input text from
 * @param expected_file The file to retrieve the expected text from
 */
async function macroReplaceTest(input_file: string, expected_file: string) {
    const filePath = path.join(__dirname, testFolderLocation, input_file);
    const uriDoc = Uri.file(filePath);

    const documentWorkspace = await workspace.openTextDocument(uriDoc);
    const document: TextDocument = castTextDocument(documentWorkspace);
    const inputText: string = document.getText();

    const filePath2 = path.join(__dirname, testFolderLocation, expected_file);
    const uriDoc2 = Uri.file(filePath2);

    const documentWorkspace2 = await workspace.openTextDocument(uriDoc2);
    const document2: TextDocument = castTextDocument(documentWorkspace2);
    const expectedText: string = document2.getText().replace(/\r\n/g, '\n');

    const outputText: string = new ANTLRBackend().macroReplace(inputText);

    if (outputText !== expectedText) {
        assert.fail();
    } // else pass
}

/**
 * Converts a given `document` from vscode.TextDocument to vscode-languageserver.TextDocument
 *
 * @param document the document to convert
 * @returns a converted document
 */
function castTextDocument(document: vscode.TextDocument): TextDocument {
    return {
        uri: document.uri.fsPath,
        languageId: document.languageId,
        version: document.version,
        getText(range?: Range): string {
            if (range) return document.getText(castRange(range));
            return document.getText();
        },
        lineCount: document.lineCount,
        positionAt(offset: number): Position {
            const position = document.positionAt(offset);
            return {
                line: position.line,
                character: position.character
            };
        },
        offsetAt(position: Position) {
            return document.offsetAt(castPosition(position));
        }
    };
}

/**
 * Converts a given `range` from vscode-languageserver.Range to vscode.Range
 *
 * @param document the range to convert
 * @returns a converted range
 */
function castRange(range: Range) {
    const startOld = range.start;
    const endOld = range.end;

    const start = new vscode.Position(startOld.line, startOld.character);
    const end = new vscode.Position(endOld.line, endOld.character);

    return new vscode.Range(start, end);
}
/**
 * Converts a given `position` from vscode-languageserver.Position to vscode.Position
 *
 * @param document the position to convert
 * @returns a converted position
 */
function castPosition(position: Position) {
    return new vscode.Position(position.line, position.character);
}
