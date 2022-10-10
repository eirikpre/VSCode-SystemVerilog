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

        // Download VS Code, unzip it and run the integration test
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            launchArgs: [workspacePath, '--disable-workspace-trust', '--disable-extensions']
        });
    } catch (err) {
        console.error('Failed to run tests');
        process.exit(1);
    }
}

main();
