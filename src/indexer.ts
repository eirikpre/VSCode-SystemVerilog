import {
    SymbolInformation,
    workspace,
    window,
    StatusBarItem,
    ProgressLocation,
    GlobPattern
} from 'vscode';
import { SystemVerilogParser } from './parser';

/**
 * This class is will do the backend indexation of files in the workspace.
 */
export class SystemVerilogIndexer {
    public symbols: Array<SymbolInformation>;
    public building: Boolean = false;
    public statusbar: StatusBarItem;
    public parser: SystemVerilogParser;
    public symbolsCount: number;
 
    public NUM_FILES: number = 250;
    public parallelProcessing: number = 50;
    public systemVerilogFileExtensions = ["sv", "v", "svh", "vh"];
    public globPattern: string = "**/*.{" + this.systemVerilogFileExtensions.join(",") + "}";
    public exclude: GlobPattern = undefined;

    private regex = new RegExp ([
        ,/(?<=^\s*(?:virtual\s+)?)/
        ,/(module|class|interface|package|program)\s+/
        ,/(?:automatic\s+)?/
        ,/(\w+)/
        ,/[\w\W.]*?/
        ,/(end\1)/
    ].map(x => x.source).join(''), 'mg');

    constructor(statusbar: StatusBarItem, parser: SystemVerilogParser) {
        this.statusbar = statusbar;
        this.parser = parser;
        const settings = workspace.getConfiguration();
        const exclude: GlobPattern = settings.get('systemverilog.excludeIndexing');
        const parallelProcessing: number = settings.get('systemverilog.parallelProcessing');
        if (settings.get('systemverilog.disableIndexing')) {
            this.statusbar.text = "SystemVerilog: Indexing disabled"
        } else {
            if (exclude != "insert globPattern here") {
                this.exclude = exclude;
            }
            if (parallelProcessing) {
                this.parallelProcessing = parallelProcessing;
            }
            console.time('build_index');
            this.build_index().then( _u => console.timeEnd('build_index') );
        }
    };


    /**
        Scans the workspace for SystemVerilog and Verilog files for symbols,
        and saves the symbols as SymbolInformation objects to this.symbols.

        @return status message when indexing is successful or failed with an error.
    */
   public async build_index(): Promise <any> {
        var cancelled = false;
        this.building = true;
        this.statusbar.text = "SystemVerilog: Indexing..";

        return await window.withProgress({
            location: ProgressLocation.Notification,
            title: "SystemVerilog Indexing...",
            cancellable: true
        }, async (_progress, token) => {
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
                            return this.parser.get_symbols(doc, this.regex)
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
                this.statusbar.text = "SystemVerilog: Indexing cancelled";
            } else {
                this.statusbar.text = 'SystemVerilog: ' + this.symbols.length + ' indexed objects'
            }
        });
    }

    /**
     * Builds the symbols index. Scans the workspace for symbols.
     */
    public rebuild() {
        if (!this.building) {
            let settings = workspace.getConfiguration();
            const exclude: GlobPattern = settings.get('systemverilog.excludeIndexing');
            const parallelProcessing: number = settings.get('systemverilog.parallelProcessing');
            if (exclude != "insert globPattern here") {
                this.exclude = exclude;
            }
            if (parallelProcessing) {
                this.parallelProcessing = parallelProcessing;
            }
            return this.build_index();
        }
    }

    public dispose() {
        delete this.symbols
    }
}