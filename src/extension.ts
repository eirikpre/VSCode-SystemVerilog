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
    const settings = vscode.workspace.getConfiguration();
    let selector:vscode.DocumentSelector = { scheme: 'file', language: 'systemverilog' }
    
    // TODO: Add setting to turn off indexing.
    // (To reduce RAM/CPU usage)
    
    let statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0)
    statusBar.text = 'SystemVerilog: Active'
    statusBar.show()
    statusBar.command = 'systemverilog.build_index';
    
    let docProvider = new SystemVerilogDocumentSymbolProvider();
    let symProvider = new SystemVerilogWorkspaceSymbolProvider(statusBar, settings.get('systemverilog.disableIndexing'));
    let defProvider = new SystemVerilogDefinitionProvider(symProvider);
    
    context.subscriptions.push(statusBar);
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(selector, docProvider));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(selector, defProvider));
    context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(symProvider));
    context.subscriptions.push(vscode.commands.registerCommand('systemverilog.build_index', rebuild));
    // WIP
    // vscode.window.registerTreeDataProvider('systemverilogModules', new SystemVerilogTreeDataProvider())
    // vscode.window.registerTreeDataProvider('systemverilogDocuementSymbols', new SystemVerilogDocumentSymbolTreeProvider())

    // Built-in DocumentHighlightProvider is better
    // context.subscriptions.push(vscode.languages.registerDocumentHighlightProvider(selector, new SystemVerilogDocumentHighlightProvider()));

    console.log("Extension SystemVerilog loaded successfully")

    function rebuild(){
        if (!symProvider.building) {
            symProvider = new SystemVerilogWorkspaceSymbolProvider(statusBar)
        }
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}
