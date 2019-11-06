import {
    TextDocument,
    createConnection,
    Diagnostic,
    DiagnosticSeverity,
    Range,
    Position,
    TextDocuments,
    DidOpenTextDocumentParams,
    DidOpenTextDocumentNotification,
    DidCloseTextDocumentParams,
    DidCloseTextDocumentNotification,
    TextDocumentSyncKind,
    ProposedFeatures,
    ConnectionStrategy
} from 'vscode-languageserver';
import * as vscode from 'vscode';
import {
    Uri, workspace
} from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as assert from 'assert';
import { ANTLRBackend } from '../compiling/ANTLRBackend';
import { getPathFromUri } from '../utils/common';
import { beforeEach } from 'mocha'
import { Select_expressionContext } from '../compiling/ANTLR/grammar/build/SystemVerilogParser';
import { TransportKind, TextDocumentIdentifier } from 'vscode-languageclient';
import { Duplex } from 'stream';

const testFolderLocation = '../../src/test/';

suite('Macro Replacement Tests', () => {
    test('test #1: Macro replacement/definition removal for text without macro definitions', async () => {
        let input_file_name: string = `test-files/MacroReplace.test/no_macros.sv`;
        let expected_file_name: string = `test-files/MacroReplace.test/no_macros_expected.sv`;
        await macroReplaceTest(input_file_name, expected_file_name);
    }).timeout(10000);

    test('test #2: Macro replacement/definition removal for text with single macro definition but no macro uses', async () => {
        let input_file_name: string = `test-files/MacroReplace.test/single_macro_no_uses.sv`;
        let expected_file_name: string = `test-files/MacroReplace.test/single_macro_no_uses_expected.sv`;
        await macroReplaceTest(input_file_name, expected_file_name);
    }).timeout(10000);

    test('test #3: Macro replacement/definition removal for text with single macro definition with multiple macro uses', async () => {
        let input_file_name: string = `test-files/MacroReplace.test/single_macro_multiple_uses.sv`;
        let expected_file_name: string = `test-files/MacroReplace.test/single_macro_multiple_uses_expected.sv`;
        await macroReplaceTest(input_file_name, expected_file_name);
    }).timeout(10000);

    test('test #4: Macro replacement/definition removal for text with multiple macro definitions with multiple macro uses', async () => {
        let input_file_name: string = `test-files/MacroReplace.test/multiple_macros_multiple_uses.sv`;
        let expected_file_name: string = `test-files/MacroReplace.test/multiple_macros_multiple_uses_expected.sv`;
        await macroReplaceTest(input_file_name, expected_file_name);
    }).timeout(10000);

    test('test #5: Macro replacement/definition removal for text with multiple macro definitions interspersed throughout the file', async () => {
        let input_file_name: string = `test-files/MacroReplace.test/multiple_macros_interspersed.sv`;
        let expected_file_name: string = `test-files/MacroReplace.test/multiple_macros_interspersed_expected.sv`;
        await macroReplaceTest(input_file_name, expected_file_name);
    }).timeout(10000);

    //This feature is not currently implemented
    /*test('test #6: Macro replacement/definition removal for text with single macro defined twice and used after each definition', async () => {
        let input_file_name: string = `test-files/MacroReplace.test/redefined_macro.sv`;
        let expected_file_name: string = `test-files/MacroReplace.test/redefined_macro_expected.sv`;
        await macroReplaceTest(input_file_name, expected_file_name);
    }).timeout(10000);*/

    test('test #7: Macro replacement/definition removal for text with single multiline macro definition with one use', async () => {
        let input_file_name: string = `test-files/MacroReplace.test/multiline_macro.sv`;
        let expected_file_name: string = `test-files/MacroReplace.test/multiline_macro_expected.sv`;
        await macroReplaceTest(input_file_name, expected_file_name);
    }).timeout(10000);
});

/**
 * Tests that the output of macroReplace when given the text from input_file matches the text from expected_file
 * @param input_file The file to retrieve the input text from
 * @param expected_file The file to retrieve the expected text from
 */
async function macroReplaceTest(input_file: string, expected_file: string) {
        let filePath = path.join(__dirname, testFolderLocation, input_file);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);
        let input_text: string = document.getText();

        let filePath2 = path.join(__dirname, testFolderLocation, expected_file);
        let uriDoc2 = Uri.file(filePath2);

        let documentWorkspace2 = await workspace.openTextDocument(uriDoc2);
        let document2: TextDocument = castTextDocument(documentWorkspace2);
        let expected_text: string = document2.getText().replace(/\r\n/g, '\n');

        let output_text: string = new ANTLRBackend().macroReplace(input_text);

        if (output_text != expected_text) {
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
            if (range)
                return document.getText(castRange(range));
            else
                return document.getText();
        },
        lineCount: document.lineCount,
        positionAt(offset: number): Position {
            let position = document.positionAt(offset);
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
    let startOld = range.start;
    let endOld = range.end;

    let start = new vscode.Position(startOld.line, startOld.character);
    let end = new vscode.Position(endOld.line, endOld.character);

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
