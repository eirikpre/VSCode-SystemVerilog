import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import { formatInstance } from '../providers/ModuleInstantiator';

const testFolderLocation = '../../src/test';

suite('ModuleInstantiator Tests', () => {
    test('test #1: formatInstance without parameters', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        // Range of the module in the document
        let fullRange = new vscode.Range(document.positionAt(587), document.positionAt(1143));

        const container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(document.positionAt(152), document.positionAt(354));

        let instance = document.getText(fullRange).replace(/\r\n|\n|\r/g, ' ').trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actual_instance;

        try {
            actual_instance = formatInstance('adder', container).replace(/\r\n|\n|\r/g, ' ').trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple space with a single space
        actual_instance = actual_instance.replace(/ +/g, ' ');

        assert.strictEqual(actual_instance, instance);
    });

    test('test #2: formatInstance with parameters', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        // Range of the module in the document
        let fullRange = new vscode.Range(document.positionAt(1293), document.positionAt(1899));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(document.positionAt(507), document.positionAt(785));

        let instance = document.getText(fullRange).replace(/\r\n|\n|\r/g, ' ').trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actual_instance;

        try {
            actual_instance = formatInstance('bar', container).replace(/\r\n|\n|\r/g, ' ').trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple space with a single space
        actual_instance = actual_instance.replace(/ +/g, ' ');

        assert.strictEqual(actual_instance, instance);
    });

    test('test #3: formatInstance without parameters, ports in header', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        // Range of the module in the document
        let fullRange = new vscode.Range(document.positionAt(2069), document.positionAt(2649));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(document.positionAt(955), document.positionAt(1071));

        let instance = document.getText(fullRange).replace(/\r\n|\n|\r/g, ' ').trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actual_instance;

        try {
            actual_instance = formatInstance('akker', container).replace(/\r\n|\n|\r/g, ' ').trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple space with a single space
        actual_instance = actual_instance.replace(/ +/g, ' ');

        assert.strictEqual(actual_instance, instance);
    });

    test('test #4: formatInstance with parameters, ports in header', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        // range of the module in the document
        let fullRange = new vscode.Range(document.positionAt(2816), document.positionAt(3447));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(document.positionAt(1241), document.positionAt(1407));

        let instance = document.getText(fullRange).replace(/\r\n|\n|\r/g, ' ').trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actual_instance;

        try {
            actual_instance = formatInstance('accer', container).replace(/\r\n|\n|\r/g, ' ').trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple white spaces with a single space
        actual_instance = actual_instance.replace(/ +/g, ' ');

        assert.strictEqual(actual_instance, instance);
    });

    test('test #5: formatInstance with defaulted parameters.', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        // Range of the module in the document
        let fullRange = new vscode.Range(document.positionAt(3647), document.positionAt(3992));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(document.positionAt(1591), document.positionAt(1747));

        let instance = document.getText(fullRange).replace(/\r\n|\n|\r/g, ' ').trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actual_instance;

        try {
            actual_instance = formatInstance('anner', container).replace(/\r\n|\n|\r/g, ' ').trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple white spaces with a single space
        actual_instance = actual_instance.replace(/ +/g, ' ');

        assert.strictEqual(actual_instance, instance);
    });

    test('test #6: empty and undefined container/symbol scenarios', async () => {
        let actual_instance;

        // Empty container with valid symbol
        try {
            actual_instance = formatInstance('bar', '');
            assert.strictEqual(actual_instance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Undefined container with valid symbol
        try {
            actual_instance = formatInstance('bar', undefined);
            assert.strictEqual(actual_instance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        const uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        const document = await vscode.workspace.openTextDocument(uri);

        // Range of the module in the document
        const fullRange = new vscode.Range(document.positionAt(1293), document.positionAt(1899));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        // Empty symbol with valid container
        try {
            actual_instance = formatInstance('', container);
            assert.strictEqual(actual_instance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Undefined symbol with valid container
        try {
            actual_instance = formatInstance(undefined, container);
            assert.strictEqual(actual_instance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Empty symbol and container
        try {
            actual_instance = formatInstance('', '');
            assert.strictEqual(actual_instance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Undefined symbol and container
        try {
            actual_instance = formatInstance(undefined, undefined);
            assert.strictEqual(actual_instance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Valid symbol and null container
        try {
            actual_instance = formatInstance('bar', null);
            assert.strictEqual(actual_instance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Null symbol and container
        try {
            actual_instance = formatInstance(null, null);
            assert.strictEqual(actual_instance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }
    });

    test('test #7: formatInstance golden output.', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        // Range of the module in the document
        let fullRange = new vscode.Range(document.positionAt(5327), document.positionAt(5883));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(document.positionAt(2637), document.positionAt(2855));

        const instance = document.getText(fullRange);

        let actual_instance;

        try {
            actual_instance = formatInstance('golden', container).replace(/\r\n/g, '\n');
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        assert.strictEqual(actual_instance, instance);
    });
});
