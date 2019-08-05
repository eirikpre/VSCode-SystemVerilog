import * as assert from 'assert';
import { getPathFromUri } from '../utils/common';

const testFolderLocation = '../../../src/test/';

suite('Utils Common Tests', () => {

    test('test #1: getPathFromUri', async () => {

        let expectedPath = "c:/Users/directory/design.sv";
        let uri = "file:///c%3A/Users/directory/design.sv";
        let uriTrailingSlashes = "file:///c%3A/Users/directory/design.sv/";

        assert.equal(expectedPath, getPathFromUri(uri));
        assert.equal(expectedPath, getPathFromUri(uriTrailingSlashes));

        //uri without a path
        assert.equal("", getPathFromUri("file:///"));

        //undefined/null/empty document
        assert.equal("", getPathFromUri(""));
        assert.equal("", getPathFromUri(undefined));
        assert.equal("", getPathFromUri(null));
    });
});