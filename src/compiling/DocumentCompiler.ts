import {
    Connection,
    Diagnostic,
    TextDocument,
    TextDocuments
} from "vscode-languageserver";

/* 
    DocumentCompiler is an abstract class that defines the common behavior of Document compilers.
*/
export abstract class DocumentCompiler {
    public connection: Connection;
    public documents: TextDocuments;
    public configurations: Map<string, any>;
    public compilerConfigurationsKeys: string[]

    constructor(connection: Connection, documents: TextDocuments, configurations: Map<string, any>, compilerConfigurationsKeys: string[]) {
        this.connection = connection;
        this.documents = documents;
        this.configurations = configurations;
        this.compilerConfigurationsKeys = compilerConfigurationsKeys;
    }

    /**
        Compiles the given `document`, builds the runtime arguments using on the pre defined settings,
        and adds each `Diagnostic` to an array mapped to the referred document's uri.

        @param document the document to compile
        @returns a `Thenable` map of entries mapping each uri to a `Diagnostic` array
    */
    public abstract getTextDocumentDiagnostics(document: TextDocument): Thenable<Map<string, Diagnostic[]>>;

    /**
        Parses `stderr` into `Diagnostics` that are added to `collection` by adding each `Diagnostic` to an array
        The array is mapped in `collection` to the referred document's uri.

        @param stderr the error output to parse
        @param compiledDocument the document been compiled
        @param documentFilePath the `document`'s file path
        @param collection the collection to add the Diagnostics to
        @returns a message if an error occurred.
    */
    public abstract parseDiagnostics(stderr: string, compiledDocument: TextDocument, documentFilePath: string, collection: Map<string, Diagnostic[]>): void;
}