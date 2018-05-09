import { SymbolInformation, Location, Range, WorkspaceSymbolProvider, CancellationToken, workspace, Uri, window, StatusBarItem, ProgressLocation} from 'vscode';
import { getSymbolKind } from './DocumentSymbolProvider';

export class SystemVerilogWorkspaceSymbolProvider implements WorkspaceSymbolProvider {

    private regex = /^\s*(module|class|interface|package|program(?:\s+automatic)?)\s+(\w+)/;
    public symbols: SymbolInformation[];
    private building: Boolean = false;
    public statusbar: StatusBarItem;

    public NUM_FILES = 250;
    private THROTTLE_FILES = 100;


    constructor(statusbar: StatusBarItem) {
        this.statusbar = statusbar;
        this.symbols = new Array<SymbolInformation>();
        this.statusbar.text = "SystemVerilog: Indexing"
        this.build_index().then( res => this.statusbar.text = 'Systemverilog: '+res+ ' indexed objects');
    };
    public dispose() {
        delete this.symbols
    }

    public provideWorkspaceSymbols(query: string, token: CancellationToken): Thenable<SymbolInformation[]> {
        let results: SymbolInformation[] = [];
        let query_regex = new RegExp(query, 'i');
        return new Promise((resolve, reject) => {
            if (query == "") {
                resolve(this.symbols.slice(0, this.NUM_FILES))
            }
            else{
                this.symbols.forEach( symbol => {
                    if (symbol.name.match(query_regex)) {
                        results.push(symbol)
                    }
                    if (results.length > this.NUM_FILES) {
                        resolve(results)
                    }
                });
            }
            resolve(results);
        });
    }

    // TODO: Add progress bar:
    // https://github.com/Microsoft/vscode-extension-samples/blob/master/progress-sample/src/extension.ts
    public async build_index(): Promise<any> {
        window.showInformationMessage("SystemVerilog is indexing modules in the workspace");
        this.symbols = new Array<SymbolInformation>();
        let uris = await workspace.findFiles('**/*.sv').then( async uris => {
            return workspace.findFiles('**/*.v').then( veriloguris => {
                return uris.concat(veriloguris)
                })
            });
        for (var filenr = 0; filenr<uris.length; filenr+=this.THROTTLE_FILES) {
            let subset = uris.slice(filenr, filenr+this.THROTTLE_FILES)
            await Promise.all(subset.map( async (file) => {
                return this.provideSymbolsFromFile(file);
            }));
        }
        return this.symbols.length;
        
    }

    private async provideSymbolsFromFile(uri: Uri): Promise<any> {
        return new Promise( (resolve, reject) => {
            workspace.openTextDocument(uri).then( doc => {
                for (let linenr = 0; linenr<doc.lineCount; linenr++) {
                    let line = doc.lineAt(linenr);
                    let match = this.regex.exec(line.text);
                    if (match) {
                        this.symbols.push( new SymbolInformation(
                            match[2], getSymbolKind(match[1]), doc.fileName,
                            new Location(doc.uri,
                                new Range(
                                    linenr, line.text.indexOf(match[2]),
                                    linenr, line.text.indexOf(match[2])+match[2].length))));
                    }
                }
                resolve();
            }, err => {
                console.log("SystemVerilog: Indexing: Unable to open file: ", uri.toString());
                resolve();
            });
        });
    }
}
