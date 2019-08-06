import { List } from 'collections/list';
import { SymbolKind, TextDocument, SymbolInformation, Location, Range, Uri } from "vscode";


// See test/SymbolKind_icons.png for an overview of the icons
export function getSymbolKind(name: String): SymbolKind {
    switch (name) {
        case 'parameter':
        case 'localparam': return SymbolKind.Constant;
        case 'package':
        case 'program':
        case 'import': return SymbolKind.Package;
        case 'wire':
        case 'reg':
        case 'logic':
        case 'int':
        case 'char':
        case 'float': return SymbolKind.Field;
        case 'string': return SymbolKind.String;
        case 'class': return SymbolKind.Class;
        case 'task': return SymbolKind.Method;
        case 'function': return SymbolKind.Function;
        case 'interface': return SymbolKind.Interface;
        case 'event': return SymbolKind.Event;
        case 'struct': return SymbolKind.Struct;
        case 'typedef': return SymbolKind.TypeParameter;
        case 'genvar': return SymbolKind.Operator;
        case 'module':
        default: return SymbolKind.Variable;
    }
    /* Unused/Free SymbolKind icons
        return SymbolKind.Number;
        return SymbolKind.Enum;
        return SymbolKind.EnumMember;
        return SymbolKind.Operator;
        return SymbolKind.Property;
        return SymbolKind.Array;
    */
}

export class SystemVerilogParser {
    private illegalMatches = /(?!return|begin|end|else|join|fork|for|if|virtual|static|automatic|generate|assign)/
    private comment = /(?:\/\/.*$)?/

    private r_decl_block: RegExp = new RegExp([
        /(?<=^\s*)/,
        /(?<type>module|program|interface|package|primitive|config)\s+/,
        // Mask automatic
        /(?:automatic\s+)?/,
        /(?<name>\w+)/,
        /(?<params>\s*#\s*\([\w\W]*?\))?/,
        /(?<ports>\s*\([\W\w]*?\))?/,
        /\s*;/,
        /(?<body>[\W\w]*?)/,
        /(?<end>end\1)/,
    ].map(x => x.source).join(''), 'mg');

    private r_decl_class: RegExp = new RegExp([
        /(?<=^\s*(virtual)?\s*)/,
        /(?<type>class)\s+/,
        /(?<name>\w+)/,
        /(\s+(extends|implements)\s+[\w\W]+?|\s*#\s*\([\w\W]+?\))*?/,
        /\s*;/,
        /(?<body>[\w\W]*?)/,
        /(?<end>endclass)/
    ].map(x => x.source).join(''), 'mg');

    private r_decl_method: RegExp = new RegExp([
        /(?<=^\s*(virtual|local|extern|pure\s+virtual)?\s*)/,
        /(?<type>(function|task))\s+/,
        /(?<return>[\w:\[\]\s*]+\s*)?/,
        /\b(?<name>\w+)/,
        /(?<ports>\s*\([\W\w]*?\))?/,
        /\s*;/,
        /(?<body>[\w\W]*?)/,
        /(?<end>end(function|task))/
    ].map(x => x.source).join(''), 'mg');

    private r_typedef: RegExp = new RegExp([
        /(?<=^\s*)/,
        /(?<type>typedef)\s+/,
        /(?<body>\w+(\s+|\s*{[\W\w]*?}\s*|))/,
        /(?<name>\w+)/,
        /\s*(?<end>;)/
    ].map(x => x.source).join(''), 'mg');

    private r_instantiation: RegExp = new RegExp([
        /(?<=^\s*)/,
        /(?:(?<modifier>virtual|static|automatic|rand|randc|pure virtual)\s+)?/,
        // Symbol type, ignore packed array
        this.illegalMatches,
        /\b(?<type>[:\w]+)(?:\s*\[.*?\])?\s*/,
        this.comment,
        /(?<params>#\s*\([\w\W]*?\))?\s*/,
        // Symbol name, ignore unpacked array
        this.illegalMatches,
        /\b(?<name>\w+)(?:\s*\[.*?\])*?\s*/,
        /(?<ports>\([\w\W]*?\))?\s*/,
        /\s*(?<end>;)/
    ].map(x => x.source).join(''), 'mg');

    public get_all_recursive(document: TextDocument, text: string, offset: number=0, parent?: string): SymbolInformation[] {
        let symbols: SymbolInformation[] = [];
        let sub_blocks: RegExpMatchArray[] = [];

        // Find blocks
        let regexes = [this.r_decl_block, this.r_decl_class, this.r_decl_method, this.r_typedef, this.r_instantiation];
        for (let i = 0; i < regexes.length; i++) {
            while(1) {
                let match: RegExpMatchArray = regexes[i].exec(text);
                if (match == null) {
                    break;
                } else if (match.index == 0 && parent != undefined) {
                    continue;
                } else if (sub_blocks.some( (b) => {return (match.index >= b.index && match.index < b.index + b[0].length)})) {
                    continue;
                }

                let symbolInfo = new SymbolInformation(
                    match.groups.name,
                    getSymbolKind(match.groups.type),
                    parent,
                    new Location(document.uri,
                        new Range(document.positionAt(match.index + offset),
                            document.positionAt(match.index + match[0].length + offset)
                        )))
                symbols.push(symbolInfo);

                if (match.groups.body) {
                    sub_blocks.push(match);
                }

                // TODO: Match parameter/port-lists
            }
            
        }
        for (const i in sub_blocks) {
            const match = sub_blocks[i];
            let sub = this.get_all_recursive(
                document,
                match.groups.body,
                match.index + offset + match[0].indexOf(match.groups.body),
                match.groups.name
            )
            symbols = symbols.concat(sub)
        }

        return symbols;
    };


    /**
        Matches the regex pattern with the document's text. If a match is found, it creates a `SymbolInformation` object.
        Add the objects to an empty list and return it.

        @param document The document in which the command was invoked.
        @param regex pattern that maps symbols, group(1) is the type, group(2) is the name
        @return A list of `SymbolInformation` objects or a thenable that resolves to such. The lack of a result can be
        signaled by returning `undefined`, `null`, or an empty list.
    */
    public get_symbols(document: TextDocument, regex: RegExp): Thenable<List<SymbolInformation>> {
        return new Promise((resolve) => {
            var symbols: List<SymbolInformation> = new List<SymbolInformation>();

            var match;
            let text = document.getText();

            /*
                Matches the regex and uses the index from the regex to find the position
            */
            do {
                match = regex.exec(text);
                if (match) {
                    let symbolInfo = new SymbolInformation(
                        match[2],
                        getSymbolKind(match[1]),
                        match[1],
                        new Location(document.uri,
                            new Range(document.positionAt(match.index),
                                document.positionAt(match.index + match[0].length)
                            )))
                    symbols.push(symbolInfo);
                }
            } while (match != null);

            resolve(symbols);
        });
    }

    /**
     * TODO
     * @param document
     * @param module
     */
    public get_ports(document: TextDocument, module: String): Thenable<List<SymbolInformation>> {

        return new Promise((resolve) => {
            resolve();
        });
    }

}