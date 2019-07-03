// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import 'vscode';
import {
  workspace,
  window,
  languages,
  commands,
  StatusBarAlignment,
  DocumentSelector,
  ExtensionContext,
  InputBoxOptions,
  TextDocument
} from 'vscode';
import { SystemVerilogDefinitionProvider } from './providers/DefintionProvider';
import { SystemVerilogDocumentSymbolProvider } from './providers/DocumentSymbolProvider';
import { SystemVerilogHoverProvider } from './providers/HoverProvider';
import { SystemVerilogWorkspaceSymbolProvider } from './providers/WorkspaceSymbolProvider';
import { SystemVerilogModuleInstantiator } from './providers/ModuleInstantiator';
import { SystemVerilogParser } from './parser';
import { SystemVerilogIndexerMap } from './indexer_map';

/**
 * this method is called when your extension is activate.
 * your extension is activated the very first time the command is executed.
 * 
 * @param context the current context of the extension.
 */
export function activate(context: ExtensionContext) {

  const selector: DocumentSelector = [{
    scheme: 'file',
    language: 'systemverilog'
  }, {
    scheme: 'file',
    language: 'verilog'
  }];

  // Status Bar
  const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
  statusBar.text = 'SystemVerilog: Active';
  statusBar.show();
  statusBar.command = 'systemverilog.build_index';
  
  // Back-end classes
  const parser = new SystemVerilogParser();
  const indexer = new SystemVerilogIndexerMap(statusBar, parser);

  // Providers
  const docProvider = new SystemVerilogDocumentSymbolProvider();
  const symProvider = new SystemVerilogWorkspaceSymbolProvider(indexer);
  const defProvider = new SystemVerilogDefinitionProvider(symProvider, docProvider);
  const hoverProvider = new SystemVerilogHoverProvider(symProvider, docProvider);
  const moduleInstantiator = new SystemVerilogModuleInstantiator(symProvider);

  context.subscriptions.push(statusBar);
  context.subscriptions.push(languages.registerDocumentSymbolProvider(selector, docProvider));
  context.subscriptions.push(languages.registerDefinitionProvider(selector, defProvider));
  context.subscriptions.push(languages.registerHoverProvider(selector, hoverProvider));
  context.subscriptions.push(languages.registerWorkspaceSymbolProvider(symProvider));
  const build_handler = () => { indexer.rebuild() };
  context.subscriptions.push(commands.registerCommand('systemverilog.build_index', build_handler));
  context.subscriptions.push(commands.registerCommand('systemverilog.auto_instantiate', instantiateModule));

  // WIP
  // window.registerTreeDataProvider('systemverilogModules', new SystemVerilogTreeDataProvider())
  // window.registerTreeDataProvider('systemverilogDocuementSymbols', new SystemVerilogDocumentSymbolTreeProvider())

  // Built-in DocumentHighlightProvider is better
  // context.subscriptions.push(languages.registerDocumentHighlightProvider(selector, new SystemVerilogDocumentHighlightProvider()));

  context.subscriptions.push(workspace.onDidSaveTextDocument((document: TextDocument) => {
    indexer.onSave(document);
  }));

  let watcher = workspace.createFileSystemWatcher(indexer.globPattern, false, false, false);

  watcher.onDidCreate((uri) => {
    indexer.onCreate(uri);
  });

  watcher.onDidDelete((uri) => {
    indexer.onDelete(uri);
  });

  context.subscriptions.push(watcher);

  /**
    Gets module name from the user, and looks up in the workspaceSymbolProvider for a match.
    Looks up the module's definition, and parses it to build the module's instance.
    @return the module's instance, assigns the default parameter values.
  */
  function instantiateModule() {
    const options: InputBoxOptions = {
      prompt: "Enter the module name to instantiate",
      placeHolder: "Enter the module name to instantiate",
    };

    // request the module's name from the user
    window.showInputBox(options).then((value) => {
      if (!value) {
        return;
      }
      // current editor
      const editor = window.activeTextEditor;

      // check if there is no selection
      if (editor.selection.isEmpty) {
        if (editor) {
          moduleInstantiator.auto_instantiate(value).then(
            function (v) {
              editor.edit((editBuilder) => {
                editBuilder.replace(editor.selection, v);
              });
            },
            function (e) {
              window.showErrorMessage(e);
            });
        }
      }
    });
  }
}

/** 
 * this method is called when your extension is deactivated
 */
export function deactivate() { }