'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SystemVerilogDocumentSymbolProvider, SystemVerilogDocumentSymbolTreeProvider } from './providers/DocumentSymbolProvider';
import { SystemVerilogWorkspaceSymbolProvider } from './providers/WorkspaceSymbolProvider';
import SystemVerilogDocumentHighlightProvider from './providers/DocumentHighlightProvider';
import { SystemVerilogTreeDataProvider } from './providers/TreeDataProvider';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let documentSelector = ['verilog', 'systemverilog']

    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(
        documentSelector,
        new SystemVerilogDocumentSymbolProvider()
    ));

    context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(
        new SystemVerilogWorkspaceSymbolProvider()
    ));

    // WIP
    vscode.window.registerTreeDataProvider('systemverilogModules', new SystemVerilogTreeDataProvider())
    vscode.window.registerTreeDataProvider('systemverilogDocuementSymbols', new SystemVerilogDocumentSymbolTreeProvider())

    // Built-in DocumentHighlightProvider is better
    // context.subscriptions.push(vscode.languages.registerDocumentHighlightProvider(
    //    documentSelector,
    //    new SystemVerilogDocumentHighlightProvider()
    // ));

    console.log("Extension SystemVerilog loaded successfully")
}

// this method is called when your extension is deactivated
export function deactivate() {
}