'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';
import 'vscode';
import { workspace, window, languages, commands, StatusBarAlignment, DocumentSelector, ExtensionContext} from 'vscode';
import { SystemVerilogDefinitionProvider } from './providers/DefintionProvider';
import { SystemVerilogDocumentSymbolProvider } from './providers/DocumentSymbolProvider';
import { SystemVerilogHoverProvider } from './providers/HoverProvider';
import { SystemVerilogWorkspaceSymbolProvider } from './providers/WorkspaceSymbolProvider';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    const settings = workspace.getConfiguration();
    let selector:DocumentSelector = [{ scheme: 'file', language: 'systemverilog' }, { scheme: 'file', language: 'verilog' }];
    
    // TODO: Add setting to turn off indexing.
    // (To reduce RAM/CPU usage)
    
    let statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
    statusBar.text = 'SystemVerilog: Active';
    statusBar.show();
    statusBar.command = 'systemverilog.build_index';
    
    let docProvider = new SystemVerilogDocumentSymbolProvider();
    let symProvider = new SystemVerilogWorkspaceSymbolProvider(statusBar, docProvider,
        settings.get('systemverilog.disableIndexing'),
        settings.get('systemverilog.excludeIndexing'),
        settings.get('systemverilog.parallelProcessing'));
    let defProvider = new SystemVerilogDefinitionProvider(symProvider, docProvider);
    let hoverProvider = new SystemVerilogHoverProvider(symProvider, docProvider);

    context.subscriptions.push(statusBar);
    context.subscriptions.push(languages.registerDocumentSymbolProvider(selector, docProvider));
    context.subscriptions.push(languages.registerDefinitionProvider(selector, defProvider));
    context.subscriptions.push(languages.registerHoverProvider(selector, hoverProvider));
    context.subscriptions.push(languages.registerWorkspaceSymbolProvider(symProvider));
    context.subscriptions.push(commands.registerCommand('systemverilog.build_index', rebuild));
    // WIP
    // window.registerTreeDataProvider('systemverilogModules', new SystemVerilogTreeDataProvider())
    // window.registerTreeDataProvider('systemverilogDocuementSymbols', new SystemVerilogDocumentSymbolTreeProvider())

    // Built-in DocumentHighlightProvider is better
    // context.subscriptions.push(languages.registerDocumentHighlightProvider(selector, new SystemVerilogDocumentHighlightProvider()));

    function rebuild(){
        if (!symProvider.building) {
            symProvider.exclude = settings.get('systemverilog.excludeIndexing'),
            symProvider.parallelProcessing = settings.get('systemverilog.parallelProcessing');
            symProvider.build_index()
        }
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}
