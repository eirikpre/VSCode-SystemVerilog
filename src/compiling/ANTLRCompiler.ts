import {
    Position,
    Range,
    DiagnosticSeverity,
    Diagnostic,
    TextDocument
} from "vscode-languageserver";
import { DocumentCompiler, DiagnosticData, isDiagnosticDataUndefined } from './DocumentCompiler';
import { ANTLRInputStream, CommonTokenStream, ConsoleErrorListener} from 'antlr4ts';
import {SystemVerilogLexer} from './ANTLR/grammar/build/SystemVerilogLexer'
import {SystemVerilogParser} from './ANTLR/grammar/build/SystemVerilogParser'
import {SyntaxErrorListener} from './ANTLR/SyntaxErrorListener'
import { isSystemVerilogDocument, isVerilogDocument } from '../utils/server';

export class ANTLRCompiler extends DocumentCompiler {

    public getTextDocumentDiagnostics(document: TextDocument): Thenable<Map<string, Diagnostic[]>> {
        return new Promise((resolve, reject) => {
            if (!document) {
                reject("SystemVerilog: Invalid document.");
                return;
            }

            if (!isSystemVerilogDocument(document) && !isVerilogDocument(document)) {
                reject("The document is not a SystemVerilog/Verilog file.");
                return;
            }

            let visitedDocuments = new Map<string, boolean>();
            let diagnosticCollection: Map<string, Diagnostic[]> = new Map();

            // Create the lexer and parser
            let text = document.getText();
            let inputStream = new ANTLRInputStream(document.getText());
            let lexer = new SystemVerilogLexer(inputStream);
            let tokenStream = new CommonTokenStream(lexer);
            let parser = new SystemVerilogParser(tokenStream);

            let syntaxError = new SyntaxErrorListener();
            parser.addErrorListener(syntaxError);

            // Parse the input, where `compilationUnit` is whatever entry point you defined
            let tree = parser.system_verilog_text();

            for (let i = 0; i < syntaxError.error_list.length; i++) {
                let diagnosticData: DiagnosticData = new DiagnosticData();

                diagnosticData.filePath = document.uri;
                diagnosticData.line = syntaxError.error_list[i].line;
                diagnosticData.diagnosticSeverity = DiagnosticSeverity.Error;
                diagnosticData.problem = this.getImprovedMessage(syntaxError.error_list[i],document.uri);
                diagnosticData.offendingSymbol = syntaxError.error_list[i].offendingSymbol.text;
                diagnosticData.charPosition = syntaxError.error_list[i].charPositionInLine;
                //push Diagnostic
                if (!isDiagnosticDataUndefined(diagnosticData)) {

                    if (visitedDocuments.has(diagnosticData.filePath)) {
                        this.publishDiagnosticForDocument(document, false, diagnosticData, diagnosticCollection);
                    }
                    else {
                        this.publishDiagnosticForDocument(document, true, diagnosticData, diagnosticCollection);
                        visitedDocuments.set(diagnosticData.filePath, true);
                    }
                }
            }
            resolve(diagnosticCollection);
        });
    }

    /**
        Dummy function in order to satisfy the interface. It is only 
        called from getTextDocumentDiagnostics in the original code

        @param error the process's error
        @param stdout the process's stdout
        @param stderr the process's stderr
        @param compiledDocument the document been compiled
        @param documentFilePath the `document`'s file path
        @param collection the collection to add the Diagnostics to
        @returns a message if an error occurred.
    */
    public parseDiagnostics(
        error, 
        stdout: string, 
        stderr: string, 
        compiledDocument: TextDocument, 
        documentFilePath: string, 
        collection: Map<string, Diagnostic[]>): void {
            throw new Error("ANTLRCompiler.parseDiagnostics should never be called.");
    }

    /**
        Function for getting a more helpful error message than the one included
        in the parser error msg property.

        @param parser_error The error object given by the parser
        @returns The appropriate user facing error message
    */
    public getImprovedMessage(parser_error: any, uri: string): string {
        let out: string = parser_error.msg;
        if (parser_error.msg.startsWith("extraneous input")) {
            out = "extraneous input \"" + parser_error.offendingSymbol.text + "\"";
        }
        return out;
    }
};