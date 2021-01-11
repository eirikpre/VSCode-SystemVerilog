import * as assert from 'assert';
import { getPathFromUri } from '../utils/common';

suite('Utils Common Tests', () => {
    test('test #1: getPathFromUri', async () => {
        let rootPath = 'c:/home/users/workspace';

        let expectedPath = 'c:/home/users/workspace/directory/design.sv';
        let uri = 'file:///c%3A/home/users/workspace/directory/design.sv';

        assert.strictEqual(expectedPath, getPathFromUri(uri, rootPath));

        rootPath = '/home/users/workspace';
        expectedPath = '/home/users/workspace/directory/design.sv';
        uri = 'file:///home/users/workspace/directory/design.sv';

        assert.strictEqual(expectedPath, getPathFromUri(uri, rootPath));

        // URI without a path
        assert.strictEqual('', getPathFromUri('file:///', ''));

        // undefined/null/empty document
        assert.strictEqual('', getPathFromUri('', ''));
        assert.strictEqual('', getPathFromUri(undefined, undefined));
        assert.strictEqual('', getPathFromUri(null, null));
    });
});
