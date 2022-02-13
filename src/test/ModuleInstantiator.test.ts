import os = require('os');
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
        let fullRange = null;
        fullRange = new vscode.Range(new vscode.Position(21,0), new vscode.Position(54,0));

        const container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);
        fullRange = new vscode.Range(new vscode.Position(3,0), new vscode.Position(15,0));

        let instance = document.getText(fullRange).trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actual_instance;

        try {
            actual_instance = formatInstance('adder', container).trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple space with a single space
        actual_instance = actual_instance.replace(/ +/g, ' ');
        if(os.platform() == 'win32') {
            actual_instance = actual_instance.replace(/\n/g, '\r\n');
            actual_instance = actual_instance.replace(/\r\r/g, '\r');
        }

        assert.strictEqual(actual_instance, instance);
    });

    test('test #2: formatInstance with parameters', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        let fullRange = null;
        // Range of the module in the document
        fullRange = new vscode.Range(new vscode.Position(58,0), new vscode.Position(94,0));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(new vscode.Position(22,0), new vscode.Position(37,0));

        let instance = document.getText(fullRange).trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actual_instance;

        try {
            actual_instance = formatInstance('bar', container).trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple space with a single space
        actual_instance = actual_instance.replace(/ +/g, ' ');
        if(os.platform() === 'win32') {
            actual_instance = actual_instance.replace(/\n/g, '\r\n');
            actual_instance = actual_instance.replace(/\r\r/g, '\r');
        }

        assert.strictEqual(actual_instance, instance);
    });

    test('test #3: formatInstance without parameters, ports in header', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        let fullRange = null;
        // Range of the module in the document
        fullRange = new vscode.Range(new vscode.Position(98,0), new vscode.Position(131,0));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(new vscode.Position(41,0), new vscode.Position(50,0));

        let instance = document.getText(fullRange).trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actual_instance;

        try {
            actual_instance = formatInstance('akker', container).trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple space with a single space
        actual_instance = actual_instance.replace(/ +/g, ' ');
        if(os.platform() === 'win32') {
            actual_instance = actual_instance.replace(/\n/g, '\r\n');
            actual_instance = actual_instance.replace(/\r\r/g, '\r');
        }

        assert.strictEqual(actual_instance, instance);
    });

    test('test #4: formatInstance with parameters, ports in header', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        let fullRange = null;
        // Range of the module in the document
        fullRange = new vscode.Range(new vscode.Position(135,0), new vscode.Position(171,0));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(new vscode.Position(54,0), new vscode.Position(66,0));

        let instance = document.getText(fullRange).trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actual_instance;

        try {
            actual_instance = formatInstance('accer', container).trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple white spaces with a single space
        actual_instance = actual_instance.replace(/ +/g, ' ');
        if(os.platform() === 'win32') {
            actual_instance = actual_instance.replace(/\n/g, '\r\n');
            actual_instance = actual_instance.replace(/\r\r/g, '\r');
        }

        assert.strictEqual(actual_instance, instance);
    });

    test('test #5: formatInstance with defaulted parameters.', async () => {
        let uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        let document = await vscode.workspace.openTextDocument(uri);

        let fullRange = null;
        // Range of the module in the document
        fullRange = new vscode.Range(new vscode.Position(175,0), new vscode.Position(195,0));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(new vscode.Position(70,0), new vscode.Position(82,0));

        let instance = document.getText(fullRange).trim();
        // Replace multiple space with a single space
        instance = instance.replace(/ +/g, ' ');

        let actual_instance;

        try {
            actual_instance = formatInstance('anner', container).trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

        // Replace multiple white spaces with a single space
        actual_instance = actual_instance.replace(/ +/g, ' ');
        if(os.platform() === 'win32') {
            actual_instance = actual_instance.replace(/\n/g, '\r\n');
            actual_instance = actual_instance.replace(/\r\r/g, '\r');
        }

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

        let fullRange = null;
        // Range of the module in the document
        fullRange = new vscode.Range(new vscode.Position(262,0), new vscode.Position(295,0));

        let container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
        // Replace multiple space with a single space
        container = container.replace(/ +/g, ' ');

        uri = vscode.Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.2.v'));
        document = await vscode.workspace.openTextDocument(uri);

        fullRange = new vscode.Range(new vscode.Position(121,0), new vscode.Position(133,0));

        const instance = document.getText(fullRange).trim();

        let actual_instance;

        try {
            actual_instance = formatInstance('golden', container).trim();
        } catch (error) {
            assert.fail(`formatInstance produced an error: ${error}`);
        }

         if(os.platform() === 'win32') {
             actual_instance = actual_instance.replace(/\n/g, '\r\n');
             actual_instance = actual_instance.replace(/\r\r/g, '\r');
         }

        assert.strictEqual(actual_instance, instance);
    });
});
