import * as assert from 'assert';
import * as path from 'path';
import { workspace, Uri } from 'vscode';
import { isSystemVerilogDocument, isVerilogDocument } from '../utils/client';

const testFolderLocation = '../../src/test';

suite('Utils Client Tests', () => {
    test('test #1: isSystemVerilogDocument', async () => {
        const svUri = Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'design.sv'));
        const vUri = Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        const nonSVUri = Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'foo.txt'));

        const sVDocument = await workspace.openTextDocument(svUri);
        const vDocument = await workspace.openTextDocument(vUri);
        const nonSVDocument = await workspace.openTextDocument(nonSVUri);

        assert.strictEqual(true, isSystemVerilogDocument(sVDocument));
        assert.strictEqual(false, isSystemVerilogDocument(vDocument));
        assert.strictEqual(false, isSystemVerilogDocument(nonSVDocument));

        // undefined/null document
        assert.strictEqual(false, isSystemVerilogDocument(undefined));
        assert.strictEqual(false, isSystemVerilogDocument(null));
    });

    test('test #2: isVerilogDocument', async () => {
        const svUri = Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'design.sv'));
        const vUri = Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
        const nonSVUri = Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'foo.txt'));

        const sVDocument = await workspace.openTextDocument(svUri);
        const vDocument = await workspace.openTextDocument(vUri);
        const nonSVDocument = await workspace.openTextDocument(nonSVUri);

        assert.strictEqual(false, isVerilogDocument(sVDocument));
        assert.strictEqual(true, isVerilogDocument(vDocument));
        assert.strictEqual(false, isVerilogDocument(nonSVDocument));

        // undefined/null document
        assert.strictEqual(false, isVerilogDocument(undefined));
        assert.strictEqual(false, isVerilogDocument(null));
    });
});
