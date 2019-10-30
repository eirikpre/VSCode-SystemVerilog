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

            // Get document text
            let text = document.getText();
            // Perform macro replacements
            let new_text = this.macroReplace(text);
            // Create the lexer and parser
            let inputStream = new ANTLRInputStream(new_text);
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
            out = 'extraneous input "' + parser_error.offendingSymbol.text + '"';
        }
        return out;
    }

    /**
        Function for replacing macro uses with their appropriate text

        @param text The text to identify macro definitions and replace macro uses within
        @returns The text with macro definitions removed and their uses replaced with the text they represent
    */
    public macroReplace(text: string): string {
        let defines_with_text: [[string, string][], string] = this.extract_defines(text.replace('\r', ''));
        let defines: [string, string][] = defines_with_text[0];
        let new_text: string = defines_with_text[1];

        return this.replace_defines(new_text, defines).replace('\r','');
    }

    /**
        Function for identifying macro definitions and removing them from the text

        @param text The text to identify macro definitions and replace macro uses within
        @returns The array of macro labels and the text they represent, and the full text with the macro definitions removed
    */
    private extract_defines(text: string): [[string, string][], string] {
        let current_index: number = text.indexOf('`define');
        let defines: [string, string][] = [];
        let new_text: string = text.slice(0, current_index);
        while (current_index != -1) {
            let label: string = text.split(" ", 2)[1];
            let temp_index: number = text.indexOf('\n', current_index);
            while (temp_index != -1 && text.charAt(temp_index - 1) == '\\') {
                temp_index = text.indexOf('\n', temp_index + 1);
            }
            let value: string = text.slice(text.indexOf(label, current_index) + label.length + 1, temp_index);
            value = value.replace('\\\n', '\n');
            defines.push([label, value]);
            current_index = text.indexOf('`define', current_index + 1);
            if (current_index == -1) {
                new_text = new_text.concat(text.slice(temp_index + 1));
            } else {
                new_text = new_text.concat(text.slice(temp_index + 1, current_index));
            }
        }
        return [defines, new_text];
    }

    /**
        Function for replacing the appearances of defined macros with their appropriate text within the full text

        @param text The text to replace the macro uses within
        @param defines The array of macro labels and the text they represent
        @returns The full text, with macro uses replaced with the text they represent
    */
    private replace_defines(text: string, defines: [string, string][]): string {
        let new_text: string = text;
        defines.forEach(function (define) {
            new_text = new_text.replace('`' + define[0], define[1]);
        });
        return new_text;
    }
};