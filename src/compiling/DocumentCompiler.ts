import { DiagnosticCollection, OutputChannel } from 'vscode';

/* 
    DocumentCompiler is an abstract class that defines the common behavior of Document compilers.
    Includes a `diagnosticCollection` which stores the `Diagnostics` that belong to each document's `Uri` in the workspace.
    It includes a reference to `outputChannel` which is used to publish the compiler's output.
*/
export abstract class DocumentCompiler {
    public diagnosticCollection: DiagnosticCollection;
    public outputChannel: OutputChannel;

    constructor(collection: DiagnosticCollection, channel: OutputChannel) {
        this.outputChannel = channel;
        this.diagnosticCollection = collection;
    }

    /**
        Compiles the document opened in the editor, 
        Builds the runtime arguments using on the pre defined settings.
        Displays `Diagnostics` to IDE `PROBLEMS` panel.

        @returns a message if an error occurred.
    */
    public abstract compile(): Thenable<string>;

    /**
        Parses `stderr` into Diagnostics that are added to `collection` 
        by mapping the `Diagnostic` to the document's `Uri`.

        @param stderr the error output to parse
        @param document the document been compiled
        @param filePath the `document`'s file path
        @param collection the collection to add the Diagnostics to
        @returns a message if an error occurred.
    */
    public abstract parseDiagnostics(stderr, document, filePath, collection): void;
}