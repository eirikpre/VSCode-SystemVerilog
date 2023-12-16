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

    test('test #5: DefinitionProvider Parameter', async () => {
        const uri = vscode.Uri.file(path.join(__dirname, examplesFolderLocation, 'parameter_test.sv'));

        // Parameter: EMPTY_PARAMETER
        const symbolPosition = new vscode.Position(23, 23);
        const expected = new vscode.Range(10, 4, 10, 29);

        const definition = (await vscode.commands.executeCommand(
            'vscode.executeDefinitionProvider',
            uri,
            symbolPosition
        )) as vscode.Location[];

        if('length' in definition && definition.length > 0) {
            assert.deepStrictEqual(
                expected,
                definition[0].range,
                "Expected: " + JSON.stringify(expected) + " Got: " + JSON.stringify(definition[0].range)
            );
        } else {
            assert.fail("Definition not found");
        }
    });

    test('test #6: DefinitionProvider Typed Parameter', async () => {
        const uri = vscode.Uri.file(path.join(__dirname, examplesFolderLocation, 'parameter_test.sv'));

        // Parameter: int unsigned INT_UNSIGNED_PARAMETER
        const symbolPosition = new vscode.Position(28, 24);
        const expected = new vscode.Range(15, 4, 15, 50);

        const definition = (await vscode.commands.executeCommand(
            'vscode.executeDefinitionProvider',
            uri,
            symbolPosition
        )) as vscode.Location[];

        if('length' in definition && definition.length > 0) {
            assert.deepStrictEqual(
                expected,
                definition[0].range,
                "Expected: " + JSON.stringify(expected) + " Got: " + JSON.stringify(definition[0].range)
            );
        } else {
            assert.fail("Definition not found");
        }
    });

    test('test #7: DefinitionProvider Typed Array Parameter', async () => {
        const uri = vscode.Uri.file(path.join(__dirname, examplesFolderLocation, 'parameter_test.sv'));

        // Parameter: bit [31:0] BIT_ARRAY_PARAMETER
        const symbolPosition = new vscode.Position(26, 24);
        const expected = new vscode.Range(13, 4, 13, 45);

        const definition = (await vscode.commands.executeCommand(
            'vscode.executeDefinitionProvider',
            uri,
            symbolPosition
        )) as vscode.Location[];

        if('length' in definition && definition.length > 0) {
            assert.deepStrictEqual(
                expected,
                definition[0].range,
                "Expected: " + JSON.stringify(expected) + " Got: " + JSON.stringify(definition[0].range)
            );
        } else {
            assert.fail("Definition not found");
        }
    });

    test('test #8: DefinitionProvider Package Parameter', async () => {
        const uri = vscode.Uri.file(path.join(__dirname, examplesFolderLocation, 'parameter_test.sv'));
        const expectedUri = vscode.Uri.file(path.join(__dirname, examplesFolderLocation, 'package.sv'));

        // Note: For some reason, the package parameters have a different range than other parameters.
        // Seems like package parameter range only cover the name of the parameter and potentially the equal sign.
        // Other parameters have included 'parameter' and the type in the range.

        // Parameter: pa_Package::PARAMETER
        const symbolPosition = new vscode.Position(16, 56);
        const expectedRange = new vscode.Range(2, 12, 2, 25);

        const definition = (await vscode.commands.executeCommand(
            'vscode.executeDefinitionProvider',
            uri,
            symbolPosition
        )) as vscode.Location[];

        if('length' in definition && definition.length > 0) {
            assert.deepStrictEqual(
                expectedRange,
                definition[0].range,
                "Expected: " + JSON.stringify(expectedRange) + " Got: " + JSON.stringify(definition[0].range)
            );

            assert.strictEqual(
                expectedUri.path,
                definition[0].uri.path,
                "Expected: " + expectedUri.path + " Got: " + definition[0].uri.path
            );
        } else {
            assert.fail("Definition not found");
        }
    });

    test('test #9: DefinitionProvider Port', async () => {
        const uri = vscode.Uri.file(path.join(__dirname, examplesFolderLocation, 'parameter_test.sv'));

        // Port: dataIn
        const symbolPosition = new vscode.Position(45, 6);
        const expected = new vscode.Range(1, 4, 1, 16);

        const definition = (await vscode.commands.executeCommand(
            'vscode.executeDefinitionProvider',
            uri,
            symbolPosition
        )) as vscode.Location[];

        if('length' in definition && definition.length > 0) {
            assert.deepStrictEqual(
                expected,
                definition[0].range,
                "Expected: " + JSON.stringify(expected) + " Got: " + JSON.stringify(definition[0].range)
            );
        } else {
            assert.fail("Definition not found");
        }
    });
});
