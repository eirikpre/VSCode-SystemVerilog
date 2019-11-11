// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  workspace,
  window,
  languages,
  commands,
  StatusBarAlignment,
  DocumentSelector,
  ExtensionContext,
  ProgressLocation,
} from 'vscode';
import {
  LanguageClient,
  ServerOptions,
  TransportKind,
  LanguageClientOptions,
} from "vscode-languageclient";
import * as path from 'path';
import { SystemVerilogDefinitionProvider } from './providers/DefintionProvider';
import { SystemVerilogDocumentSymbolProvider } from './providers/DocumentSymbolProvider';
import { SystemVerilogHoverProvider } from './providers/HoverProvider';
import { SystemVerilogWorkspaceSymbolProvider } from './providers/WorkspaceSymbolProvider';
import { SystemVerilogModuleInstantiator } from './providers/ModuleInstantiator';
import { SystemVerilogParser } from './parser';
import { SystemVerilogIndexer } from './indexer';


// the LSP's client
let client: LanguageClient;

/* 
  this flag is used to determine when to close the `Progress` window after `compile` command is fired. 
*/
let closeWindowProgress = true;

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

  /** Starts the `LanguageClient` */

  // point to the path of the server's module
  let serverModule = context.asAbsolutePath(path.join('out', 'server.js'));
  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  let serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions
    }
  };

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    // Register the server for selected documents
    documentSelector: selector as string[]
    /*
    synchronize: {
      // Notify the server about file changes to SystemVerilog/Verilog files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher(indexer.globPattern)
    }*/
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    'systemverilog',
    'System Verilog Language Server',
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start();

  client.onReady().then(() => {
    client.sendNotification("workspaceRootPath", workspace.workspaceFolders[0].uri.fsPath);

    /* Update `closeWindowProgress` to true when the client is notified by the server. */
    client.onNotification("closeWindowProgress", function () {
      closeWindowProgress = true;
    });

    /* Notify the server that the workspace configuration has been changed */
    workspace.onDidChangeConfiguration(() => {
      client.sendNotification("onDidChangeConfiguration");
    });
  });

  //Output Channel
  var outputChannel = window.createOutputChannel("SystemVerilog");

  // Status Bar
  const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
  statusBar.text = 'SystemVerilog: Active';
  statusBar.show();
  statusBar.command = 'systemverilog.build_index';

  // Back-end classes
  const parser = new SystemVerilogParser();
  const indexer = new SystemVerilogIndexer(statusBar, parser, outputChannel);

  // Providers
  const docProvider = new SystemVerilogDocumentSymbolProvider(parser);
  const symProvider = new SystemVerilogWorkspaceSymbolProvider(indexer);
  const defProvider = new SystemVerilogDefinitionProvider(symProvider);
  const hoverProvider = new SystemVerilogHoverProvider(symProvider, docProvider);
  const moduleInstantiator = new SystemVerilogModuleInstantiator();

  context.subscriptions.push(statusBar);
  context.subscriptions.push(languages.registerDocumentSymbolProvider(selector, docProvider));
  context.subscriptions.push(languages.registerDefinitionProvider(selector, defProvider));
  context.subscriptions.push(languages.registerHoverProvider(selector, hoverProvider));
  context.subscriptions.push(languages.registerWorkspaceSymbolProvider(symProvider));
  const build_handler = () => { indexer.build_index() };
  const instantiate_handler = () => { moduleInstantiator.instantiateModule() };
  context.subscriptions.push(commands.registerCommand('systemverilog.build_index', build_handler));
  context.subscriptions.push(commands.registerCommand('systemverilog.auto_instantiate', instantiate_handler));
  context.subscriptions.push(commands.registerCommand('systemverilog.compile', compileOpenedDocument));

  // WIP
  // const completionProvider = new SystemVerilogCompletionItemProvider(indexer);
  // context.subscriptions.push(languages.registerCompletionItemProvider(selector, completionProvider));
  // window.registerTreeDataProvider('systemverilogModules', new SystemVerilogTreeDataProvider())
  // window.registerTreeDataProvider('systemverilogDocuementSymbols', new SystemVerilogDocumentSymbolTreeProvider())

  // Built-in DocumentHighlightProvider is better
  // context.subscriptions.push(languages.registerDocumentHighlightProvider(selector, new SystemVerilogDocumentHighlightProvider()));

  // Background processes
  context.subscriptions.push(workspace.onDidSaveTextDocument((doc) => { indexer.onChange(doc); }));
  context.subscriptions.push(window.onDidChangeActiveTextEditor((editor) => { indexer.onChange(editor.document) }));
  let watcher = workspace.createFileSystemWatcher(indexer.globPattern, false, false, false);
  context.subscriptions.push(watcher.onDidCreate((uri) => { indexer.onCreate(uri); }));
  context.subscriptions.push(watcher.onDidDelete((uri) => { indexer.onDelete(uri); }));
  context.subscriptions.push(watcher.onDidChange((uri) => { indexer.onDelete(uri); }));
  context.subscriptions.push(watcher);


  /**
    Sends a notification to the LSP to compile the opened document.
    Keeps the `Progress` window opened until `extensionLanguageClient.closeWindowProgress` is set to true or 
    the interval iterations count reaches the maximum value.
    `closeWindowProgress` is updated to true when a notification is sent to the client from LSP.
  */
  function compileOpenedDocument(): void {
    let document = window.activeTextEditor.document;
    if (!document) {
      window.showErrorMessage("There is no open document!");
      return;
    }

    closeWindowProgress = false;
    Promise.resolve(window.withProgress({
      location: ProgressLocation.Notification,
      title: "SystemVerilog Document compiling...",
      cancellable: true
    }, async (_progress, token) => {
      client.sendNotification("compileOpenedDocument", document.uri.toString());

      var intervalCount = 0;
      var interval = setInterval(function () {
        if (closeWindowProgress || intervalCount > 5) {
          clearInterval(interval);
        }
        intervalCount++;
      },
        500);


    })).catch((error) => {
      outputChannel.appendLine(error);
      window.showErrorMessage(error);
    });
  }
}



/** 
 * this method is called when your extension is deactivated
 */
export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}