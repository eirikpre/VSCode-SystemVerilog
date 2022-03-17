import { Connection, Diagnostic, TextDocuments } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DocumentCompiler } from './DocumentCompiler';
import { VerilatorCompiler } from './VerilatorCompiler';
import { VCSCompiler } from './VCSCompiler';
import { VeribleCompiler } from './VeribleCompiler';

/* defines supported simulators/compilers */
export enum CompilerType {
    Verilator = 1,
    VCS = 2,
    Verible = 3
}

/* 
    SystemVerilog Compiler handles functionality for compiling documents using the supported simulators.
    Used by the LSP's `connection` to handle getting `Diagnostics` for `documents`
*/
export class SystemVerilogCompiler {
    compiler: DocumentCompiler;
    connection: Connection;
    documents: TextDocuments<TextDocument>;
    workspaceRootPath: string;
    configurations: Map<string, any>;
    compilerConfigurationsKeys: string[];

    constructor(
        connection: Connection,
        documents: TextDocuments<TextDocument>,
        workspaceRootPath: string,
        configurations: Map<string, any>,
        compilerConfigurationsKeys: string[]
    ) {
        this.connection = connection;
        this.documents = documents;
        this.workspaceRootPath = workspaceRootPath;
        this.configurations = configurations;
        this.compilerConfigurationsKeys = compilerConfigurationsKeys;
    }

    /**
        Compiles the given `document` using the compiler/simulator specified by `type`.

        @returns a `Promise` of a map of entries mapping each uri to a `Diagnostic` array
    */
    public async validateTextDocument(document: TextDocument, type: CompilerType): Promise<Map<string, Diagnostic[]>> {
        if (type === CompilerType.Verilator) {
            this.compiler = new VerilatorCompiler(
                this.connection,
                this.documents,
                this.workspaceRootPath,
                this.configurations,
                this.compilerConfigurationsKeys
            );
        } else if (type === CompilerType.VCS) {
            this.compiler = new VCSCompiler(
                this.connection,
                this.documents,
                this.workspaceRootPath,
                this.configurations,
                this.compilerConfigurationsKeys
            );
        } else if (type === CompilerType.Verible) {
            this.compiler = new VeribleCompiler(
                this.connection,
                this.documents,
                this.workspaceRootPath,
                this.configurations,
                this.compilerConfigurationsKeys
            );
        } else {
            this.connection.console.log(`SystemVerilog: '${type}' is an invalid compiler type.`);
            return;
        }

        return this.compiler.getTextDocumentDiagnostics(document);
    }
}
