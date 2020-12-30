import * as vscode from 'vscode';
import cp = require('child_process');
import path = require('path');

export class SystemVerilogFormatProvider
  implements vscode.DocumentFormattingEditProvider, vscode.DocumentRangeFormattingEditProvider {
  private outputChannel: vscode.OutputChannel;

  // Get range of document
  private textRange(document: vscode.TextDocument): vscode.Range {
    return new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end);
  }

  // Format file
  private format(
    filePath: string,
    documentText: string,
    lines: Array<Array<number>> = [],
    inPlace: boolean = false
  ): string {
    let params = [];
    if (lines.length > 0)
      params.push('--lines ' + lines.map((range) => range.map((line) => line + 1).join('-')).join(','));
    if (inPlace) params.push('--inplace');
    let runLocation = path.dirname(filePath);
    let command = [path.join('verible-verilog-format'), ...params, '-'].join(' ');
    let output = cp.execSync(command, {
      cwd: runLocation,
      input: documentText,
    });
    return output.toString();
  }

  private getEdits(document: vscode.TextDocument, codeContent: string): Thenable<vscode.TextEdit[]> {
    return new Promise((resolve, reject) => {
      resolve([vscode.TextEdit.replace(this.textRange(document), codeContent)]);
    });
  }

  private getFormatCommand() {
    let config = vscode.workspace.getConfiguration('systemverilog');
    let execPath = config.get<string>('formatCommand');

    // replace placeholders, if present
    return execPath
      .replace(/\${workspaceRoot}/g, vscode.workspace.rootPath)
      .replace(/\${workspaceFolder}/g, this.getWorkspaceFolder())
      .replace(/\${cwd}/, process.cwd())
      .replace(/\${env\.([^}]+)}/g, (_sub: string, envName: string) => {
        return process.env[envName];
      });
  }

  private getWorkspaceFolder(): string | undefined {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage(
        'Unable to get the location of SystemVerilog format executable - no active workspace selected'
      );
      return undefined;
    }

    if (!vscode.workspace.workspaceFolders) {
      vscode.window.showErrorMessage(
        'Unable to get the location of SystemVerilog format executable - no workspaces available'
      );
      return undefined;
    }

    const currentDocumentUri = editor.document.uri;
    let workspacePath = vscode.workspace.getWorkspaceFolder(currentDocumentUri);
    if (!workspacePath) {
      const fallbackWorkspace = vscode.workspace.workspaceFolders[0];
      vscode.window.showWarningMessage(
        `Unable to deduce the location of SystemVerilog format executable for file outside the workspace - expanding \${workspaceFolder} to '${fallbackWorkspace.name}' path`
      );
      workspacePath = fallbackWorkspace;
    }
    return workspacePath.uri.path;
  }

  private doFormatDocument(
    document: vscode.TextDocument,
    range: vscode.Range,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): Thenable<vscode.TextEdit[]> {
    return new Promise((resolve, reject) => {
      let formatCommand = this.getFormatCommand();
      let codeContent = document.getText();

      let formatArgs = [];
      if (range) {
        let lines = [[range.start.line, range.end.line]];
        formatArgs.push('--lines ' + lines.map((range) => range.map((line) => line + 1).join('-')).join(','));
      }
      formatArgs.push('-');

      let workingPath = vscode.workspace.rootPath;
      if (!document.isUntitled) {
        workingPath = path.dirname(document.fileName);
      }

      let stdout = '';
      let stderr = '';
      let child = cp.spawn(formatCommand, formatArgs, { cwd: workingPath });
      child.stdin.end(codeContent);
      child.stdout.on('data', (chunk) => (stdout += chunk));
      child.stderr.on('data', (chunk) => (stderr += chunk));
      child.on('error', (err) => {
        if (err && (<any>err).code === 'ENOENT') {
          vscode.window.showInformationMessage(
            "The '" +
              formatCommand +
              "' command is not available.  Please check your clang-format.executable user setting and ensure it is installed."
          );
          return resolve(null);
        }
        return reject(err);
      });
      child.on('close', (code) => {
        try {
          if (stderr.length != 0) {
            this.outputChannel.show();
            this.outputChannel.clear();
            this.outputChannel.appendLine(stderr);
            return reject('Cannot format due to syntax errors.');
          }

          if (code != 0) {
            return reject();
          }

          return resolve(this.getEdits(document, codeContent));
        } catch (e) {
          reject(e);
        }
      });

      if (token) {
        token.onCancellationRequested(() => {
          child.kill();
          reject('Cancelation requested');
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
