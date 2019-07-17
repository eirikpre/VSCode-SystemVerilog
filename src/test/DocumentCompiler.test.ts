import {
    languages,
    workspace,
    Uri,
    DiagnosticCollection,
    DiagnosticSeverity,
    Diagnostic,
    window,
} from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as assert from 'assert';
import { VerilatorCompiler } from '../compiling/VerilatorCompiler';
import { normalizeFilePath } from '../tools';

const testFolderLocation = '../../src/test/';
const file_path_placeholder = "FILEPATH_PLACEHOLDER";

let diagnosticCollection: DiagnosticCollection;
let documentCompiler = new VerilatorCompiler(languages.createDiagnosticCollection(), window.createOutputChannel("SystemVerilog"));

suite('DocumentCompiler Tests', () => {
    test('test #1: Diagnostics from %Error', async () => {
        diagnosticCollection = languages.createDiagnosticCollection();


        let filePath = path.join(__dirname, testFolderLocation, `test-files/DocumentCompiler.test/foo.sv`);
        filePath = normalizeFilePath(filePath);

        let uriDoc = Uri.file(filePath);
        let document = await workspace.openTextDocument(uriDoc);

        let compiledFilePath = normalizeFilePath(document.uri.fsPath);

        let stderrFile = path.join(__dirname, testFolderLocation, `test-files/DocumentCompiler.test/foo.stderr.txt`);

        let stderr = fs.readFileSync(stderrFile).toString();
        stderr = stderrSetUp(stderr, compiledFilePath);

        documentCompiler.parseDiagnostics(stderr, document, compiledFilePath, diagnosticCollection);

        let collection = diagnosticCollection.get(uriDoc);
        assert.equal(collection.length, 6);

        //check that every diagnostic is an Error
        collection.forEach((diagnostic: Diagnostic) => {
            if (diagnostic.severity != DiagnosticSeverity.Error) {
                assert.fail();
            }
        });

    });

    test('test #2: Diagnostics from %Warning, %Warning-<flag>', async () => {
        diagnosticCollection = languages.createDiagnosticCollection();


        let filePath = path.join(__dirname, testFolderLocation, `test-files/DocumentCompiler.test/bar.sv`);
        filePath = normalizeFilePath(filePath);

        let uriDoc = Uri.file(filePath);
        let document = await workspace.openTextDocument(uriDoc);

        let compiledFilePath = normalizeFilePath(document.uri.fsPath);

        let stderrFile = path.join(__dirname, testFolderLocation, `test-files/DocumentCompiler.test/bar.stderr.txt`);

        let stderr = fs.readFileSync(stderrFile).toString();
        stderr = stderrSetUp(stderr, compiledFilePath);

        documentCompiler.parseDiagnostics(stderr, document, compiledFilePath, diagnosticCollection);

        let collection = diagnosticCollection.get(uriDoc);
        assert.equal(collection.length, 7);

        //check that every diagnostic is an Error
        collection.forEach((diagnostic: Diagnostic) => {
            if (diagnostic.severity != DiagnosticSeverity.Warning && diagnostic.severity != DiagnosticSeverity.Information) {
                assert.fail();
            }
        });

    });

    test('test #3: Diagnostics for empty stderr', async () => {
        diagnosticCollection = languages.createDiagnosticCollection();

        let filePath = `test-files/DocumentCompiler.test/baz.sv`;
        let uriDoc = Uri.file(path.join(__dirname, testFolderLocation, filePath));

        let document = await workspace.openTextDocument(uriDoc);
        let compiledFilePath = normalizeFilePath(document.uri.fsPath);

        documentCompiler.parseDiagnostics("", document, compiledFilePath, diagnosticCollection);

        let collection = diagnosticCollection.get(uriDoc);

        if (collection.length > 0) {
            assert.fail();
        }
    });

    test('test #4: test skipCannotFindModuleTrailingErrors()', async () => {
        //a case where `Cannot find` error is missing from stderr
        let filePath = `test-files/DocumentCompiler.test/bar.stderr.txt`;
        let stderrFile = path.join(__dirname, testFolderLocation, filePath);

        let uriDoc = Uri.file(path.join(__dirname, testFolderLocation, filePath));
        let document = await workspace.openTextDocument(uriDoc);
        let compiledFilePath = normalizeFilePath(document.uri.fsPath);

        let stderr = fs.readFileSync(stderrFile).toString();
        stderr = stderrSetUp(stderr, compiledFilePath);

        stderr = stderr.replace(/\r\n|\n|\r/g, '\n'); //replace multiple new line characters by a single new line character

        let errors = stderr.split(/\n/g);

        let i = documentCompiler.skipCannotFindModuleTrailingErrors(errors, 0, "test");

        assert.equal(i, 0);

        //a case where `Cannot find` error is in stderr
        filePath = `test-files/DocumentCompiler.test/qux.sv`;
        stderrFile = path.join(__dirname, testFolderLocation, `test-files/DocumentCompiler.test/qux.stderr.txt`);

        uriDoc = Uri.file(path.join(__dirname, testFolderLocation, filePath));
        document = await workspace.openTextDocument(uriDoc);
        compiledFilePath = normalizeFilePath(document.uri.fsPath);

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
    rootPath = normalizeFilePath(rootPath);

    //replace file_path_holder in stderr
    let regex = new RegExp(file_path_placeholder, "g");
    return stderr.replace(regex, rootPath);
}