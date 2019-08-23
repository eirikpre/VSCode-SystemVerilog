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
import { VCSCompiler } from '../compiling/VCSCompiler';
import { getPathFromUri } from '../utils/common';

const testFolderLocation = '../../src/test/';
const file_path_placeholder = "FILEPATH_PLACEHOLDER";

let diagnosticCollection: Map<string, Diagnostic[]>;
let documentCompiler = new VCSCompiler(undefined, undefined, undefined, undefined, undefined);

suite('VCSCompiler Tests', () => {
    test('test #1: Diagnostics from %Error', async () => {
        diagnosticCollection = new Map();

        let filePath = path.join(__dirname, testFolderLocation, `test-files/VCSCompiler.test/foo.sv`);

        let uriDoc = Uri.file(filePath);
        let documentWorkspace = await workspace.openTextDocument(uriDoc);

        let document: TextDocument = castTextDocument(documentWorkspace);

        let compiledFilePath = getPathFromUri(document.uri, __dirname);

        let stderrFile = path.join(__dirname, testFolderLocation, `test-files/VCSCompiler.test/foo.stdout.txt`);

        let stdout = fs.readFileSync(stderrFile).toString();
        stdout = stderrSetUp(stdout, compiledFilePath);

        documentCompiler.parseDiagnostics(undefined, stdout, undefined, document, compiledFilePath, diagnosticCollection);

        let collection = diagnosticCollection.get(document.uri);
        assert.equal(collection.length, 4);

        //check that every diagnostic is an Error
        collection.forEach((diagnostic: Diagnostic) => {
            if (diagnostic.severity != DiagnosticSeverity.Error) {
                assert.fail();
            }
        });

    });

    test('test #2: Diagnostics for empty stdout', async () => {
        diagnosticCollection = new Map();

        let filePath = `test-files/VCSCompiler.test/baz.sv`;
        let uriDoc = Uri.file(path.join(__dirname, testFolderLocation, filePath));

        let documentWorkspace = await workspace.openTextDocument(uriDoc);

        let document: TextDocument = castTextDocument(documentWorkspace);

        let compiledFilePath = getPathFromUri(document.uri, __dirname);

        documentCompiler.parseDiagnostics(undefined, "", undefined, document, compiledFilePath, diagnosticCollection);

        let collection = diagnosticCollection.get(document.uri);

        if (collection && collection.length > 0) {
            assert.fail();
        }
    });
});


function stderrSetUp(stdout, rootPath) {
    //replace file_path_holder in stdout
    let regex = new RegExp(file_path_placeholder, "g");
    return stdout.replace(regex, rootPath);
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