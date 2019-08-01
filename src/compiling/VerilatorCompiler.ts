import {
    Position,
    Range,
    DiagnosticSeverity,
    Diagnostic,
    TextDocument
} from "vscode-languageserver";
import * as child from 'child_process';
import * as path from 'path';
import { isSystemVerilogDocument, isVerilogDocument } from '../utils/server';
import { getPathFromUri } from '../utils/common';
import { DocumentCompiler } from './DocumentCompiler';

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

/** Defines the information needed to create a `Diagnostic` object. */
class DiagnosticData {
    line: number;
    problem: string;
    diagnosticSeverity: DiagnosticSeverity;
    filePath: string;
}

/** 
    Checks if `diagnosticData`'s fields are not `undefined`

    @param diagnosticData the DiagnosticData
    @return true if at least one field is `undefined`
*/
function isDiagnosticDataUndefined(diagnosticData: DiagnosticData): boolean {
    if (diagnosticData.line === undefined || diagnosticData.problem === undefined ||
        diagnosticData.diagnosticSeverity === undefined || diagnosticData.filePath === undefined) {
        return true;
    }

    return false;
}

/**
 * Verilator Compiler class contains functionality for compiling SystemVerilog/Verilog files using Verilator simulator.
 * Generates and takes in predefined runtime arguments,
 * and eventually parses the errors/warnings in `stderr` into `Diagnostic` array mapped to each unique document's uri.
*/
export class VerilatorCompiler extends DocumentCompiler {
    //Regex expressions
    regexError = new RegExp("%Error: (.*):([0-9]+):(.*)");
    regexErrorWarning = new RegExp("%Error-(.*): (.*):([0-9]+):(.*)");
    regexWarning = new RegExp("%Warning-(.*): (.*):([0-9]+):(.*)");
    regexWarningSuggest = new RegExp("%Warning-(.*): (.*)");
    regexCannotFindModule = new RegExp("%Error: (.*):([0-9]+): Cannot find(.*): (.*)");
    regexSearchPathNotFound = new RegExp("%Error: (.*):([0-9]+): This may be because there's no search path specified with -I<dir>.");
    regexLookedIn = new RegExp("%Error: (.*):([0-9]+): Looked in:");
    regexFilesSearchedSource = "%Error: (.*):([0-9]+):       (.*)notFoundModulePlaceHolder(.v|.sv|.vh|.svh|)$";

    /**
        Compiles the given `document`, builds the runtime arguments using on the pre defined settings,
        and adds each `Diagnostic` to an array mapped to the referred document's uri.

        @param document the document to compile
        @returns a `Thenable` map of entries mapping each uri to a `Diagnostic` array
    */
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

            let diagnosticCollection: Map<string, Diagnostic[]> = new Map();

            var filePath = getPathFromUri(document.uri);

            var args = [];

            if (this.configurations.has(this.compilerConfigurationsKeys[0])) {
                args.push(this.configurations.get(this.compilerConfigurationsKeys[0]));
            }
            else {
                reject("'" + this.compilerConfigurationsKeys[0] + "' configuration is undefined.");
                return;
            }


            args.push(filePath);

            this.connection.console.log(args.join(" "));

            child.exec(args.join(" "), (error, stdout, stderr) => {
                this.connection.console.log(stderr);
                this.parseDiagnostics(stderr, document, filePath, diagnosticCollection);
                resolve(diagnosticCollection);
            });
        });
    }

    /**
        Parses `stderr` into `Diagnostics` that are added to `collection` 
        by mapping the `Diagnostic` to the document's uri.

        @param stderr the error output to parse
        @param compiledDocument the compiled document
        @param documentFilePath the `document`'s file path
        @param collection the collection to add the Diagnostics to
        @returns a map of entries mapping each uri to a `Diagnostic` array
    */
    parseDiagnostics(stderr: string, compiledDocument: TextDocument, documentFilePath: string, collection: Map<string, Diagnostic[]>): void {
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
                if (matches && matches.length > 3) {
                    diagnosticData.filePath = matches[1];
                    diagnosticData.line = parseInt(matches[2]) - 1;
                    diagnosticData.problem = matches[3].trim();
                    diagnosticData.diagnosticSeverity = DiagnosticSeverity.Error;
                }
            }
            else if (matches = this.regexErrorWarning.exec(error.trim())) {
                if (matches && matches.length > 4) {
                    diagnosticData.filePath = matches[2];
                    diagnosticData.line = parseInt(matches[3]) - 1;
                    diagnosticData.problem = matches[1] + ": " + matches[3];
                    diagnosticData.problem = diagnosticData.problem.trim();
                    diagnosticData.diagnosticSeverity = DiagnosticSeverity.Error;
                }
            }
            else if (matches = this.regexWarningSuggest.exec(error.trim())) {
                if (matches = this.regexWarning.exec(error.trim())) {
                    if (matches && matches.length > 4) {
                        diagnosticData.filePath = matches[2];
                        diagnosticData.line = parseInt(matches[3]) - 1;
                        diagnosticData.problem = matches[1] + ": " + matches[4];
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
                if (matches && matches.length > 4) {
                    i = this.skipCannotFindModuleTrailingErrors(errors, i, matches[4]);
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
        Gets the `range` of a line given the line number

        @param line the line number
        @return the line's range
    */
    getLineRange(line: number): Range {
        return Range.create(Position.create(line, 0), Position.create(line, Number.MAX_VALUE));
    }

    /**
        Publishes a given `Diagnostic` to a document specified by a `filePath`.
        It resets the Diagnostics array for the document if `resetDiagnostics` is `true`.

        @param document the compiled document
        @param resetDiagnostics whether to reset the diagnostics or not
        @param diagnosticData the DiagnosticData
        @param collection the collection to add the Diagnostics too
        @returns a message if an error occurred.
    */
    publishDiagnosticForDocument(compiledDocument: TextDocument, resetDiagnostics: boolean, diagnosticData: DiagnosticData, collection: Map<string, Diagnostic[]>): void {
        let diagnostic: Diagnostic = undefined;
        let diagnostics = undefined;

        if (diagnosticData.filePath.localeCompare(getPathFromUri(compiledDocument.uri)) === 0) {
            //set `diagnostic`'s range
            let range: Range = this.getLineRange(diagnosticData.line);

            diagnostic = {
                severity: diagnosticData.diagnosticSeverity,
                range: range,
                message: diagnosticData.problem,
                source: 'systemverilog'
            };

            if (!resetDiagnostics && collection.has(compiledDocument.uri)) {
                diagnostics = collection.get(compiledDocument.uri).concat([diagnostic]);
            }
            else {
                diagnostics = [diagnostic];
            }

            collection.set(compiledDocument.uri, diagnostics);
        }
        else {
            let filteredUris = this.filterDocumentsUris(diagnosticData.filePath);

            if (filteredUris.length == 1) {
                let uri = filteredUris[0];

                let document: TextDocument = this.documents.get(uri);

                let range: Range = this.getLineRange(diagnosticData.line);
                diagnostic = {
                    severity: diagnosticData.diagnosticSeverity,
                    range: range,
                    message: diagnosticData.problem,
                    source: 'systemverilog'
                };

                if (!resetDiagnostics && collection.has(uri)) {
                    diagnostics = collection.get(uri).concat([diagnostic]);
                }
                else {
                    diagnostics = [diagnostic];
                }

                collection.set(uri, diagnostics);
            }
        }

    }

    /**
        Filters the keys for `documents` by comparing the basename of each key with the basename of a given `filePath`

        @param filePath the filePath to compare too
        @returns the array of filtered keys
    */
    filterDocumentsUris(filePath: string): string[] {
        return this.documents.keys().filter(function (key: string) {
            if (path.basename(key.trim()).localeCompare(path.basename(filePath.trim())) === 0) {
                return true;
            }
            return false;
        });
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