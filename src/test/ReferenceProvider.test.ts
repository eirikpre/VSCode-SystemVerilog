import { Range, Position, CancellationToken } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import * as vscode from 'vscode';
import { Uri, workspace } from 'vscode';
import * as path from 'path';
import * as assert from 'assert';
import { ANTLRBackend } from '../compiling/ANTLRBackend';
import { SystemVerilogReferenceProvider } from '../providers/ReferenceProvider';

const rootFolderLocation = '../../';

suite('ReferenceProvider Tests', () => {
    test('test #1: find references of post_test() task from definition', async () => {
        const filepath = path.join(__dirname, rootFolderLocation, "verilog-examples/environment.sv");
        const uri = vscode.Uri.file(filepath);
        const input_location = new vscode.Location(uri, new vscode.Position(44, 7));
        const expected_locations = [
            new vscode.Location(uri, new vscode.Position(44,7)),
            new vscode.Location(uri, new vscode.Position(59,4)) 
        ]
        await referenceProviderTest(input_location, expected_locations);
    }).timeout(10000);

    test('test #2: find references of post_test() task from call', async () => {
        const filepath = path.join(__dirname, rootFolderLocation, "verilog-examples/environment.sv");
        const uri = vscode.Uri.file(filepath);
        const input_location = new vscode.Location(uri, new vscode.Position(59,4));
        const expected_locations = [
            new vscode.Location(uri, new vscode.Position(44,7)),
            new vscode.Location(uri, new vscode.Position(59,4)) 
        ]
        await referenceProviderTest(input_location, expected_locations);
    }).timeout(10000);

    test('test #3: find references from definition across files', async () => {
        const driver = path.join(__dirname, rootFolderLocation, "verilog-examples/driver.sv");
        const environment = path.join(__dirname, rootFolderLocation, "verilog-examples/environment.sv");
        const driver_uri = vscode.Uri.file(driver);
        const environment_uri = vscode.Uri.file(environment);
        const input_location = new vscode.Location(driver_uri, new vscode.Position(7, 6));
        const expected_locations = [
            new vscode.Location(driver_uri, new vscode.Position(7,6)),
            new vscode.Location(environment_uri, new vscode.Position(51,4)) 
        ]
        await referenceProviderTest(input_location, expected_locations);
    }).timeout(10000);

});

/**
 * Tests that the output of referenceProvider when given a document location and comparing against an expected list of found locations.
 * @param input_location The Location to retrieve the input text from
 * @param expected_locations The list of expected locations
 */
async function referenceProviderTest(input_location: vscode.Location, expected_locations: vscode.Location[]) {

    const referenceProvider = new SystemVerilogReferenceProvider();
    const document = await workspace.openTextDocument(input_location.uri);
    let token = new vscode.CancellationTokenSource().token;
    const references = await referenceProvider.provideReferences(document, input_location.range.start, { includeDeclaration: true }, token);

    assert (expected_locations.length === references.length);

    // depending on the modify date of the file, they may be accessed in different order, so we need to accoutn for that
    for (let i = 0; i < expected_locations.length; i++) {
        let found = false;
        for (let j = 0; j < references.length; j++) {
            if(
                (expected_locations[i].uri.path === references[j].uri.path)
                && (expected_locations[i].range.start.isEqual(references[j].range.start))
             ) {
                found = true;
            }
        }
        assert(found === true)
    }
}
