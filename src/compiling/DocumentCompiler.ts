import {
    Connection,
    Diagnostic,
    TextDocument,
    TextDocuments,
    Range,
    Position,
    DiagnosticSeverity
} from "vscode-languageserver";
import * as path from 'path';
import * as child from 'child_process';
import { getPathFromUri } from '../utils/common';
import { isSystemVerilogDocument, isVerilogDocument } from '../utils/server';

/** Defines the information needed to create a `Diagnostic` object. */
export class DiagnosticData {
    line: number;
    problem: string;
    diagnosticSeverity: DiagnosticSeverity;
    filePath: string;
    offendingSymbol: string;
    charPosition: number;
}

/** 
    Checks if `diagnosticData`'s fields are not `undefined`

    @param diagnosticData the DiagnosticData
    @return true if at least one field is `undefined`
*/
export function isDiagnosticDataUndefined(diagnosticData: DiagnosticData): boolean {
    if (diagnosticData.line === undefined || diagnosticData.problem === undefined ||
        diagnosticData.diagnosticSeverity === undefined || diagnosticData.filePath === undefined) {
        return true;
    }

    return false;
}

/* 
    DocumentCompiler is an abstract class that defines the common behavior of Document compilers.
*/
export abstract class DocumentCompiler {
    public connection: Connection;
    public documents: TextDocuments;
    public workspaceRootPath: string;
    public configurations: Map<string, any>;
    public compilerConfigurationsKeys: string[]

    constructor(connection: Connection, documents: TextDocuments, workspaceRootPath: string, configurations: Map<string, any>, compilerConfigurationsKeys: string[]) {
        this.connection = connection;
        this.documents = documents;
        this.workspaceRootPath = workspaceRootPath;
        this.configurations = configurations;
        this.compilerConfigurationsKeys = compilerConfigurationsKeys;
    }



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

            var filePath = getPathFromUri(document.uri, this.workspaceRootPath);

            var args = [];

            if (this.configurations.has(this.compilerConfigurationsKeys[2])) {
                args.push(this.configurations.get(this.compilerConfigurationsKeys[2]));
            }
            else {
                reject("'" + this.compilerConfigurationsKeys[2] + "' configuration is undefined.");
                return;
            }


            args.push(filePath);

            this.connection.console.log(args.join(" "));

            child.exec(args.join(" "), (error, stdout, stderr) => {
                this.connection.console.log(stdout);
                this.connection.console.log(stderr);
                this.parseDiagnostics(error, stdout, stderr, document, filePath, diagnosticCollection);
                resolve(diagnosticCollection);
            });
        });
    }

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
    public abstract parseDiagnostics(error: child.ExecException, stdout: string, stderr: string, compiledDocument: TextDocument, documentFilePath: string, collection: Map<string, Diagnostic[]>): void;

    /** 
        Gets the `range` of a line given the line number

        @param line the line number
        @return the line's range
    */
    getLineRange(line: number, offendingSymbol: string, startPosition: number): Range {
        let endPosition: number;
        if (startPosition == null && offendingSymbol == null) {
            startPosition = 0;
            endPosition = Number.MAX_VALUE;
        } else {
            endPosition = startPosition + offendingSymbol.length;
        }
        return Range.create(Position.create(line, startPosition), Position.create(line, (endPosition)));
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

        if (diagnosticData.filePath.localeCompare(getPathFromUri(compiledDocument.uri, this.workspaceRootPath)) === 0) {
            //set `diagnostic`'s range
            let range: Range = this.getLineRange(diagnosticData.line, diagnosticData.offendingSymbol, diagnosticData.charPosition);

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

                let range: Range = this.getLineRange(diagnosticData.line, diagnosticData.offendingSymbol, diagnosticData.charPosition);
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
        Converts a given string `severity` into enum type `DiagnosticSeverity`

        @param severity the severity
        @returns the converted `DiagnosticSeverity`
    */
    getDiagnosticSeverity(severity: string): DiagnosticSeverity {
        severity = severity.trim();

        if (severity == "Error") {
            return DiagnosticSeverity.Error;
        }
        else if (severity == "Warning") {
            return DiagnosticSeverity.Warning;
        }
        else {
            return DiagnosticSeverity.Information;
        }
    }
}