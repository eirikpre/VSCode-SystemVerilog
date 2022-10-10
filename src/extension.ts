import { workspace, window, languages, commands, StatusBarAlignment, DocumentSelector, ExtensionContext, ProgressLocation, Location, Range, Uri } from 'vscode'; // prettier-ignore
import { LanguageClient, ServerOptions, TransportKind, LanguageClientOptions } from 'vscode-languageclient/node';
import * as path from 'path';
import { SystemVerilogDefinitionProvider } from './providers/DefinitionProvider';
import { SystemVerilogDocumentSymbolProvider } from './providers/DocumentSymbolProvider';
import { SystemVerilogFormatProvider } from './providers/FormatProvider';
import { SystemVerilogHoverProvider } from './providers/HoverProvider';
import { SystemVerilogWorkspaceSymbolProvider } from './providers/WorkspaceSymbolProvider';
import { SystemVerilogReferenceProvider } from './providers/ReferenceProvider';
import { SystemVerilogModuleInstantiator } from './providers/ModuleInstantiator';
import { SystemVerilogParser } from './parser';
import { SystemVerilogIndexer } from './indexer';
import { SystemVerilogSymbol } from './symbol';

// The LSP's client
let client: LanguageClient;

// Flag to determine when to close the `Progress` window after `compile` command is fired.
let closeWindowProgress = true;

const selector: DocumentSelector = [
    { scheme: 'file', language: 'systemverilog' },
    { scheme: 'file', language: 'verilog' }
];

let indexer: SystemVerilogIndexer | undefined = undefined;
let saveIndexTimeout: NodeJS.Timeout | undefined;

function queuedSaveIndex(context: ExtensionContext) {
    if (saveIndexTimeout !== undefined) {
        clearTimeout(saveIndexTimeout);
    }

    saveIndexTimeout = setTimeout(function () {
        saveIndex(context);
    }, 10000);
}

function saveIndex(context: ExtensionContext): void {
    saveIndexTimeout = undefined;

    const syms = [...indexer.symbols];
    context.workspaceState.update('symbols', syms);
}

export function activate(context: ExtensionContext) {
    // Output Channel
    const outputChannel = window.createOutputChannel('SystemVerilog');

    // Status Bar
    const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
    statusBar.text = 'SystemVerilog: Activating';
    statusBar.show();
    statusBar.command = 'systemverilog.build_index';

    // Back-end Classes
    const parser = new SystemVerilogParser();
    indexer = new SystemVerilogIndexer(statusBar, parser, outputChannel);

    // Providers
    const docProvider = new SystemVerilogDocumentSymbolProvider(parser, indexer);
    const symProvider = new SystemVerilogWorkspaceSymbolProvider(indexer);
    const defProvider = new SystemVerilogDefinitionProvider();
    const hoverProvider = new SystemVerilogHoverProvider();
    const formatProvider = new SystemVerilogFormatProvider(outputChannel);
    const moduleInstantiator = new SystemVerilogModuleInstantiator(formatProvider, symProvider);
    const referenceProvider = new SystemVerilogReferenceProvider(defProvider);

    context.subscriptions.push(statusBar);
    context.subscriptions.push(languages.registerDocumentSymbolProvider(selector, docProvider));
    context.subscriptions.push(languages.registerDefinitionProvider(selector, defProvider));
    context.subscriptions.push(languages.registerHoverProvider(selector, hoverProvider));
    context.subscriptions.push(languages.registerWorkspaceSymbolProvider(symProvider));
    context.subscriptions.push(languages.registerDocumentRangeFormattingEditProvider(selector, formatProvider));
    context.subscriptions.push(languages.registerDocumentFormattingEditProvider(selector, formatProvider));
    context.subscriptions.push(languages.registerReferenceProvider(selector, referenceProvider));

    const buildHandler = () => {
        indexer.build_index().then((_) => queuedSaveIndex(context));
    };
    const instantiateHandler = () => {
        moduleInstantiator.instantiateModule();
    };

    context.subscriptions.push(commands.registerCommand('systemverilog.build_index', buildHandler));
    context.subscriptions.push(commands.registerCommand('systemverilog.auto_instantiate', instantiateHandler));
    context.subscriptions.push(commands.registerCommand('systemverilog.compile', compileOpenedDocument));

    // Background Processes
    context.subscriptions.push(
        workspace.onDidSaveTextDocument((doc) => {
            indexer.onChange(doc);
            queuedSaveIndex(context);
        })
    );
    context.subscriptions.push(
        window.onDidChangeActiveTextEditor((editor) => {
            if (editor !== undefined) {
                indexer.onChange(editor.document);
                queuedSaveIndex(context);
            }
        })
    );
    const watcher = workspace.createFileSystemWatcher('**/*.{sv,v,svh,vh}', false, false, false);
    context.subscriptions.push(
        watcher.onDidCreate((uri) => {
            indexer.onCreate(uri);
            queuedSaveIndex(context);
        })
    );
    context.subscriptions.push(
        watcher.onDidDelete((uri) => {
            indexer.onDelete(uri);
            queuedSaveIndex(context);
        })
    );
    context.subscriptions.push(
        watcher.onDidChange((uri) => {
            indexer.onDelete(uri);
            queuedSaveIndex(context);
        })
    );
    context.subscriptions.push(watcher);

    const settings = workspace.getConfiguration();
    try {
        loadIndex();
    } catch (error) {
        if (settings.get('systemverilog.disableIndexing')) {
            statusBar.text = 'SystemVerilog: Indexing disabled on boot';
        } else {
            commands.executeCommand('systemverilog.build_index');
        }
    }

    function loadIndex(): void {
        const symbols: Array<any> = context.workspaceState.get('symbols');
        let numSymbols = 0;
        if (symbols) {
            symbols.forEach((entry) => {
                // Hack because typecasting didn't work
                const syms: SystemVerilogSymbol[] = new Array<SystemVerilogSymbol>();
                entry[1].forEach((s) => {
                    syms.push(
                        new SystemVerilogSymbol(
                            s.name,
                            s.kind,
                            s.containerName,
                            new Location(
                                Uri.file(entry[0]),
                                new Range(
                                    s.location.range[0].line,
                                    s.location.range[0].character,
                                    s.location.range[1].line,
                                    s.location.range[1].character
                                )
                            )
                        )
                    );
                    numSymbols += 1;
                });
                indexer.symbols.set(entry[0], syms);
                indexer.symbolsCount = numSymbols;
            });
            statusBar.text = `SystemVerilog: ${numSymbols} indexed objects`;
        } else {
            throw new Error('Could not load index');
        }
    }

    /**
        Sends a notification to the LSP to compile the opened document.
        Keeps the `Progress` window opened until `extensionLanguageClient.closeWindowProgress` is set to true or
        the interval iterations count reaches the maximum value.
        `closeWindowProgress` is updated to true when a notification is sent to the client from LSP.
    */
    function compileOpenedDocument(): void {
        const { document } = window.activeTextEditor;
        closeWindowProgress = false;
        if (!document) {
            window.showErrorMessage('There is no open document!');
            return;
        }
        Promise.resolve(
            window.withProgress(
                {
                    location: ProgressLocation.Notification,
                    title: 'SystemVerilog document compiling...',
                    cancellable: true
                },
                async (_progress, _token) => {
                    client.sendNotification('compileOpenedDocument', document.uri.toString());
                    let intervalCount = 0;
                    const interval = setInterval(() => {
                        if (closeWindowProgress || intervalCount > 5) {
                            clearInterval(interval);
                        }
                        intervalCount += 1;
                    }, 500);
                }
            )
        ).catch((error) => {
            outputChannel.appendLine(error);
            window.showErrorMessage(error);
        });
    }

    /** Starts the `LanguageClient` */

    // Point to the path of the server's module
    const serverModule = context.asAbsolutePath(path.join('dist', 'server', 'server.js'));

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    const serverOptions: ServerOptions = {
        run: {
            module: serverModule,
            transport: TransportKind.ipc
        },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: { execArgv: ['--nolazy', '--inspect=6009'] }
        }
    };

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        documentSelector: selector as string[]
        // synchronize: {
        //     fileEvents: workspace.createFileSystemWatcher(indexer.globPattern)
        // }
    };

    // Create the language client and start the client
    client = new LanguageClient('systemverilog', 'SystemVerilog Language Server', serverOptions, clientOptions);

    // Start the client, this will also launch the server
    client.start();

    client.onReady().then(() => {
        try {
            client.sendNotification('workspaceRootPath', workspace.workspaceFolders[0].uri.fsPath);
        } catch {
            // No workspace is open
        }

        // Update `closeWindowProgress` to true when the client is notified by the server
        client.onNotification('closeWindowProgress', () => {
            closeWindowProgress = true;
        });

        // Notify the server that the workspace configuration has been changed
        workspace.onDidChangeConfiguration(() => {
            client.sendNotification('onDidChangeConfiguration');
        });
    });
}

export function deactivate(context: ExtensionContext): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }

    queuedSaveIndex(context);

    return client.stop();
}
