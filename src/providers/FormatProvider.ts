import * as vscode from 'vscode';
import * as cp from 'child_process';
import { dirname } from 'path';

// prettier-ignore
export class SystemVerilogFormatProvider implements vscode.DocumentFormattingEditProvider, vscode.DocumentRangeFormattingEditProvider {
    private outputChannel: vscode.OutputChannel;

    private getWorkspaceFolder(): string | undefined {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active workspace selected.');
            return undefined;
        }

        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage('No workspaces available.');
            return undefined;
        }

        const currentDocumentUri = editor.document.uri;
        let workspacePath = vscode.workspace.getWorkspaceFolder(currentDocumentUri);
        if (!workspacePath) {
            const fallbackWorkspace = vscode.workspace.workspaceFolders[0];
            this.outputChannel.append(`${currentDocumentUri} is not found to be within a workspace, so the '${fallbackWorkspace.name}' workspace will be used for formatting settings.`); // eslint-disable-line no-console  
            workspacePath = fallbackWorkspace;
        }

        return workspacePath.uri.fsPath;
    }

    private getFormatCommand() {
        const config = vscode.workspace.getConfiguration('systemverilog');
        const execPath = config.get<string>('formatCommand');

        // Replace placeholders, if present
        return execPath
            .replace(/\${workspaceRoot}/g, this.getWorkspaceFolder())
            .replace(/\${workspaceFolder}/g, this.getWorkspaceFolder())
            .replace(/\${cwd}/, process.cwd())
            .replace(/\${env\.([^}]+)}/g, (_sub: string, envName: string) => process.env[envName]);
    }

    // Get range of document
    private textRange(document: vscode.TextDocument): vscode.Range {
        return new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end);
    }

    private applyEdits(document: vscode.TextDocument, result: string): Thenable<vscode.TextEdit[]> {
        return new Promise((resolve, _reject) => {
            resolve([vscode.TextEdit.replace(this.textRange(document), result)]);
        });
    }

    private doFormatDocument(
        document: vscode.TextDocument,
        range: vscode.Range,
        _options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): Thenable<vscode.TextEdit[]> {
        return new Promise((resolve, reject) => {
            const formatCommand = this.getFormatCommand();
            const codeContent = document.getText();

            const formatArgs = [];
            const userArgs = formatCommand.split(/\s+/);
            const executable = userArgs[0];
            if (userArgs.length > 1) {
                formatArgs.push(...userArgs.slice(1));
            }
            if (range) {
                const lines = [[range.start.line, range.end.line]];
                formatArgs.push(`--lines=${lines.map((lineRange) => lineRange.map((line) => line + 1).join('-')).join(',')}`);
            }
            formatArgs.push('-');

            let workingPath = this.getWorkspaceFolder();
            if (!document.isUntitled) {
                workingPath = dirname(document.fileName);
            }

            let stdout = '';
            let stderr = '';
            const child = cp.spawn(executable, formatArgs, { cwd: workingPath });
            child.stdin.end(codeContent);
            child.stdout.on('data', (chunk) => {
                stdout += chunk;
            });
            child.stderr.on('data', (chunk) => {
                stderr += chunk;
            });
            child.on('error', (err) => {
                if (err && (<any>err).code === 'ENOENT') {
                    vscode.window.showInformationMessage(`The '${formatCommand}' command is not available.`);
                    return resolve(null);
                }
                return reject(err);
            });
            child.on('close', (code) => {
                try {
                    if (stderr.length !== 0) {
                        this.outputChannel.show();
                        this.outputChannel.clear();
                        this.outputChannel.appendLine(stderr);
                        return reject(new Error('Cannot format due to syntax errors.'));
                    }

                    if (code !== 0) {
                        return reject();
                    }

                    return resolve(this.applyEdits(document, stdout));
                } catch (e) {
                    reject(e);
                }
            });

            if (token) {
                token.onCancellationRequested(() => {
                    child.kill();
                    reject(new Error('Cancelation requested.'));
                });
            }
        });
    }

    constructor(channel: vscode.OutputChannel) {
        this.outputChannel = channel;
    }

    public provideDocumentFormattingEdits(
        document: vscode.TextDocument,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): Thenable<vscode.TextEdit[]> {
        return this.doFormatDocument(document, null, options, token);
    }

    public provideDocumentRangeFormattingEdits(
        document: vscode.TextDocument,
        range: vscode.Range,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): Thenable<vscode.TextEdit[]> {
        return this.doFormatDocument(document, range, options, token);
    }

    public formatDocument(document: vscode.TextDocument): Thenable<vscode.TextEdit[]> {
        return this.doFormatDocument(document, null, null, null);
    }
}
