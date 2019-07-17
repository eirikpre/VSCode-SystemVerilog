import { window, ProgressLocation, OutputChannel, DiagnosticCollection, languages } from 'vscode';
import { DocumentCompiler } from "./DocumentCompiler";
import { VerilatorCompiler } from "./VerilatorCompiler";


/* defines supported simulators/compilers */
export enum compilerType {
    Verilator = 1
};

/* SystemVerilog Compiler handles functionality for compiling documents using supported simulators. */
export class SystemVerilogCompiler {
    public diagnosticCollection: DiagnosticCollection;
    compiler: DocumentCompiler;
    outputChannel: OutputChannel;

    constructor(channel: OutputChannel) {
        this.diagnosticCollection = languages.createDiagnosticCollection();
        this.outputChannel = channel;
    }

    /**
        Compiles the document opened in the editorusing the compiler/simulator specified by `type`

        @returns a message if an error occurred.
    */
    public async compileOpenedDocument(type: compilerType) {
        if (type == compilerType.Verilator) {
            this.compiler = new VerilatorCompiler(this.diagnosticCollection, this.outputChannel);
        }
        else {
            this.outputChannel.appendLine("Invalid compiler type.");
            return;
        }

        Promise.resolve(await window.withProgress({
            location: ProgressLocation.Notification,
            title: "SystemVerilog Document compiling...",
            cancellable: true
        }, async (_progress, token) => {
            this.compiler.compile().then((error: string) => {
                window.showErrorMessage(error);
            });
        })).catch((error) => {
            this.outputChannel.appendLine(error);
            window.showErrorMessage(error);
        });
    }
}