'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SystemVerilogDocumentSymbolProvider, SystemVerilogDocumentSymbolTreeProvider } from './providers/DocumentSymbolProvider';
import { SystemVerilogWorkspaceSymbolProvider } from './providers/WorkspaceSymbolProvider';
import SystemVerilogDocumentHighlightProvider from './providers/DocumentHighlightProvider';
import { SystemVerilogTreeDataProvider } from './providers/TreeDataProvider';
import { SystemVerilogDefinitionProvider } from './providers/DefintionProvider';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let documentSelector = ['verilog', 'systemverilog']
    let docProvider = new SystemVerilogDocumentSymbolProvider();
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(documentSelector, docProvider));

    // TODO: Add setting to turn off indexing.
    // (To reduce RAM/CPU usage)
    if (true) {
        let statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0)
        statusBar.text = 'SystemVerilog: Active'
        statusBar.show()
        statusBar.command = 'systemverilog.build_index';
        
        let symProvider = new SystemVerilogWorkspaceSymbolProvider(statusBar);
        let defProvider = new SystemVerilogDefinitionProvider(symProvider);

        context.subscriptions.push(statusBar);
        context.subscriptions.push(vscode.languages.registerDefinitionProvider(documentSelector, defProvider));
        context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(symProvider));
        context.subscriptions.push(vscode.commands.registerCommand('systemverilog.build_index', symProvider.build_index))
    }
    // WIP
    // vscode.window.registerTreeDataProvider('systemverilogModules', new SystemVerilogTreeDataProvider())
    // vscode.window.registerTreeDataProvider('systemverilogDocuementSymbols', new SystemVerilogDocumentSymbolTreeProvider())

    // Built-in DocumentHighlightProvider is better
    // context.subscriptions.push(vscode.languages.registerDocumentHighlightProvider(documentSelector, new SystemVerilogDocumentHighlightProvider()));

    console.log("Extension SystemVerilog loaded successfully")
}

// this method is called when your extension is deactivated
export function deactivate() {
}