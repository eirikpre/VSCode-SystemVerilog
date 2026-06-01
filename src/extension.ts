import { workspace, window, languages, commands, StatusBarAlignment, DocumentSelector, ExtensionContext, ProgressLocation } from 'vscode'; // prettier-ignore
import { LanguageClient, ServerOptions, TransportKind, LanguageClientOptions } from 'vscode-languageclient/node';
import * as path from 'path';
import * as fs from 'fs';
import { SystemVerilogDefinitionProvider } from './providers/DefinitionProvider';
import { SystemVerilogDocumentSymbolProvider } from './providers/DocumentSymbolProvider';
import { SystemVerilogFormatProvider } from './providers/FormatProvider';
import { SystemVerilogHoverProvider } from './providers/HoverProvider';
import { SystemVerilogWorkspaceSymbolProvider } from './providers/WorkspaceSymbolProvider';
import { SystemVerilogReferenceProvider } from './providers/ReferenceProvider';
import { SystemVerilogModuleInstantiator } from './providers/ModuleInstantiator';
import { SystemVerilogIndexer } from './indexer';
import { IndexerClient } from './utils/indexer-client';

// The LSP's client
let client: LanguageClient;

// Flag to determine when to close the `Progress` window after `compile` command is fired.
let closeWindowProgress = true;

const selector: DocumentSelector = [
    { scheme: 'file', language: 'systemverilog' },
    { scheme: 'file', language: 'systemverilogheader' },
    { scheme: 'file', language: 'verilog' },
    { scheme: 'file', language: 'verilogheader' },
    { scheme: 'file', language: 'veriloga' },
    { scheme: 'file', language: 'verilogams' }
];

let indexer: SystemVerilogIndexer | undefined = undefined;
let indexerClient: IndexerClient | undefined = undefined;

function resolveStorageDir(context: ExtensionContext): string {
    const base = context.storageUri || context.globalStorageUri;
    // If we have no workspace storage, fall back to a transient OS temp dir.
    // The cache simply won't persist across restarts in that case.
    const baseFs = base ? base.fsPath : path.join(require('os').tmpdir(), 'sv-index-transient');
    const dir = path.join(baseFs, 'sv-index');
    try {
        fs.mkdirSync(dir, { recursive: true });
    } catch {
        /* mkdir is best-effort */
    }
    return dir;
}

export function activate(context: ExtensionContext) {
    // Output Channel
    const outputChannel = window.createOutputChannel('SystemVerilog');

    // Status Bar
    const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
    statusBar.text = 'SystemVerilog: Activating';
    statusBar.show();
    statusBar.command = 'systemverilog.build_index';

    // One-time cleanup of the legacy monolithic workspaceState blob.
    if (context.workspaceState.get('symbols') !== undefined) {
        context.workspaceState.update('symbols', undefined);
    }

    // Start the indexer worker
    const storageDir = resolveStorageDir(context);
    indexerClient = new IndexerClient({
        storageDir,
        workerPath: context.asAbsolutePath(path.join('dist', 'client', 'indexer-worker.js')),
        onCrash: (err) => {
            outputChannel.appendLine(`SystemVerilog: indexer worker crashed: ${err.stack || err.message}`);
        }
    });

    // Back-end Classes
    indexer = new SystemVerilogIndexer(statusBar, outputChannel, indexerClient);

    // Providers
    const docProvider = new SystemVerilogDocumentSymbolProvider(indexer);
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
        indexer.build_index();
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
        })
    );
    const watcher = workspace.createFileSystemWatcher('**/*.{sv,v,svh,vh}', false, false, false);
    context.subscriptions.push(
        watcher.onDidCreate((uri) => {
            indexer.onCreate(uri);
        })
    );
    context.subscriptions.push(
        watcher.onDidDelete((uri) => {
            indexer.onDelete(uri);
        })
    );
    context.subscriptions.push(
        watcher.onDidChange((uri) => {
            // Re-index the changed file (previously this incorrectly called
            // onDelete, which removed the file's symbols without re-parsing).
            indexer.onCreate(uri);
        })
    );
    context.subscriptions.push(watcher);

    indexerClient.whenReady().then(
        async () => {
            const settings = workspace.getConfiguration();
            const cached = await indexerClient.count();
            if (cached > 0) {
                indexer.symbolsCount = cached;
                statusBar.text = `SystemVerilog: ${cached} indexed objects`;
                // Background revalidation will pick up any stale files via the
                // mtime gate the next time they are saved or opened.
            } else if (!settings.get('systemverilog.disableIndexing')) {
                commands.executeCommand('systemverilog.build_index');
            } else {
                statusBar.text = 'SystemVerilog: Indexing disabled on boot';
            }
        },
        (err) => {
            outputChannel.appendLine(`SystemVerilog: indexer init failed: ${err.stack || err.message}`);
            statusBar.text = 'SystemVerilog: Indexer failed to start';
        }
    );

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

export function deactivate(_context: ExtensionContext): Thenable<void> | undefined {
    const stops: Promise<unknown>[] = [];
    if (indexerClient) {
        stops.push(indexerClient.dispose().catch(() => undefined));
        indexerClient = undefined;
    }
    if (client) {
        stops.push(client.stop());
    }
    return Promise.all(stops).then(() => undefined);
}
