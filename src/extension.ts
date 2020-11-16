// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  tasks,
  workspace,
  window,
  languages,
  commands,
  StatusBarAlignment,
  DocumentSelector,
  ExtensionContext,
  ProgressLocation,
  Location,
  Range, Uri
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
import { SystemVerilogTaskProvider } from './providers/TaskProvider';
import { SystemVerilogParser } from './parser';
import { SystemVerilogIndexer } from './indexer';
import { SystemVerilogSymbol } from './symbol';


// the LSP's client
let client: LanguageClient;

// Flag to determine when to close the `Progress` window after `compile` command is fired.
let closeWindowProgress = true;

const selector: DocumentSelector = [
    { scheme: 'file', language: 'systemverilog' },
    { scheme: 'file', language: 'verilog' }
];

export function activate(context: ExtensionContext) {
    //Output Channel
    var outputChannel = window.createOutputChannel("SystemVerilog");

    // Status Bar
    const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
    statusBar.text = 'SystemVerilog: Activating';
    statusBar.show();
    statusBar.command = 'systemverilog.build_index';

    // Back-end classes
    const parser = new SystemVerilogParser();
    const indexer = new SystemVerilogIndexer(statusBar, parser, outputChannel);

    // Providers
    const docProvider = new SystemVerilogDocumentSymbolProvider(parser);
    const symProvider = new SystemVerilogWorkspaceSymbolProvider(indexer);
    const defProvider = new SystemVerilogDefinitionProvider();
    const hoverProvider = new SystemVerilogHoverProvider();
    const moduleInstantiator = new SystemVerilogModuleInstantiator();
    const taskProvider = new SystemVerilogTaskProvider()

    context.subscriptions.push(statusBar);
    context.subscriptions.push(tasks.registerTaskProvider("systemverilog", taskProvider))
    context.subscriptions.push(languages.registerDocumentSymbolProvider(selector, docProvider));
    context.subscriptions.push(languages.registerDefinitionProvider(selector, defProvider));
    context.subscriptions.push(languages.registerHoverProvider(selector, hoverProvider));
    context.subscriptions.push(languages.registerWorkspaceSymbolProvider(symProvider));
    const build_handler = () => { indexer.build_index().then( _ => saveIndex() ) };
    const instantiate_handler = () => { moduleInstantiator.instantiateModule() };
    context.subscriptions.push(commands.registerCommand('systemverilog.build_index', build_handler));
    context.subscriptions.push(commands.registerCommand('systemverilog.auto_instantiate', instantiate_handler));
    context.subscriptions.push(commands.registerCommand('systemverilog.compile', compileOpenedDocument));

    // Background processes
    context.subscriptions.push(workspace.onDidSaveTextDocument((doc) => { indexer.onChange(doc); saveIndex(); }));
    context.subscriptions.push(window.onDidChangeActiveTextEditor((editor) => { indexer.onChange(editor.document); saveIndex(); }));
    let watcher = workspace.createFileSystemWatcher("**/*.{sv,v,svh,vh}", false, false, false);
    context.subscriptions.push(watcher.onDidCreate((uri) => { indexer.onCreate(uri); saveIndex(); }));
    context.subscriptions.push(watcher.onDidDelete((uri) => { indexer.onDelete(uri); saveIndex(); }));
    context.subscriptions.push(watcher.onDidChange((uri) => { indexer.onDelete(uri); saveIndex(); }));
    context.subscriptions.push(watcher);

    const settings = workspace.getConfiguration();
    try {
        loadIndex();
    }
    catch (error) {
        if (settings.get('systemverilog.disableIndexing')) {
            statusBar.text = "SystemVerilog: Indexing disabled on boot";
        } else {
            commands.executeCommand("systemverilog.build_index");
        }
    }

    function saveIndex(): void {
        let syms = [ ...indexer.symbols ];
        context.workspaceState.update("symbols", syms);
    }

    function loadIndex(): void {
        let symbols: Array<any> = context.workspaceState.get("symbols");
        let num_symbols: number = 0;
        if (symbols) {
            symbols.forEach(entry => {
                // Hack because typecasting didn't work
                let syms: SystemVerilogSymbol[] = new Array<SystemVerilogSymbol>();
                entry[1].forEach(s => {
                    syms.push(
                    new SystemVerilogSymbol(
                        s.name, s.type, s.containerName,
                        new Location(
                        Uri.file(entry[0]),
                        new Range(
                            s.location.range[0].line, s.location.range[0].character,
                            s.location.range[1].line, s.location.range[1].character
                        ))));
                    num_symbols += 1;
                });
                indexer.symbols.set(entry[0], syms)
                indexer.symbolsCount = num_symbols;
            })
            statusBar.text = 'SystemVerilog: ' + num_symbols + ' indexed objects';
        } else {
            throw "Could not load index";
        }
    }

    /**
        Sends a notification to the LSP to compile the opened document.
        Keeps the `Progress` window opened until `extensionLanguageClient.closeWindowProgress` is set to true or
        the interval iterations count reaches the maximum value.
        `closeWindowProgress` is updated to true when a notification is sent to the client from LSP.
    */
    function compileOpenedDocument(): void {
        let document = window.activeTextEditor.document;
        closeWindowProgress = false;
        if (!document) {
            window.showErrorMessage("There is no open document!");
            return;
        }
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
        }, 500);
        })).catch( (error) => {
            outputChannel.appendLine(error);
            window.showErrorMessage(error);
        });
    }

    /** Starts the `LanguageClient` */

    // point to the path of the server's module
    let serverModule = context.asAbsolutePath(path.join('out', 'server.js'));

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    let serverOptions: ServerOptions = {
        run: {
            module: serverModule,
            transport: TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: { execArgv: ['--nolazy', '--inspect=6009'] }
        }
    };

    // Options to control the language client
    let clientOptions: LanguageClientOptions = {
        documentSelector: selector as string[]
        // synchronize: {
        //     fileEvents: workspace.createFileSystemWatcher(indexer.globPattern)
        // }
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
}


export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}