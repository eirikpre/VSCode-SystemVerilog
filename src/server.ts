import {
	createConnection,
	TextDocuments,
	TextDocument,
	Diagnostic,
	ProposedFeatures,
	InitializeParams
} from 'vscode-languageserver';
import { SystemVerilogCompiler, compilerType } from './compiling/SystemVerilogCompiler';

// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. The text document manager
// supports full document sync only
let documents: TextDocuments = new TextDocuments();

let documentCompiler: SystemVerilogCompiler;

/* `configurations` is used to store the workspace's configs */
let configurations: Map<string, any> = new Map();
let compilerConfigurationsKeys: string[] = [
	"systemverilog.compilerType",
	"systemverilog.compileOnSave",
	"systemverilog.launchConfiguration"
];

connection.onInitialize((params: InitializeParams) => {
	return {
		capabilities: {
			textDocumentSync: documents.syncKind
		}
	};
});

connection.onInitialized(async () => {
	await updateConfigurationsSettings();
});

connection.onNotification("workspaceRootPath", (rootPath: string) => {
	documentCompiler = new SystemVerilogCompiler(connection, documents, rootPath, configurations, compilerConfigurationsKeys);
});

connection.onNotification("onDidChangeConfiguration", async () => {
	await updateConfigurationsSettings();
});

/**
	Updates `configurations` map with the most recent value of the settings,
 */
function updateConfigurationsSettings(): Promise<any> {
	return Promise.all(compilerConfigurationsKeys.map(async (configuration: string) => {
		await connection.workspace.getConfiguration({
			section: configuration
		}).then((value) => {
			configurations.set(configuration, value);
		});
	}));
}

/**
	If `compileOnSave` is set to true, the server will compile the document.
 */
documents.onDidSave(saveEvent => {
	if (configurations.get(compilerConfigurationsKeys[1])) {
		compile(saveEvent.document).catch((error) => {
			connection.window.showErrorMessage(error);
		});
	}
});

connection.onNotification("compileOpenedDocument", (uri: string) => {
	compile(documents.get(uri)).then(() => {
		//when finished compiling the document, send a notification to the client to close the `Progress` window
		connection.sendNotification("closeWindowProgress");
	}).catch((error) => {
		connection.window.showErrorMessage(error);
	});
});

/**
	Compiles a given `document`, gets the `Diagnostics` maped to each refrenced `uri`,
	sends the `Diagnosics` to the client to publish.

	@param document the document to compile
 */
async function compile(document: TextDocument): Promise<void> {
	if (!documentCompiler) {
		return;
	}

	//remove existing Diagnostics for the targeted document
	connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });

	//convert string to enum type `compilerType`
	let type: compilerType = <compilerType>compilerType[<string>configurations.get(compilerConfigurationsKeys[0])];

	documentCompiler.validateTextDocument(document, type).then((diagnosticCollection: Map<string, Diagnostic[]>) => {
		// Send the computed diagnostics to VSCode for each document
		for (const [uri, diagnostics] of diagnosticCollection.entries()) {
			connection.sendDiagnostics({ uri: uri, diagnostics });
		}
	}).catch((error) => {
		connection.window.showErrorMessage(error);
	});

}

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();