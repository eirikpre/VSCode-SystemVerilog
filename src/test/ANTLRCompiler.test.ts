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

//This file contains code for testing the antlr backend
//Mocks the document open notification to test full results including call from server

const testFolderLocation = '../../src/test/';
const file_path_placeholder = "FILEPATH_PLACEHOLDER";
const TEST_LANGUAGE_ID = 'typescript';


class TestStream extends Duplex {
	_write(chunk: string, _encoding: string, done: () => void) {
		this.emit('data', chunk);
		done();
	}
	_read(_size: number) { }
}

const up = new TestStream();
const down = new TestStream();

let server = createConnection(up, down);
let client = createConnection(down, up);
server.listen();
client.listen();

function mockOpenDocNotif(config: { version: number, uri:string, text: string }): DidOpenTextDocumentParams {
	const { version, uri, text } = config;
	return { textDocument: { uri: uri, languageId: TEST_LANGUAGE_ID, version, text } };
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    });
}

let filePath = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/single_error.sv`);
let uriDoc = Uri.file(filePath);

const openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: "Basic testing text!!!" });
client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

let root = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/`);

let documents: TextDocuments;

suite('ANTLRBackend Tests', () => {

    beforeEach(function() {
        documents = new TextDocuments();
        documents.listen(server);
    });

    test('test #1: Diagnostics for single syntax error', async () => {
        let filePath = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/single_error.sv`);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);

        const openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length == 0)
            await sleep(10);

        let documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            function(result) {
                let collection = result.get(document.uri);
                assert.equal(collection.length, 1);

                //check that every diagnostic is an Error
                collection.forEach((diagnostic: Diagnostic) => {
                    if (diagnostic.severity != DiagnosticSeverity.Error) {
                        assert.fail();
                    }
                });
            },
            function(error) {
                assert.fail();
            }
        );
    }).timeout(10000);

    test('test #2: Diagnostics for multiple syntax errors', async () => {
        let filePath = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/several_error.sv`);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);

        const openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length == 0)
            await sleep(10);

        let documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            function(result) {
                let collection = result.get(document.uri);
                assert.equal(collection.length, 3);

                //check that every diagnostic is an Error
                collection.forEach((diagnostic: Diagnostic) => {
                    if (diagnostic.severity != DiagnosticSeverity.Error) {
                        assert.fail();
                    }
                });
            },
            function(error) {
                assert.fail();
            }
        );
    }).timeout(10000);

    test('test #3: Diagnostics for correct code', async () => {
        let filePath = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/correct.sv`);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);

        const openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length == 0)
            await sleep(10);

        let documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            function(result) {
                let collection = result.get(document.uri);
                assert.equal(collection.length,0);
            },
            function(error) {
                assert.fail();
            }
        );
    }).timeout(10000);

    test('test #4: Diagnostics for empty document', async () => {
        let filePath = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/empty.sv`);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);

        const openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length == 0)
            await sleep(10);

        let documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            function(result) {
                let collection = result.get(document.uri);
                assert.equal(collection.length,0);
            },
            function(error) {
                assert.fail();
            }
        );
    }).timeout(10000);

    test('test #5: Diagnostics for a document containing unicode characters', async () => {
        let filePath = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/unicode.sv`);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);

        const openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length == 0)
            await sleep(10);

        let documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            function(result) {
                let collection = result.get(document.uri);
                assert.equal(collection.length, 2);

                //check that every diagnostic is an Error
                collection.forEach((diagnostic: Diagnostic) => {
                    if (diagnostic.severity != DiagnosticSeverity.Error) {
                        assert.fail();
                    }
                });
            },
            function(error) {
                assert.fail();
            }
        );
    }).timeout(10000);

    test('test #6: Diagnostics for verilog document', async () => {
        let filePath = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/single_error.v`);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);

        const openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length == 0)
            await sleep(10);

        let documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            function(result) {
                let collection = result.get(document.uri);
                assert.equal(collection.length, 1);

                //check that every diagnostic is an Error
                collection.forEach((diagnostic: Diagnostic) => {
                    if (diagnostic.severity != DiagnosticSeverity.Error) {
                        assert.fail();
                    }
                });
            },
            function(error) {
                assert.fail();
            }
        );
    }).timeout(10000);

    test('test #7: Diagnostics for non-Verilog/SystemVerilog document', async () => {
        let filePath = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/single_error.txt`);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);

        const openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length == 0)
            await sleep(10);

        let documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            function(result) {
                assert.fail();
            },
            function(error) {
                //success
            }
        );
    }).timeout(10000);

    test('test #8: Diagnostics for invalid document with open document', async () => {
        let filePath = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/single_error.sv`);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);

        const openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length == 0)
            await sleep(10);

        let documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(undefined).then(
            function(result) {
                assert.fail();
            },
            function(error) {
                //success
            }
        );
    }).timeout(10000);

    test('test #9: Diagnostics for invalid document without open document', async () => {
        let documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(undefined).then(
            function(result) {
                assert.fail();
            },
            function(error) {
                //success
            }
        );
    }).timeout(10000);//*/
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