import { SymbolInformation, Location, Range, WorkspaceSymbolProvider, CancellationToken, workspace, StatusBarItem } from 'vscode';
import { getSymbolKind } from './DocumentSymbolProvider';

export class SystemVerilogWorkspaceSymbolProvider implements WorkspaceSymbolProvider {

    private regex = /^\s*(module|class|interface|package|program(?:\s+automatic)?)\s+(\w+)/;
    public symbols: SymbolInformation[];
    private building: Boolean = false;

    public NUM_FILES = 250;

    constructor(statusBar: StatusBarItem) {        
        this.symbols = new Array<SymbolInformation>();
        this.build_index(statusBar).then( str => {
            statusBar.text = "SystemVerilog: " + str;
        });
    };

    public provideWorkspaceSymbols(query: string, token: CancellationToken): Thenable<SymbolInformation[]> {
        let results: SymbolInformation[] = [];
        let query_regex = new RegExp(query, 'i');
        return new Promise((resolve, reject) => {
            this.symbols.forEach( symbol => {
                if (symbol.name.match(query_regex)) {
                    results.push(symbol)
                }
                if (results.length > this.NUM_FILES) {
                    resolve(results)
                }
            });
            resolve(results);
        });
    }

    public async build_index(statusBar): Promise<any> {
        return new Promise( async (resolve, reject) => {
            if (this.building) {
                
                reject()
                
            } else {
                statusBar.text = "SystemVerilog: Indexing modules in workspace"
                this.symbols = new Array<SymbolInformation>();
                this.building = true;
                workspace.findFiles('**/*.sv').then( async uris => {
                    let promises = uris.map( uri => {
                        return workspace.openTextDocument(uri).then( document => {
                            for (let i = 0; i < document.lineCount; i++) {
                                let line = document.lineAt(i);
                                let match = this.regex.exec(line.text);
                                if (match) {
                                    this.symbols.push( new SymbolInformation(
                                        match[2], getSymbolKind(match[1]), document.fileName,
                                        new Location(document.uri,
                                            new Range(
                                                i, line.text.indexOf(match[2]),
                                                i, line.text.indexOf(match[2])+match[2].length))));
                                }
                            }
                        })
                    });
                    Promise.all(promises).then( a => {
                        statusBar.text  = "Index buildt: " + this.symbols.length + " modules"
                        this.building = false;
                        return statusBar.text
                    }).then( str =>
                        resolve(str)
                    );
                });
            }
        });
    }

    public dispose() {
        delete this.symbols
    }
}