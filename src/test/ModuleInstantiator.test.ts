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
        let fullRange = new vscode.Range(document.positionAt(585), document.positionAt(1129));

        const container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(document.positionAt(152), document.positionAt(354));

        let instance = document.getText(fullRange).trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actualInstance;

        try {
            actualInstance = formatInstance('adder', container).trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple space with a single space
        actualInstance = actualInstance.replace(/ +/g, ' ');

        assert.strictEqual(actualInstance, instance);
    });

    test('test #2: formatInstance with parameters', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        // Range of the module in the document
        let fullRange = new vscode.Range(document.positionAt(1278), document.positionAt(1872));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(document.positionAt(506), document.positionAt(785));

        let instance = document.getText(fullRange).trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actualInstance;

        try {
            actualInstance = formatInstance('bar', container).trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple space with a single space
        actualInstance = actualInstance.replace(/ +/g, ' ');

        assert.strictEqual(actualInstance, instance);
    });

    test('test #3: formatInstance without parameters, ports in header', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        // Range of the module in the document
        let fullRange = new vscode.Range(document.positionAt(2041), document.positionAt(2611));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(document.positionAt(954), document.positionAt(1071));

        let instance = document.getText(fullRange).trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actualInstance;

        try {
            actualInstance = formatInstance('akker', container).trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple space with a single space
        actualInstance = actualInstance.replace(/ +/g, ' ');

        assert.strictEqual(actualInstance, instance);
    });

    test('test #4: formatInstance with parameters, ports in header', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        // range of the module in the document
        let fullRange = new vscode.Range(document.positionAt(2777), document.positionAt(3398));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(document.positionAt(1240), document.positionAt(1407));

        let instance = document.getText(fullRange).trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actualInstance;

        try {
            actualInstance = formatInstance('accer', container).trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple white spaces with a single space
        actualInstance = actualInstance.replace(/ +/g, ' ');

        assert.strictEqual(actualInstance, instance);
    });

    test('test #5: formatInstance with defaulted parameters.', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        // Range of the module in the document
        let fullRange = new vscode.Range(document.positionAt(3597), document.positionAt(3942));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(document.positionAt(1590), document.positionAt(1747));

        let instance = document.getText(fullRange).trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actualInstance;

        try {
            actualInstance = formatInstance('anner', container).trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple white spaces with a single space
        actualInstance = actualInstance.replace(/ +/g, ' ');

        assert.strictEqual(actualInstance, instance);
    });

    test('test #6: empty and undefined container/symbol scenarios', async () => {
        let actualInstance;

        // Empty container with valid symbol
        try {
            actualInstance = formatInstance('bar', '');
            assert.strictEqual(actualInstance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Undefined container with valid symbol
        try {
            actualInstance = formatInstance('bar', undefined);
            assert.strictEqual(actualInstance, undefined);
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
            actualInstance = formatInstance('', container);
            assert.strictEqual(actualInstance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Undefined symbol with valid container
        try {
            actualInstance = formatInstance(undefined, container);
            assert.strictEqual(actualInstance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Empty symbol and container
        try {
            actualInstance = formatInstance('', '');
            assert.strictEqual(actualInstance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Undefined symbol and container
        try {
            actualInstance = formatInstance(undefined, undefined);
            assert.strictEqual(actualInstance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Valid symbol and null container
        try {
            actualInstance = formatInstance('bar', null);
            assert.strictEqual(actualInstance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Null symbol and container
        try {
            actualInstance = formatInstance(null, null);
            assert.strictEqual(actualInstance, undefined);
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }
    });

    test('test #7: formatInstance golden output.', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        // Range of the module in the document
        let fullRange = new vscode.Range(document.positionAt(5269), document.positionAt(5814));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(document.positionAt(2636), document.positionAt(2856));

        const instance = document.getText(fullRange).trim();

        let actualInstance;

        try {
            actualInstance = formatInstance('golden', container).trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        assert.strictEqual(actualInstance, instance);
    });
});
