import * as vscode from 'vscode';
import { workspace } from 'vscode';
import * as path from 'path';
import * as assert from 'assert';
import { SystemVerilogReferenceProvider } from '../providers/ReferenceProvider';
import { SystemVerilogParser } from '../parser';
import { SystemVerilogDocumentSymbolProvider } from '../providers/DocumentSymbolProvider';
import { SystemVerilogIndexer } from '../indexer';
import { SystemVerilogWorkspaceSymbolProvider } from '../providers/WorkspaceSymbolProvider';

const rootFolderLocation = '../../';

suite('ReferenceProvider Tests', () => {
    test('test #1: find references of post_test() task from definition', async () => {
        const filepath = path.join(__dirname, rootFolderLocation, 'verilog-examples/environment.sv');
        const uri = vscode.Uri.file(filepath);
        const inputLocation = new vscode.Location(uri, new vscode.Position(44, 7));
        const expectedLocations = [
            new vscode.Location(uri, new vscode.Position(44, 7)),
            new vscode.Location(uri, new vscode.Position(59, 4))
        ];
        await referenceProviderTest(inputLocation, expectedLocations);
    }).timeout(10000);

    test('test #2: find references of post_test() task from call', async () => {
        const filepath = path.join(__dirname, rootFolderLocation, 'verilog-examples/environment.sv');
        const uri = vscode.Uri.file(filepath);
        const inputLocation = new vscode.Location(uri, new vscode.Position(59, 4));
        const expectedLocations = [
            new vscode.Location(uri, new vscode.Position(44, 7)),
            new vscode.Location(uri, new vscode.Position(59, 4))
        ];
        await referenceProviderTest(inputLocation, expectedLocations);
    }).timeout(10000);

    test('test #3: find references from definition across files', async () => {
        const driver = path.join(__dirname, rootFolderLocation, 'verilog-examples/driver.sv');
        const environment = path.join(__dirname, rootFolderLocation, 'verilog-examples/environment.sv');
        const driverUri = vscode.Uri.file(driver);
        const environmentUri = vscode.Uri.file(environment);
        const inputLocation = new vscode.Location(driverUri, new vscode.Position(7, 6));
        const expectedLocations = [
            new vscode.Location(driverUri, new vscode.Position(7, 6)),
            new vscode.Location(environmentUri, new vscode.Position(51, 4))
        ];
        await referenceProviderTest(inputLocation, expectedLocations);
    }).timeout(10000);
});

/**
 * Tests that the output of referenceProvider when given a document location and comparing against an expected list of found locations.
 * @param inputLocation The Location to retrieve the input text from
 * @param expectedLocations The list of expected locations
 */
async function referenceProviderTest(inputLocation: vscode.Location, expectedLocations: vscode.Location[]) {
    const selector: vscode.DocumentSelector = [
        { scheme: 'file', language: 'systemverilog' },
        { scheme: 'file', language: 'verilog' }
    ];
    const document = await workspace.openTextDocument(inputLocation.uri);

    const parser = new SystemVerilogParser();
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    const outputChannel = vscode.window.createOutputChannel('SystemVerilog');
    const indexer = new SystemVerilogIndexer(statusBar, parser, outputChannel);
    const symProvider = new SystemVerilogWorkspaceSymbolProvider(indexer);
    const docProvider = new SystemVerilogDocumentSymbolProvider(parser, indexer);
    vscode.languages.registerDocumentSymbolProvider(selector, docProvider);
    vscode.languages.registerWorkspaceSymbolProvider(symProvider);
    await indexer.build_index();

    const referenceProvider = new SystemVerilogReferenceProvider();
    const token = new vscode.CancellationTokenSource();
    const references = await referenceProvider.provideReferences(
        document,
        inputLocation.range.start,
        { includeDeclaration: true },
        token.token
    );
    assert(expectedLocations.length === references.length);

    // depending on the modify date of the file, they may be accessed in different order, so we need to accoutn for that
    for (let i = 0; i < expectedLocations.length; i++) {
        let found = false;
        for (let j = 0; j < references.length; j++) {
            if (
                expectedLocations[i].uri.path === references[j].uri.path &&
                expectedLocations[i].range.start.isEqual(references[j].range.start)
            ) {
                found = true;
            }
        }
        assert(found === true);
    }
}
