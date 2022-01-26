import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import { CancellationToken, CancellationTokenSource } from 'vscode-languageclient';
import * as definitionProvider from '../providers/DefinitionProvider';

const examplesFolderLocation = '../../verilog-examples';
const testFolderLocation = '../../src/test/test-files';

suite('Extension Tests', () => {
    test('test #1: run build_index command', async () => {
        // const uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'instantiation_example.sv'));
        // const document = await vscode.workspace.openTextDocument(uri);
        // const editor = await vscode.window.showTextDocument(document);

        setTimeout(() => {
            vscode.commands.executeCommand('systemverilog.build_index');
        }, 500);
    });

    test('test #2: moduleFromPort', async () => {
        const uri = vscode.Uri.file(path.join(__dirname, examplesFolderLocation, 'instantiation_example.sv'));
        const document = await vscode.workspace.openTextDocument(uri);

        // Range of the module in the document
        const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(224));

        const symbol = definitionProvider.moduleFromPort(document, fullRange);

        assert.strictEqual('module', symbol);
    });

    test('test #3: DefinitionProvider Non-Illegal Symbol', async () => {
        const uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'illegal_symbols.sv'));
        const document = await vscode.workspace.openTextDocument(uri);

        // Range of the module in the document
        const symbolPosition = document.positionAt(334); // assign return_true
                                                         //        ^

        let defProvider = new definitionProvider.SystemVerilogDefinitionProvider();
        let tokenSource = new CancellationTokenSource();
        const definition: vscode.Definition = await defProvider.provideDefinition(document, symbolPosition, tokenSource.token)

        if ("length" in definition) {
            assert.strictEqual(1, definition.length);
        } else {
            assert(false);
        }
    });

    test('test #4: DefinitionProvider Illegal Symbol', async () => {
        const uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'illegal_symbols.sv'));
        const document = await vscode.workspace.openTextDocument(uri);

        // Range of the module in the document
        const symbolPosition = document.positionAt(243);

        let defProvider = new definitionProvider.SystemVerilogDefinitionProvider();
        let tokenSource = new CancellationTokenSource();
        const definition: vscode.Definition = await defProvider.provideDefinition(document, symbolPosition, tokenSource.token)

        if ("length" in definition) {
            // should be empty
            assert.strictEqual(0, definition.length);
        }
    });
});
