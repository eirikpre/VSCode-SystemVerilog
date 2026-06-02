import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
    try {
        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');

        // The path to the extension test script
        // Passed to --extensionTestsPath
        const extensionTestsPath = path.resolve(
            __dirname,
            `./index${typeof process.argv[2] !== 'undefined' ? process.argv[2] : ''}`
        );

        const workspacePath = path.resolve(__dirname, '../../verilog-examples');

        // Pin VSCode version so the native better-sqlite3 binary in CI is
        // built against a known Electron ABI. 1.96.x ships Electron 32
        // (NODE_MODULE_VERSION 128); see TEST_VSCODE_VERSION below in CI.
        const vscodeVersion = process.env.TEST_VSCODE_VERSION || '1.96.4';

        // Download VS Code, unzip it and run the integration test
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            launchArgs: [workspacePath, '--disable-workspace-trust', '--disable-extensions'],
            version: vscodeVersion,
            timeout: 30000 // 30 seconds (default was 10)
        });
    } catch (err) {
        console.error('Failed to run tests');
        process.exit(1);
    }
}

main();
