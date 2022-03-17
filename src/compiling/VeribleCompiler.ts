import { Diagnostic } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import * as child from 'child_process';
import { DocumentCompiler } from './DocumentCompiler';
import { DiagnosticData, isDiagnosticDataUndefined } from './DiagnosticData';

/**
 * Verible Compiler class contains functionality for compiling SystemVerilog/Verilog files using verible-lint.
 * Generates and takes in predefined runtime arguments,
 * and eventually parses the errors/warnings in `stdout` into `Diagnostic` array mapped to each unique document's uri.
 */
export class VeribleCompiler extends DocumentCompiler {
    /**
        Parses `stdout` into `Diagnostics` that are added to `collection` by adding each `Diagnostic` to an array
        The array is mapped in `collection` to the referred document's uri.

        @param _error the process's error
        @param stdout the process's stdout
        @param _stderr the process's stderr
        @param compiledDocument the document been compiled
        @param documentFilePath the `document`'s file path
        @param collection the collection to add the Diagnostics to
        @returns a message if an error occurred.
    */
    public parseDiagnostics(
        _error: child.ExecException,
        stdout: string,
        _stderr: string,
        compiledDocument: TextDocument,
        documentFilePath: string,
        collection: Map<string, Diagnostic[]>
    ): void {
        if (stdout === undefined || stdout === null || !compiledDocument) {
            return;
        }

        const regexError = new RegExp(`^(.+):(\\d+):(\\d+): (.+)(\\(syntax-error\\)).*$`);
        const regexInfo = new RegExp(`^(.+):(\\d+):(\\d+): (.+)(\\[Style.*)$`);

        stdout = stdout.replace(/\r\n/g, '\n').trim();

        const errors = stdout.split(/\n/g);

        const visitedDocuments = new Map<string, boolean>();

        for (let i = 0; i < errors.length; i++) {
            const error = errors[i];
            const diagnosticData: DiagnosticData = new DiagnosticData();
            let matches;

            if ((matches = regexError.exec(error))) {
                const [_match, path, line, position, message] = matches;
                diagnosticData.filePath = path;
                diagnosticData.line = parseInt(line, 10) - 1;
                diagnosticData.charPosition = parseInt(position, 10) - 1;
                diagnosticData.diagnosticSeverity = this.getDiagnosticSeverity('Error');

                // Format Diagnostic's problem
                const problem = [];

                // remove preceding/trailing special characters
                problem.push(message);

                diagnosticData.problem = problem.join('').trim();
            }

            if ((matches = regexInfo.exec(error))) {
                const [_match, path, line, position, message, style] = matches;
                diagnosticData.filePath = path;
                diagnosticData.line = parseInt(line, 10) - 1;
                diagnosticData.charPosition = parseInt(position, 10) - 1;
                diagnosticData.diagnosticSeverity = this.getDiagnosticSeverity('Info');

                // Format Diagnostic's problem
                const problem = [];

                // remove preceding/trailing special characters
                problem.push(message);
                problem.push(style);

                diagnosticData.problem = problem.join('').trim();
            }

            // Push Diagnostic
            if (!isDiagnosticDataUndefined(diagnosticData)) {
                if (visitedDocuments.has(diagnosticData.filePath)) {
                    this.publishDiagnosticForDocument(compiledDocument, false, diagnosticData, collection);
                } else {
                    this.publishDiagnosticForDocument(compiledDocument, true, diagnosticData, collection);
                    visitedDocuments.set(diagnosticData.filePath, true);
                }
            }
        }
    }
}
