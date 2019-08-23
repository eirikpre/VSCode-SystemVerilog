import {
    TextDocument,
    Diagnostic,
    DiagnosticSeverity,
    Range,
    Position
} from 'vscode-languageserver';
import * as vscode from 'vscode';
import {
    Uri, workspace
} from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as assert from 'assert';
import { VerilatorCompiler } from '../compiling/VerilatorCompiler';
import { getPathFromUri } from '../utils/common';

const testFolderLocation = '../../src/test/';
const file_path_placeholder = "FILEPATH_PLACEHOLDER";

let diagnosticCollection: Map<string, Diagnostic[]>;
let documentCompiler = new VerilatorCompiler(undefined, undefined, undefined, undefined, undefined);

suite('VerilatorCompiler Tests', () => {
    test('test #1: Diagnostics from %Error', async () => {
        diagnosticCollection = new Map();

        let filePath = path.join(__dirname, testFolderLocation, `test-files/VerilatorCompiler.test/foo.sv`);

        let uriDoc = Uri.file(filePath);
        let documentWorkspace = await workspace.openTextDocument(uriDoc);

        let document: TextDocument = castTextDocument(documentWorkspace);

        let compiledFilePath = getPathFromUri(document.uri, __dirname);

        let stderrFile = path.join(__dirname, testFolderLocation, `test-files/VerilatorCompiler.test/foo.stderr.txt`);

        let stderr = fs.readFileSync(stderrFile).toString();
        stderr = stderrSetUp(stderr, compiledFilePath);

        documentCompiler.parseDiagnostics(undefined, undefined, stderr, document, compiledFilePath, diagnosticCollection);

        let collection = diagnosticCollection.get(document.uri);
        assert.equal(collection.length, 6);

        //check that every diagnostic is an Error
        collection.forEach((diagnostic: Diagnostic) => {
            if (diagnostic.severity != DiagnosticSeverity.Error) {
                assert.fail();
            }
        });

    });

    test('test #2: Diagnostics from %Warning, %Warning-<flag>', async () => {
        diagnosticCollection = new Map();


        let filePath = path.join(__dirname, testFolderLocation, `test-files/VerilatorCompiler.test/bar.sv`);

        let uriDoc = Uri.file(filePath);
        let documentWorkspace = await workspace.openTextDocument(uriDoc);

        let document: TextDocument = castTextDocument(documentWorkspace);

        let compiledFilePath = getPathFromUri(document.uri, __dirname);

        let stderrFile = path.join(__dirname, testFolderLocation, `test-files/VerilatorCompiler.test/bar.stderr.txt`);

        let stderr = fs.readFileSync(stderrFile).toString();
        stderr = stderrSetUp(stderr, compiledFilePath);

        documentCompiler.parseDiagnostics(undefined, undefined, stderr, document, compiledFilePath, diagnosticCollection);

        let collection = diagnosticCollection.get(document.uri);
        assert.equal(collection.length, 7);

        //check that every diagnostic is an Error
        collection.forEach((diagnostic: Diagnostic) => {
            if (diagnostic.severity != DiagnosticSeverity.Warning && diagnostic.severity != DiagnosticSeverity.Information) {
                assert.fail();
            }
        });

    });

    test('test #3: Diagnostics for empty stderr', async () => {
        diagnosticCollection = new Map();

        let filePath = `test-files/VerilatorCompiler.test/baz.sv`;
        let uriDoc = Uri.file(path.join(__dirname, testFolderLocation, filePath));

        let documentWorkspace = await workspace.openTextDocument(uriDoc);

        let document: TextDocument = castTextDocument(documentWorkspace);

        let compiledFilePath = getPathFromUri(document.uri, __dirname);

        documentCompiler.parseDiagnostics(undefined, undefined, "", document, compiledFilePath, diagnosticCollection);

        let collection = diagnosticCollection.get(document.uri);

        if (collection && collection.length > 0) {
            assert.fail();
        }
    });

    test('test #4: test skipCannotFindModuleTrailingErrors()', async () => {
        //a case where `Cannot find` error is missing from stderr
        let filePath = `test-files/VerilatorCompiler.test/bar.stderr.txt`;
        let stderrFile = path.join(__dirname, testFolderLocation, filePath);

        let uriDoc = Uri.file(path.join(__dirname, testFolderLocation, filePath));
        let document = await workspace.openTextDocument(uriDoc);
        let compiledFilePath = getPathFromUri(document.uri.toString(), __dirname);

        let stderr = fs.readFileSync(stderrFile).toString();
        stderr = stderrSetUp(stderr, compiledFilePath);

        stderr = stderr.replace(/\r\n|\n|\r/g, '\n'); //replace multiple new line characters by a single new line character

        let errors = stderr.split(/\n/g);

        let i = documentCompiler.skipCannotFindModuleTrailingErrors(errors, 0, "test");

        assert.equal(i, 0);

        //a case where `Cannot find` error is in stderr
        filePath = `test-files/VerilatorCompiler.test/qux.sv`;
        stderrFile = path.join(__dirname, testFolderLocation, `test-files/VerilatorCompiler.test/qux.stderr.txt`);

        uriDoc = Uri.file(path.join(__dirname, testFolderLocation, filePath));
        document = await workspace.openTextDocument(uriDoc);
        compiledFilePath = getPathFromUri(document.uri.toString(), __dirname);

        stderr = fs.readFileSync(stderrFile).toString();
        stderr = stderrSetUp(stderr, compiledFilePath);

        //replace multiple new line characters by a single new line character
        stderr = stderr.replace(/\r\n|\n|\r/g, '\n');

        errors = stderr.split(/\r|\n/g);

        i = documentCompiler.skipCannotFindModuleTrailingErrors(errors, 2, "externalModule");

        assert.equal(i, 10);
    });
});


function stderrSetUp(stderr, rootPath) {
    //replace file_path_holder in stderr
    let regex = new RegExp(file_path_placeholder, "g");
    return stderr.replace(regex, rootPath);
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