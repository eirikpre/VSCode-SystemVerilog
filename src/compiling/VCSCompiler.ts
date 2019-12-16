import {
    Diagnostic,
    TextDocument
} from "vscode-languageserver";
import * as child from 'child_process';
import { DocumentCompiler } from './DocumentCompiler';
import { DiagnosticData, isDiagnosticDataUndefined } from "./DiagnosticData";

/**
 * VCS Compiler class contains functionality for compiling SystemVerilog/Verilog files using VCS simulator.
 * Generates and takes in predefined runtime arguments,
 * and eventually parses the errors/warnings in `stdout` into `Diagnostic` array mapped to each unique document's uri.
*/
export class VCSCompiler extends DocumentCompiler {

    /**
        Parses `stdout` into `Diagnostics` that are added to `collection` by adding each `Diagnostic` to an array
        The array is mapped in `collection` to the referred document's uri.

        @param error the process's error
        @param stdout the process's stdout
        @param stderr the process's stderr
        @param compiledDocument the document been compiled
        @param documentFilePath the `document`'s file path
        @param collection the collection to add the Diagnostics to
        @returns a message if an error occurred.
    */
    public parseDiagnostics(error: child.ExecException, stdout: string, stderr: string, compiledDocument: TextDocument, documentFilePath: string, collection: Map<string, Diagnostic[]>): void {
        if (stdout === undefined || stdout === null || !compiledDocument) {
            return;
        }

        let regexError = new RegExp("(.*)-\\[(.*)\\] (.*)\"?" + documentFilePath + "\"?, ([0-9]+)(.*)");

        stdout = stdout.replace(/\r\n/g, '\n').trim();

        let errors = stdout.split(/\n\n/g);

        let visitedDocuments = new Map<string, boolean>();

        for (let i = 0; i < errors.length; i++) {
            let error = this.formatError(errors[i]);
            let diagnosticData: DiagnosticData = new DiagnosticData();
            let matches = undefined;

            if (matches = regexError.exec(error)) {
                diagnosticData.filePath = documentFilePath;
                diagnosticData.line = parseInt(matches[4]) - 1;
                diagnosticData.diagnosticSeverity = this.getDiagnosticSeverity(matches[1]);

                //format Diagnostic's problem
                let problem = [];

                //remove preceding/trailing special characters
                problem.push("[" + matches[2].replace(/^\W+|\W+$/g, "") + "]: ");
                problem.push(matches[3].replace(/^\W+|\W+$/g, "") + ". ");
                problem.push(matches[5].replace(/^\W+|\W+$/g, "") + ".");

                diagnosticData.problem = problem.join("").trim();
            }

            //push Diagnostic
            if (!isDiagnosticDataUndefined(diagnosticData)) {

                if (visitedDocuments.has(diagnosticData.filePath)) {
                    this.publishDiagnosticForDocument(compiledDocument, false, diagnosticData, collection);
                }
                else {
                    this.publishDiagnosticForDocument(compiledDocument, true, diagnosticData, collection);
                    visitedDocuments.set(diagnosticData.filePath, true);
                }
            }
        }
    }

    /**
        Formats an error by removing new line characters, and cleaning up multiple space characters.

        @param error the error output to format
        @returns the formatted error
    */
    formatError(error: string): string {
        error = error.trim();

        let regex = new RegExp("( +)?,( +)?\n", "g");
        error = error.replace(regex, ", ");

        regex = new RegExp("( +)?\n( +)?", "g");
        error = error.replace(regex, ". ");

        error = error.replace(/ +/g, " ");

        return error.trim();
    }
}