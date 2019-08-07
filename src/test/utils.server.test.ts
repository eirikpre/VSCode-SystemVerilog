import {
    TextDocument,
    Diagnostic,
    DiagnosticSeverity,
    Range,
    Position
} from 'vscode-languageserver';
import * as vscode from 'vscode';
import * as assert from 'assert';
import * as path from 'path';
import { isSystemVerilogDocument, isVerilogDocument } from '../utils/server';

const testFolderLocation = '../../../src/test/';

suite('Utils Server Tests', () => {

    test('test #1: isSystemVerilogDocument', async () => {

        let svUri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/design.sv`));
        let vUri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.1.v`));
        let nonSVUri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/foo.txt`));

        const sVDocument = await vscode.workspace.openTextDocument(svUri);
        const vDocument = await vscode.workspace.openTextDocument(vUri);
        const nonSVDocument = await vscode.workspace.openTextDocument(nonSVUri);

        assert.equal(true, isSystemVerilogDocument(castTextDocument(sVDocument)));
        assert.equal(false, isSystemVerilogDocument(castTextDocument(vDocument)));
        assert.equal(false, isSystemVerilogDocument(castTextDocument(nonSVDocument)));

        //undefined/null document
        assert.equal(false, isSystemVerilogDocument(undefined));
        assert.equal(false, isSystemVerilogDocument(null));
    });

    test('test #2: isVerilogDocument', async () => {

        let svUri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/design.sv`));
        let vUri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.1.v`));
        let nonSVUri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/foo.txt`));

        const sVDocument = await vscode.workspace.openTextDocument(svUri);
        const vDocument = await vscode.workspace.openTextDocument(vUri);
        const nonSVDocument = await vscode.workspace.openTextDocument(nonSVUri);

        assert.equal(false, isVerilogDocument(castTextDocument(sVDocument)));
        assert.equal(true, isVerilogDocument(castTextDocument(vDocument)));
        assert.equal(false, isVerilogDocument(castTextDocument(nonSVDocument)));

        //undefined/null document
        assert.equal(false, isVerilogDocument(undefined));
        assert.equal(false, isVerilogDocument(null));
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