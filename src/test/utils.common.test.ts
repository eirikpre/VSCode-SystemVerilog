import * as assert from 'assert';
import { getPathFromUri } from '../utils/common';

const testFolderLocation = '../../../src/test/';

suite('Utils Common Tests', () => {

    test('test #1: getPathFromUri', async () => {
        let rootPath = "c:/home/users/workspace";

        let expectedPath = "c:/home/users/workspace/directory/design.sv";
        let uri = "file:///c%3A/home/users/workspace/directory/design.sv";

        assert.equal(expectedPath, getPathFromUri(uri, rootPath));

        rootPath = "/home/users/workspace";
        expectedPath = "/home/users/workspace/directory/design.sv";
        uri = "file:///home/users/workspace/directory/design.sv";

        assert.equal(expectedPath, getPathFromUri(uri, rootPath));

        //uri without a path
        assert.equal("", getPathFromUri("file:///", ""));

        //undefined/null/empty document
        assert.equal("", getPathFromUri("", ""));
        assert.equal("", getPathFromUri(undefined, undefined));
        assert.equal("", getPathFromUri(null, null));
    });
});