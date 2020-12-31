import { Range, Position } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import * as vscode from 'vscode';
import * as assert from 'assert';
import * as path from 'path';
import { isSystemVerilogDocument, isVerilogDocument } from '../utils/server';

const testFolderLocation = '../../src/test';

suite('Utils Server Tests', () => {
    test('test #1: isSystemVerilogDocument', async () => {
        const svUri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'design.sv'));
        const vUri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v')); // prettier-ignore
        const nonSVUri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'foo.txt'));

        const sVDocument = await vscode.workspace.openTextDocument(svUri);
        const vDocument = await vscode.workspace.openTextDocument(vUri);
        const nonSVDocument = await vscode.workspace.openTextDocument(nonSVUri);

        assert.strictEqual(true, isSystemVerilogDocument(castTextDocument(sVDocument)));
        assert.strictEqual(false, isSystemVerilogDocument(castTextDocument(vDocument)));
        assert.strictEqual(false, isSystemVerilogDocument(castTextDocument(nonSVDocument)));

        // undefined/null document
        assert.strictEqual(false, isSystemVerilogDocument(undefined));
        assert.strictEqual(false, isSystemVerilogDocument(null));
    });

    test('test #2: isVerilogDocument', async () => {
        const svUri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'design.sv'));
        const vUri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v')); // prettier-ignore
        const nonSVUri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'foo.txt'));

        const sVDocument = await vscode.workspace.openTextDocument(svUri);
        const vDocument = await vscode.workspace.openTextDocument(vUri);
        const nonSVDocument = await vscode.workspace.openTextDocument(nonSVUri);

        assert.strictEqual(false, isVerilogDocument(castTextDocument(sVDocument)));
        assert.strictEqual(true, isVerilogDocument(castTextDocument(vDocument)));
        assert.strictEqual(false, isVerilogDocument(castTextDocument(nonSVDocument)));

        // undefined/null document
        assert.strictEqual(false, isVerilogDocument(undefined));
        assert.strictEqual(false, isVerilogDocument(null));
    });
});

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
            return document.getText(castRange(range));
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
