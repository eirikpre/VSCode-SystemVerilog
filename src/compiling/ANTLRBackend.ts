import { Range, DiagnosticSeverity, Diagnostic, TextDocument } from 'vscode-languageserver';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { SystemVerilogLexer } from './ANTLR/grammar/build/SystemVerilogLexer';
import { SystemVerilogParser } from './ANTLR/grammar/build/SystemVerilogParser';
import { SyntaxErrorListener } from './ANTLR/SyntaxErrorListener';
import { isSystemVerilogDocument, isVerilogDocument, getLineRange } from '../utils/server';

export class ANTLRBackend {
    /**
     * Parse a document with the ANTLR parser and return any diagnostic errors
     *
     * @param document the document to parse
     * @returns a dictionary of arrays of errors with uri as keys
     */
    public async getDiagnostics(document: TextDocument): Promise<Map<string, Diagnostic[]>> {
        return new Promise((resolve, reject) => {
            if (!document) {
                reject(new Error('SystemVerilog: Invalid document.'));
                return;
            }

            if (!isSystemVerilogDocument(document) && !isVerilogDocument(document)) {
                reject(new Error('The document is not a SystemVerilog/Verilog file.'));
                return;
            }

            // const visitedDocuments = new Map<string, boolean>();
            const diagnosticCollection: Map<string, Diagnostic[]> = new Map();

            // Get document text
            const text = document.getText();
            // Perform macro replacements
            const new_text = this.macroReplace(text);
            // Create the lexer and parser
            const inputStream = CharStreams.fromString(new_text);
            const lexer = new SystemVerilogLexer(inputStream);
            const tokenStream = new CommonTokenStream(lexer);
            const parser = new SystemVerilogParser(tokenStream);

            // Use syntaxError to collect a list of errors found by the parser
            const syntaxError = new SyntaxErrorListener();
            parser.addErrorListener(syntaxError);

            // Parse the input
            parser.system_verilog_text();

            // Place errors in the diagnostic list
            const diagnosticList = new Array<Diagnostic>();
            for (let i = 0; i < syntaxError.error_list.length; i++) {
                const range: Range = getLineRange(
                    syntaxError.error_list[i].line,
                    syntaxError.error_list[i].offendingSymbol.text,
                    syntaxError.error_list[i].charPositionInLine
                );

                const diagnostic = {
                    severity: DiagnosticSeverity.Error,
                    range,
                    message: this.getImprovedMessage(
                        syntaxError.error_list[i],
                        document.uri,
                        syntaxError.error_list.length
                    ),
                    source: 'systemverilog'
                };

                if (diagnostic.message !== '')
                    // If message is blank, ignore it
                    diagnosticList.push(diagnostic);
            }
            diagnosticCollection.set(document.uri, diagnosticList);

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
        if (parser_error.msg.startsWith('extraneous input')) {
            out = `extraneous input "${parser_error.offendingSymbol.text}"`;
        }
        if (parser_error.msg.startsWith('mismatched input')) {
            if (error_count > 1) out = '';
            // Filter out all errors for mismatched input
            else out = `mismatched input "${parser_error.offendingSymbol.text}"`;
        }
        return out;
    }

    /**
        Function for replacing macro uses with their appropriate text
        @param text The text to identify macro definitions and replace macro uses within
        @returns The text with macro definitions removed and their uses replaced with the text they represent
    */
    public macroReplace(text: string): string {
        const defines_with_text: [[string, string][], string] = this.extract_defines(text.replace(/\r\n/g, '\n'));
        const defines: [string, string][] = defines_with_text[0];
        const new_text: string = defines_with_text[1];

        const newer_text: string = this.remove_ifdef_ifndef(new_text);
        return this.replace_defines(newer_text, defines);
    }

    /**
     * Function for removing all ifdef and ifndef blocks from text
     * @param text The text to remove all ifdef and ifndef blocks from
     * @returns The text with all ifdef and ifndef blocks removed
     */
    private remove_ifdef_ifndef(text: string): string {
        return text.replace(/(`ifdef|`ifndef)[\s\S]*?`endif/gm, '');
    }

    /**
        Function for identifying macro definitions and removing them from the text
        @param text The text to identify macro definitions and replace macro uses within
        @returns The array of macro labels and the text they represent, and the full text with the macro definitions removed
    */
    private extract_defines(text: string): [[string, string][], string] {
        let current_index: number = text.indexOf('`define');
        const defines: [string, string][] = [];
        let new_text: string;
        if (current_index === -1) {
            new_text = text;
        } else {
            new_text = text.slice(0, current_index);
        }
        while (current_index !== -1) {
            const label: string = text.slice(current_index).split(' ', 2)[1];
            let temp_index: number = text.indexOf('\n', current_index);
            while (temp_index !== -1 && text.charAt(temp_index - 1) === '\\') {
                temp_index = text.indexOf('\n', temp_index + 1);
            }
            let value: string = text.slice(text.indexOf(label, current_index) + label.length + 1, temp_index);
            value = value.replace('\\\n', '\n');
            defines.push([label, value]);
            current_index = text.indexOf('`define', current_index + 1);
            if (current_index === -1) {
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
        defines.forEach((define) => {
            while (new_text.indexOf(`\`${define[0]}`) !== -1) {
                new_text = new_text.replace(`\`${define[0]}`, define[1]);
            }
        });
        return new_text;
    }
}
