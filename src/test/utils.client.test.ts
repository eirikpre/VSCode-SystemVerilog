import * as assert from 'assert';
import * as path from 'path';
import { workspace, Uri } from 'vscode';
import { isSystemVerilogDocument, isVerilogDocument } from '../utils/client';

const testFolderLocation = '../../../src/test/';

suite('Utils Client Tests', () => {

    test('test #1: isSystemVerilogDocument', async () => {

        let svUri = Uri.file(path.join(`${__dirname + testFolderLocation}test-files/design.sv`));
        let vUri = Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.1.v`));
        let nonSVUri = Uri.file(path.join(`${__dirname + testFolderLocation}test-files/foo.txt`));

        const sVDocument = await workspace.openTextDocument(svUri);
        const vDocument = await workspace.openTextDocument(vUri);
        const nonSVDocument = await workspace.openTextDocument(nonSVUri);

        assert.equal(true, isSystemVerilogDocument(sVDocument));
        assert.equal(false, isSystemVerilogDocument(vDocument));
        assert.equal(false, isSystemVerilogDocument(nonSVDocument));

        //undefined/null document
        assert.equal(false, isSystemVerilogDocument(undefined));
        assert.equal(false, isSystemVerilogDocument(null));
    });

    test('test #2: isVerilogDocument', async () => {

        let svUri = Uri.file(path.join(`${__dirname + testFolderLocation}test-files/design.sv`));
        let vUri = Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.1.v`));
        let nonSVUri = Uri.file(path.join(`${__dirname + testFolderLocation}test-files/foo.txt`));

        const sVDocument = await workspace.openTextDocument(svUri);
        const vDocument = await workspace.openTextDocument(vUri);
        const nonSVDocument = await workspace.openTextDocument(nonSVUri);

        assert.equal(false, isVerilogDocument(sVDocument));
        assert.equal(true, isVerilogDocument(vDocument));
        assert.equal(false, isVerilogDocument(nonSVDocument));

        //undefined/null document
        assert.equal(false, isVerilogDocument(undefined));
        assert.equal(false, isVerilogDocument(null));
    });
});