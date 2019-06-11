import {
    SymbolInformation,
    WorkspaceSymbolProvider,
    CancellationToken,
    workspace,
    window,
    StatusBarItem,
    ProgressLocation,
    GlobPattern
} from 'vscode';
import { SystemVerilogDocumentSymbolProvider } from './DocumentSymbolProvider';

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
            this.build_index().then(res => this.statusbar.text = res);
        }
    };

    public dispose() {
        delete this.symbols
    }

    /** 
        Queries a symbol from this.symbols, performs an exact match if exactMatch is set to true,
        and a partial match if it's not passed or set to false.

        @param query the symbol's name
        @param token the CancellationToken
        @param exactMatch whether to perform an exact or a partial match
        @return an array of matching SymbolInformation 
    */
    public provideWorkspaceSymbols(query: string, token: CancellationToken, exactMatch?: Boolean): Thenable <SymbolInformation[]> {
        return new Promise((resolve, reject) => {
            if (query.length === 0) { // Show maximum 250 files for speedup
                resolve(this.symbols.slice(0, 250))
            } else {
                const pattern = new RegExp(".*" + query.replace(" ", "").split("").map((c) => c).join(".*") + ".*", 'i');
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

    /**  
        Queries a module with a given name from this.symbols, performs an exact match if exactMatch is set to true,
        and a partial match if it's not passed or set to false.

        @param query the symbol's name
        @return the module's SymbolInformation
    */
    public provideWorkspaceModules(query: string): SymbolInformation {
        if (query.length === 0) {
            return undefined;
        } else {

            for (let i = 0; i < this.symbols.length; i++) {
                let symbol = this.symbols[i];
                if (symbol.name == query && symbol.containerName == "module") {
                    return symbol;
                }
            }
            return undefined;
        }
    }

    /**  
        Scans the workspace for SystemVerilog and Verilog files for symbols,
        and saves the symbols as SymbolInformation objects to this.symbols.

        @return status message when indexing is successful or failed with an error.
    */
    public async build_index(): Promise <any> {
        var cancelled = false;
        this.building = true;

        return await window.withProgress({
            location: ProgressLocation.Notification,
            title: "SystemVerilog Indexing...",
            cancellable: true
        }, async (progress, token) => {
            this.symbols = new Array <SymbolInformation> ();
            let uris = await Promise.resolve(workspace.findFiles('**/*.{sv,v,svh,vh}', this.exclude, undefined, token));

            for (var filenr = 0; filenr < uris.length; filenr += this.parallelProcessing) {
                let subset = uris.slice(filenr, filenr + this.parallelProcessing)
                if (token.isCancellationRequested) {
                    cancelled = true;
                    break;
                }
                await Promise.all(subset.map(uri => {
                    return new Promise(async (resolve) => {
                        resolve(workspace.openTextDocument(uri).then(doc => {
                            return this.docProvider.provideDocumentSymbols(doc, token, this.regex)
                        }))
                    }).catch(() => {
                        console.log("SystemVerilog: Indexing: Unable to process file: ", uri.toString());
                        return undefined
                    });
                })).then((symbols_arr: Array <SymbolInformation> ) => {
                    for (let i = 0; i < symbols_arr.length; i++) {
                        if (symbols_arr[i] !== undefined) {
                            this.symbols = this.symbols.concat(symbols_arr[i]);
                        }
                    }
                });
            }
        }).then(() => {
            this.building = false;
            if (cancelled) {
                return "SystemVerilog: Indexing cancelled";
            } else {
                return 'SystemVerilog: ' + this.symbols.length + ' indexed objects'
            }
        });
    }
}