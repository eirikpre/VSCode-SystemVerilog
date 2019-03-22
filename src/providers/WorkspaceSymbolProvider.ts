import { SymbolInformation, Location, Range, WorkspaceSymbolProvider, CancellationToken, workspace, Uri, window, StatusBarItem, ProgressLocation, GlobPattern} from 'vscode';
import { getSymbolKind, SystemVerilogDocumentSymbolProvider } from './DocumentSymbolProvider';
import { rejects } from 'assert';

export class SystemVerilogWorkspaceSymbolProvider implements WorkspaceSymbolProvider {

    public symbols: SymbolInformation[];
    public building: Boolean = false;
    public statusbar: StatusBarItem;
    public docProvider: SystemVerilogDocumentSymbolProvider;
    
    public NUM_FILES: number = 250;
    public parallelProcessing: number = 50;
    public exclude: GlobPattern = undefined;
    
    private regex = new RegExp ([
        ,/(?<=^\s*(?:virtual\s+)?)/
        ,/(module|class|interface|package|program)\s+/
        ,/(?:automatic\s+)?/
        ,/(\w+)/
        ,/[\w\W.]*?/
        ,/(end\1)/
    ].map(x => x.source).join(''), 'mg');

    constructor(statusbar: StatusBarItem, docProvider: SystemVerilogDocumentSymbolProvider,
                disabled?: Boolean, exclude?: GlobPattern, parallelProcessing?: number) {
        this.statusbar = statusbar;
        this.docProvider = docProvider;
        if (disabled) {
            this.statusbar.text = "SystemVerilog: Indexing disabled"
        } else {
            if (exclude != "insert globPattern here") {
                this.exclude = exclude;
            }
            if (parallelProcessing) {
                this.parallelProcessing = parallelProcessing;
            }
            this.statusbar.text = "SystemVerilog: Indexing";
            this.build_index().then( res => this.statusbar.text = res );
        }
    };

    public dispose() {
        delete this.symbols
    }

    public provideWorkspaceSymbols(query: string, token: CancellationToken, exactMatch?: Boolean): Thenable<SymbolInformation[]> {
        return new Promise( (resolve, reject) => {
            if (query.length === 0) { // Show maximum 250 files for speedup
                resolve(this.symbols.slice(0, 250))
            } else {
                const pattern =  new RegExp (".*" + query.split("").map((c) => c).join(".*") + ".*", 'i');
                let results: SymbolInformation[] = [];

                for (let i = 0; i < this.symbols.length; i++) {
                    let s = this.symbols[i];
                    if (exactMatch === true) {
                        if (s.name == query) {
                            results.push(s);
                        }
                    } else if (s.name.match(pattern)) {
                        results.push(s)
                    }
                }
                resolve(results);
            }
        });
    }

    public async build_index(): Promise<any> {
        var cancelled = false;
        this.building = true;

        return await window.withProgress({
            location: ProgressLocation.Notification,
            title: "SystemVerilog Indexing",
            cancellable: true
        }, async (progress, token) => {
            this.symbols = new Array<SymbolInformation>();
            let uris = await Promise.resolve(workspace.findFiles('**/*.{sv,v,svh,vh}', this.exclude, undefined, token));

            for (var filenr = 0; filenr<uris.length; filenr+=this.parallelProcessing) {
                let subset = uris.slice(filenr, filenr+this.parallelProcessing)
                if (token.isCancellationRequested) {
                    cancelled = true;
                    break;
                }
                await Promise.all(subset.map( uri => {
                    return new Promise( async (resolve) => {
                        resolve(workspace.openTextDocument(uri).then( doc => {
                            return this.docProvider.provideDocumentSymbols(doc, token, this.regex)
                        }))
                    }).catch( () => {
                        console.log("SystemVerilog: Indexing: Unable to process file: ", uri.toString());
                        return undefined
                    });
                })).then( symbols_arr => {
                    for (let i = 0; i < symbols_arr.length; i++) {
                        if (symbols_arr[i] !== undefined) {
                            this.symbols = this.symbols.concat(symbols_arr[i]);
                        }
                    }
                });
            }
        }).then( () => {
            this.building = false;
            if (cancelled) {
                return "SystemVerilog: Indexing cancelled";
            } else {
                return 'Systemverilog: '+this.symbols.length+ ' indexed objects'
            }
        });
    }
}
