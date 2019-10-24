import { DiagnosticSeverity } from "vscode-languageserver";

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