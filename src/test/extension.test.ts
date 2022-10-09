import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import * as definitionProvider from '../providers/DefinitionProvider';

const examplesFolderLocation = '../../verilog-examples';
const testFolderLocation = '../../src/test/test-files';

suite('Extension Tests', () => {
    test('test #1: run build_index command', async () => {
        const waitFor = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
        // Trigger indexing, this returns when command is triggered and not when indexing is complete
        await vscode.commands.executeCommand('systemverilog.build_index');
        // Wait for indexing to (hopefully) be complete
        await waitFor(400);
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

        // Range of the module in the document
        const symbolPosition = new vscode.Position(15, 9); // assign return_true

        const definition = (await vscode.commands.executeCommand(
            'vscode.executeDefinitionProvider',
            uri,
            symbolPosition
        )) as vscode.Location[];

        assert.strictEqual(definition.length, 1, definition.toString());
    });

    test('test #4: DefinitionProvider Illegal Symbol', async () => {
        const uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'illegal_symbols.sv'));

        // Range of the module in the document
        const symbolPosition = new vscode.Position(8, 2);

        const definition = (await vscode.commands.executeCommand(
            'vscode.executeDefinitionProvider',
            uri,
            symbolPosition
        )) as vscode.Location[];

        if ('length' in definition) {
            // should be empty
            assert.strictEqual(0, definition.length);
        }
    });
});
