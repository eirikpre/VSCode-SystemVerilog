import {
    Connection,
    TextDocument,
    Diagnostic,
    TextDocuments
} from 'vscode-languageserver';
import { DocumentCompiler } from "./DocumentCompiler";
import { VerilatorCompiler } from "./VerilatorCompiler";


/* defines supported simulators/compilers */
export enum compilerType {
    Verilator = 1
};

/* 
    SystemVerilog Compiler handles functionality for compiling documents using the supported simulators.
    Used by the LSP's `connection` to handle getting `Diagnostics` for `documents`
*/
export class SystemVerilogCompiler {
    compiler: DocumentCompiler;
    connection: Connection;
    documents: TextDocuments;
    configurations: Map<string, any>;
    compilerConfigurationsKeys: string[]

    constructor(connection: Connection, documents: TextDocuments, configurations: Map<string, any>, compilerConfigurationsKeys: string[]) {
        this.connection = connection;
        this.documents = documents;
        this.configurations = configurations;
        this.compilerConfigurationsKeys = compilerConfigurationsKeys;
    }

    /**
        Compiles the given `document` using the compiler/simulator specified by `type`.

        @returns a `Promise` of a map of entries mapping each uri to a `Diagnostic` array
    */
    public async validateTextDocument(document: TextDocument, type: compilerType): Promise<Map<string, Diagnostic[]>> {
        if (type == compilerType.Verilator) {
            this.compiler = new VerilatorCompiler(this.connection, this.documents, this.configurations, this.compilerConfigurationsKeys);
        }
        else {
            this.connection.console.log("SystemVerilog: '" + type + "' is an invalid compiler type.");
            return;
        }

        return this.compiler.getTextDocumentDiagnostics(document);
    }
}