import { createConnection, Diagnostic, DiagnosticSeverity, Position, Range, TextDocuments, DidOpenTextDocumentParams, DidOpenTextDocumentNotification } from 'vscode-languageserver/node'; // prettier-ignore
import { TextDocument } from 'vscode-languageserver-textdocument';
import * as vscode from 'vscode';
import { Uri, workspace } from 'vscode';
import * as path from 'path';
import * as assert from 'assert';
import { beforeEach } from 'mocha';
import { Duplex } from 'stream';
import { ANTLRBackend } from '../compiling/ANTLRBackend';

// This file contains code for testing the antlr backend
// Mocks the document open notification to test full results including call from server

const testFolderLocation = '../../src/test/test-files/ANTLRCompiler.test';
const TEST_LANGUAGE_ID = 'typescript';

/* eslint-disable no-underscore-dangle */
class TestStream extends Duplex {
    _write(chunk: string, _encoding: string, done: () => void) {
        this.emit('data', chunk);
        done();
    }

    _read(_size: number) {}
}
/* eslint-enable no-underscore-dangle */

const up = new TestStream();
const down = new TestStream();

const server = createConnection(up, down);
const client = createConnection(down, up);
server.listen();
client.listen();

function mockOpenDocNotif(config: { version: number; uri: string; text: string }): DidOpenTextDocumentParams {
    const { version, uri, text } = config;
    return { textDocument: { uri, languageId: TEST_LANGUAGE_ID, version, text } };
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

let filePath = path.join(__dirname, testFolderLocation, 'single_error.sv');

let openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: 'Basic testing text!!!' });
client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

let documents: TextDocuments<TextDocument>;

suite('ANTLRBackend Tests', () => {
    beforeEach(() => {
        documents = new TextDocuments(TextDocument);
        documents.listen(server);
    });

    test('test #1: Diagnostics for single syntax error', async () => {
        filePath = path.join(__dirname, testFolderLocation, 'single_error.sv');
        const uriDoc = Uri.file(filePath);

        const documentWorkspace = await workspace.openTextDocument(uriDoc);
        const document: TextDocument = castTextDocument(documentWorkspace);

        openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length === 0) await sleep(10); // eslint-disable-line no-await-in-loop

        const documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            (result) => {
                const collection = result.get(document.uri);
                assert.strictEqual(collection.length, 1);

                // Check that every diagnostic is an Error
                collection.forEach((diagnostic: Diagnostic) => {
                    if (diagnostic.severity !== DiagnosticSeverity.Error) {
                        assert.fail();
                    }
                });
            },
            (_error) => {
                assert.fail();
            }
        );
    }).timeout(10000);

    test('test #2: Diagnostics for multiple syntax errors', async () => {
        filePath = path.join(__dirname, testFolderLocation, 'several_error.sv');
        const uriDoc = Uri.file(filePath);

        const documentWorkspace = await workspace.openTextDocument(uriDoc);
        const document: TextDocument = castTextDocument(documentWorkspace);

        openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length === 0) await sleep(10); // eslint-disable-line no-await-in-loop

        const documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            (result) => {
                const collection = result.get(document.uri);
                assert.strictEqual(collection.length, 3);

                // Check that every diagnostic is an Error
                collection.forEach((diagnostic: Diagnostic) => {
                    if (diagnostic.severity !== DiagnosticSeverity.Error) {
                        assert.fail();
                    }
                });
            },
            (_error) => {
                assert.fail();
            }
        );
    }).timeout(10000);

    test('test #3: Diagnostics for correct code', async () => {
        filePath = path.join(__dirname, testFolderLocation, 'correct.sv');
        const uriDoc = Uri.file(filePath);

        const documentWorkspace = await workspace.openTextDocument(uriDoc);
        const document: TextDocument = castTextDocument(documentWorkspace);

        openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length === 0) await sleep(10); // eslint-disable-line no-await-in-loop

        const documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            (result) => {
                const collection = result.get(document.uri);
                assert.strictEqual(collection.length, 0);
            },
            (_error) => {
                assert.fail();
            }
        );
    }).timeout(10000);

    test('test #4: Diagnostics for empty document', async () => {
        filePath = path.join(__dirname, testFolderLocation, 'empty.sv');
        const uriDoc = Uri.file(filePath);

        const documentWorkspace = await workspace.openTextDocument(uriDoc);
        const document: TextDocument = castTextDocument(documentWorkspace);

        openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length === 0) await sleep(10); // eslint-disable-line no-await-in-loop

        const documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            (result) => {
                const collection = result.get(document.uri);
                assert.strictEqual(collection.length, 0);
            },
            (_error) => {
                assert.fail();
            }
        );
    }).timeout(10000);

    test('test #5: Diagnostics for a document containing unicode characters', async () => {
        filePath = path.join(__dirname, testFolderLocation, 'unicode.sv');
        const uriDoc = Uri.file(filePath);

        const documentWorkspace = await workspace.openTextDocument(uriDoc);
        const document: TextDocument = castTextDocument(documentWorkspace);

        openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length === 0) await sleep(10); // eslint-disable-line no-await-in-loop

        const documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            (result) => {
                const collection = result.get(document.uri);
                assert.strictEqual(collection.length, 2);

                // Check that every diagnostic is an Error
                collection.forEach((diagnostic: Diagnostic) => {
                    if (diagnostic.severity !== DiagnosticSeverity.Error) {
                        assert.fail();
                    }
                });
            },
            (_error) => {
                assert.fail();
            }
        );
    }).timeout(10000);

    test('test #6: Diagnostics for verilog document', async () => {
        filePath = path.join(__dirname, testFolderLocation, 'single_error.v');
        const uriDoc = Uri.file(filePath);

        const documentWorkspace = await workspace.openTextDocument(uriDoc);
        const document: TextDocument = castTextDocument(documentWorkspace);

        openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length === 0) await sleep(10); // eslint-disable-line no-await-in-loop

        const documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            (result) => {
                const collection = result.get(document.uri);
                assert.strictEqual(collection.length, 1);

                // Check that every diagnostic is an Error
                collection.forEach((diagnostic: Diagnostic) => {
                    if (diagnostic.severity !== DiagnosticSeverity.Error) {
                        assert.fail();
                    }
                });
            },
            (_error) => {
                assert.fail();
            }
        );
    }).timeout(10000);

    test('test #7: Diagnostics for non-Verilog/SystemVerilog document', async () => {
        filePath = path.join(__dirname, testFolderLocation, 'single_error.txt');
        const uriDoc = Uri.file(filePath);

        const documentWorkspace = await workspace.openTextDocument(uriDoc);
        const document: TextDocument = castTextDocument(documentWorkspace);

        openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length === 0) await sleep(10); // eslint-disable-line no-await-in-loop

        const documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(document).then(
            (_result) => {
                assert.fail();
            },
            (_error) => {
                // Success
            }
        );
    }).timeout(10000);

    test('test #8: Diagnostics for invalid document with open document', async () => {
        filePath = path.join(__dirname, testFolderLocation, 'single_error.sv');
        const uriDoc = Uri.file(filePath);

        const documentWorkspace = await workspace.openTextDocument(uriDoc);
        const document: TextDocument = castTextDocument(documentWorkspace);

        openDocNotif = mockOpenDocNotif({ version: 1, uri: filePath, text: document.getText() });
        client.sendNotification(DidOpenTextDocumentNotification.type, openDocNotif);

        while (documents.keys().length === 0) await sleep(10); // eslint-disable-line no-await-in-loop

        const documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(undefined).then(
            (_result) => {
                assert.fail();
            },
            (_error) => {
                // Success
            }
        );
    }).timeout(10000);

    test('test #9: Diagnostics for invalid document without open document', async () => {
        const documentCompiler = new ANTLRBackend();

        await documentCompiler.getDiagnostics(undefined).then(
            (_result) => {
                assert.fail();
            },
            (_error) => {
                // Success
            }
        );
    }).timeout(10000);
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
