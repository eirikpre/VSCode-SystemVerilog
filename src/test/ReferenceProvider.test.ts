import { Range, Position } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import * as vscode from 'vscode';
import { Uri, workspace } from 'vscode';
import * as path from 'path';
import * as assert from 'assert';
import { ANTLRBackend } from '../compiling/ANTLRBackend';
import { SystemVerilogReferenceProvider } from '../providers/ReferenceProvider';

const testFolderLocation = '../../src/test';

suite('Macro Replacement Tests', () => {
    test('test #1: Macro replacement/definition removal for text without macro definitions', async () => {
        const uri = vscode.Uri.file("verilog-examples/environment.sv");
        const input_location = new vscode.Location(uri[0], new vscode.Position(13,2));
        const expected_locations = [
            new vscode.Location(uri[0], new vscode.Position(13,2)),
            new vscode.Location(uri[0], new vscode.Position(13,2)) 
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
    const references = await referenceProvider.provideReferences(document, input_location.range.start, { includeDeclaration: true }, null);

    assert (expected_locations.length === references.length);

    for (let index = 0; index < references.length; index++) {
        assert(expected_locations[index].uri.path === references[index].uri.path);
        assert(expected_locations[index].range.start.isEqual(references[index].range.start));
    }
}
