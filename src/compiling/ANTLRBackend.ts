import {
    Position,
    Range,
    DiagnosticSeverity,
    Diagnostic,
    TextDocument
} from "vscode-languageserver";
import { ANTLRInputStream, CommonTokenStream, ConsoleErrorListener} from 'antlr4ts';
import {SystemVerilogLexer} from './ANTLR/grammar/build/SystemVerilogLexer'
import {SystemVerilogParser} from './ANTLR/grammar/build/SystemVerilogParser'
import {SyntaxErrorListener} from './ANTLR/SyntaxErrorListener'
import { isSystemVerilogDocument, isVerilogDocument, getLineRange } from '../utils/server';
import { DiagnosticData, isDiagnosticDataUndefined } from "./DiagnosticData";

export class ANTLRBackend{

    /**
     * Parse a document with the ANTLR parser and return any diagnostic errors
     * 
     * @param document the document to parse
     * @returns a dictionary of arrays of errors with uri as keys
     */
    public async getDiagnostics(document: TextDocument): Promise<Map<string, Diagnostic[]>> {
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

            //Use syntaxError to collect a list of errors found by the parser
            let syntaxError = new SyntaxErrorListener();
            parser.addErrorListener(syntaxError);

            // Parse the input
            let tree = parser.system_verilog_text();

            //place errors in the diagnostic list
            let diagnosticList = new Array<Diagnostic>();
            for (let i = 0; i < syntaxError.error_list.length; i++) {
                let range: Range = getLineRange(
                    syntaxError.error_list[i].line, 
                    syntaxError.error_list[i].offendingSymbol.text, 
                    syntaxError.error_list[i].charPositionInLine);

                let diagnostic = {
                    severity: DiagnosticSeverity.Error,
                    range: range,
                    message: this.getImprovedMessage(syntaxError.error_list[i],document.uri,syntaxError.error_list.length),
                    source: 'systemverilog'
                };

                if (diagnostic.message != "") //If message is blank, ignore it
                    diagnosticList.push(diagnostic);
            }
            diagnosticCollection.set(document.uri,diagnosticList);

            resolve(diagnosticCollection);
        });
    }

    /**
        Function for getting a more helpful error message than the one included
        in the parser error msg property.

        @param parser_error The error object given by the parser
        @param uri The document the error is in
        @param error_count The number of errors found in the file, used to filter out some messages
        @returns The appropriate user facing error message
    */
    public getImprovedMessage(parser_error: any, uri: string, error_count: Number): string {
        let out: string = parser_error.msg;
        if (parser_error.msg.startsWith("extraneous input")) {
            out = 'extraneous input "' + parser_error.offendingSymbol.text + '"';
        }
        if (parser_error.msg.startsWith("mismatched input")) {
            if (error_count > 1)
                out = ""; //filter out all errors for mismatched input
            else
                out = 'mismatched input "' + parser_error.offendingSymbol.text + '"';

        }
        return out;
    }
};