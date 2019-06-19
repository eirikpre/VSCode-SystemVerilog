import * as assert from 'assert';
import * as path from 'path';

import * as vscode from 'vscode';
import * as definitionProvider from '../providers/DefintionProvider';

const testFolderLocation = '../../../verilog-examples/';

suite("Extension Tests", function () {

    test('test #1: run build_index command', async () => {
        const uri = vscode.Uri.file(
            path.join(__dirname + testFolderLocation + 'instantiation_example.sv')
        )
        const document = await vscode.workspace.openTextDocument(uri)
        const editor = await vscode.window.showTextDocument(document)

        setTimeout(() => {
            vscode.commands.executeCommand('systemverilog.build_index');
        }, 500);


    });

    test('test #2: moduleFromPort', async () => {

        const uri = vscode.Uri.file(
            path.join(__dirname + testFolderLocation + 'instantiation_example.sv')
        )
        const document = await vscode.workspace.openTextDocument(uri)

        //range of the module in the document
        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(224)
        )

        const symbol = definitionProvider.moduleFromPort(document, fullRange);

        assert.equal("module", symbol);
    });
});