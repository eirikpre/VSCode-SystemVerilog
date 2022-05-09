import * as assert from 'assert';
import { getPathFromUri } from '../utils/common';

suite('Utils Common Tests', () => {
    test('test #1: getPathFromUri-file', async () => {
        const rootPath = 'c:/home/users/workspace';
        const expectedPath = 'c:/home/users/workspace/directory/design.sv';
        const uri = 'file:///c%3A/home/users/workspace/directory/design.sv';

        assert.strictEqual(expectedPath, getPathFromUri(uri, rootPath));
    });

    test('test #2: getPathFromUri-windows', async () => {
        const rootPath = 'c:\\home\\users\\workspace';
        const expectedPath = 'c:\\home\\users\\workspace\\directory\\design.sv';
        const uri = 'c:\\home\\users\\workspace\\directory\\design.sv';
        const got = getPathFromUri(uri, rootPath);
        assert.strictEqual(expectedPath, got);
    });

    test('test #3: getPathFromUri-linux', async () => {
        const rootPath = '/home/users/workspace';
        const expectedPath = '/home/users/workspace/directory/design.sv';
        const uri = 'file:///home/users/workspace/directory/design.sv';

        assert.strictEqual(expectedPath, getPathFromUri(uri, rootPath));
    });

    test('test #4: getPathFromUri-undef', async () => {
        // URI without a path
        assert.strictEqual('', getPathFromUri('file:///', ''));

        // undefined/null/empty document
        assert.strictEqual('', getPathFromUri('', ''));
        assert.strictEqual('', getPathFromUri(undefined, undefined));
        assert.strictEqual('', getPathFromUri(null, null));
    });

    test('test #5: getPathFromUri-linux', async () => {
        const rootPath = '/home/users/workspace';
        const expectedPath = '/home/users/workspace/directory/design.sv';
        const uri = '/home/users/workspace/directory/design.sv';

        assert.strictEqual(expectedPath, getPathFromUri(uri, rootPath));
    });

    test('test #6: getPathFromUri-linux', async () => {
        const rootPath = '/home/users/workspace';
        const expectedPath = '/home/users/workspace';
        const uri = '/home/users/workspace';

        assert.strictEqual(expectedPath, getPathFromUri(uri, rootPath));
    });
});
