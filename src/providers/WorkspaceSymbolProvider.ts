import { SymbolInformation, Location, Range, WorkspaceSymbolProvider, CancellationToken, workspace } from 'vscode';
import { getSymbolKind } from './DocumentSymbolProvider';

export class SystemVerilogWorkspaceSymbolProvider implements WorkspaceSymbolProvider {

    private regex = /^\s*(module|program|class|interface)(?:\s+automatic)?\s+(\w+)/;
    private symbols: SymbolInformation[] = [];
    private building: Boolean = false;

    public NUM_FILES = 250;

    constructor() {
        this.build_index().then( str => {
            console.log(str);
            this.building = false;
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

    public async build_index(): Promise<any> {
        console.log("Building index started")
        this.symbols = [];
        this.building = true;
        let scanned = 0;
        return new Promise( async (resolve, reject) => {
            
            // TODO: Make this into a Promise array
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
                // Only process 1k files at a time
                Promise.all(promises).then( a => 
                    resolve("Index buildt: length = " + this.symbols.length)
                )

            });
        });
    }
}