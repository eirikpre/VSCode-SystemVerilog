import {
    Position,
    Range,
    DiagnosticSeverity,
    Diagnostic,
    TextDocument
} from "vscode-languageserver";
import { DocumentCompiler } from './DocumentCompiler';
import { DiagnosticData, isDiagnosticDataUndefined } from "./DiagnosticData";
import * as child from 'child_process';

/** 
 * CannotFindModule states: Handles the states of parsing `Cannot find` errors.
 */
enum CannotFindModuleState {
    CannotFindModule = 1,
    SearchPathNotFound = 2,
    LookedIn = 3,
    FilesSearched = 4,
    End = 5,
};

/**
 * Verilator Compiler class contains functionality for compiling SystemVerilog/Verilog files using Verilator simulator.
 * Generates and takes in predefined runtime arguments,
 * and eventually parses the errors/warnings in `stderr` into `Diagnostic` array mapped to each unique document's uri.
*/
export class VerilatorCompiler extends DocumentCompiler {
    //Regex expressions
    regexError = new RegExp("%Error: ([^:]*):([0-9]+)(:[0-9]+)?: (.*)");
    regexErrorWarning = new RegExp("%Error-(.*): ([^:]*):([0-9]+)(:[0-9]+)?: (.*)");
    regexWarning = new RegExp("%Warning-(.*): ([^:]*):([0-9]+)(:[0-9]+)?: (.*)");
    regexWarningSuggest = new RegExp("%Warning-(.*): (.*)");
    regexCannotFindModule = new RegExp("%Error: ([^:]*):([0-9]+)(:[0-9]+)?: Cannot find(.*): (.*)");
    regexSearchPathNotFound = new RegExp("%Error: ([^:]*):([0-9]+)(:[0-9]+)?: This may be because there's no search path specified with -I<dir>.");
    regexLookedIn = new RegExp("%Error: ([^:]*):([0-9]+)(:[0-9]+)?: Looked in:");
    regexFilesSearchedSource = "%Error: ([^:]*):([0-9]+)(:[0-9]+)?:       (.*)notFoundModulePlaceHolder(.v|.sv|.vh|.svh|)$";
    regexOffendPart = new RegExp(".*'(.*)'.*");

    /**
        Parses `stderr` into `Diagnostics` that are added to `collection` by adding each `Diagnostic` to an array
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
        if (stderr === undefined || stderr === null || !compiledDocument) {
            return;
        }

        //remove multiple new lines characters
        stderr = stderr.replace(/\r\n|\n|\r/g, '\n').trim();

        let errors = stderr.split(/\r|\n/g);

        let visitedDocuments = new Map<string, boolean>();

        let previousLine = undefined;

        for (let i = 0; i < errors.length; i++) {

            let error = errors[i].trim();
            let diagnosticData: DiagnosticData = new DiagnosticData();
            let matches = undefined;

            if (matches = this.regexError.exec(error)) {
                if (matches && matches.length > 4) {
                    diagnosticData.filePath = matches[1];
                    diagnosticData.line = parseInt(matches[2]) - 1;
                    if(matches[3] !== undefined){
                        diagnosticData.charPosition = parseInt(matches[3].substr(1)) - 1;
                        let symbol = this.regexOffendPart.exec(error);
                        diagnosticData.offendingSymbol = symbol ? symbol[1] : null;
                    }
                    diagnosticData.problem = matches[4].trim();
                    diagnosticData.diagnosticSeverity = DiagnosticSeverity.Error;
                }
            }
            else if (matches = this.regexErrorWarning.exec(error.trim())) {
                if (matches && matches.length > 4) {
                    diagnosticData.filePath = matches[2];
                    diagnosticData.line = parseInt(matches[3]) - 1;
                    if(matches[4] !== undefined){
                        diagnosticData.charPosition = parseInt(matches[4].substr(1)) - 1;
                        let symbol = this.regexOffendPart.exec(error);
                        diagnosticData.offendingSymbol = symbol ? symbol[1] : null;
                    }
                    diagnosticData.problem = matches[1] + ": " + matches[3] + matches[4];
                    diagnosticData.problem = diagnosticData.problem.trim();
                    diagnosticData.diagnosticSeverity = DiagnosticSeverity.Error;
                }
            }
            else if (matches = this.regexWarningSuggest.exec(error.trim())) {
                if (matches = this.regexWarning.exec(error.trim())) {
                    if (matches && matches.length > 5) {
                        diagnosticData.filePath = matches[2];
                        diagnosticData.line = parseInt(matches[3]) - 1;
                        if(matches[4] !== undefined){
                            diagnosticData.charPosition = parseInt(matches[4].substr(1)) - 1;
                            let symbol = this.regexOffendPart.exec(error);
                            diagnosticData.offendingSymbol = symbol ? symbol[1] : null;
                        }
                        diagnosticData.problem = matches[1] + ": " + matches[5];
                        diagnosticData.problem = diagnosticData.problem.trim();
                        diagnosticData.diagnosticSeverity = DiagnosticSeverity.Warning;
                    }
                }
                else if (previousLine !== undefined) {
                    matches = this.regexWarningSuggest.exec(error.trim());
                    if (matches && matches.length > 2) {
                        diagnosticData.filePath = documentFilePath;
                        diagnosticData.problem = matches[1] + ": " + matches[2];
                        diagnosticData.diagnosticSeverity = DiagnosticSeverity.Information;
                    }
                }
            }
            if (matches = this.regexCannotFindModule.exec(error)) {
                if (matches && matches.length > 5) {
                    i = this.skipCannotFindModuleTrailingErrors(errors, i, matches[5]);
                }
            }

            if (diagnosticData.line !== undefined) {
                previousLine = diagnosticData.line;
            }
            else {
                diagnosticData.line = previousLine;
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
        Skips trailing errors following `Cannot find` errors.

        @param errors the array containing the errors
        @param i the index where the error is located
        @param notFoundModule the module not found
        @returns the index where the trailing errors end
    */
    skipCannotFindModuleTrailingErrors(errors, i, notFoundModule): number {
        let state = CannotFindModuleState.CannotFindModule;

        let regexFilesSearched = new RegExp(this.regexFilesSearchedSource.replace("notFoundModulePlaceHolder", notFoundModule));

        while (i < errors.length && state != CannotFindModuleState.End) {
            i++;
            let error = errors[i].trim();
            let matches = undefined;

            switch (state) {
                case CannotFindModuleState.CannotFindModule:
                    if (matches = this.regexSearchPathNotFound.exec(error)) {
                        state = CannotFindModuleState.SearchPathNotFound;
                    }
                    else if (matches = this.regexLookedIn.exec(error)) {
                        state = CannotFindModuleState.LookedIn;
                    }
                    else {
                        state = CannotFindModuleState.End;
                    }
                    break;

                case CannotFindModuleState.SearchPathNotFound:
                    if (matches = this.regexLookedIn.exec(error)) {
                        state = CannotFindModuleState.LookedIn;
                    }
                    else if (matches = regexFilesSearched.exec(error)) {
                        state = CannotFindModuleState.FilesSearched;
                    }
                    else {
                        state = CannotFindModuleState.End;
                    }
                    break;

                case (CannotFindModuleState.LookedIn):
                    if (matches = regexFilesSearched.exec(error)) {
                        state = CannotFindModuleState.FilesSearched;
                    }
                    else {
                        state = CannotFindModuleState.End;
                    }
                    break;

                case (CannotFindModuleState.FilesSearched):
                    if (!(matches = regexFilesSearched.exec(error))) {
                        state = CannotFindModuleState.End;
                    }
                    break;

                default:
                    state = CannotFindModuleState.End;
            }
        }

        if (state == CannotFindModuleState.End) {
            i--;
        }

        return i;
    }
}