import { TextDocument, Location, Range } from "vscode";
import { SystemVerilogSymbol } from "./symbol";


export class SystemVerilogParser {
    private illegalMatches = /(?!return|begin|end|else|join|fork|for|if|virtual|static|automatic|generate|assign|initial|assert|disable)/
    private comment = /(?:\/\/.*$)?/

    private r_decl_block: RegExp = new RegExp([
        "(?<=^\\s*",
        /(?<type>module|program|interface|package|primitive|config|property)\s+/,
        // Mask automatic
        /(?:automatic\s+)?/,
        ")",
        /(?<name>\w+)/,
        /(?<params>\s*#\s*\([\w\W]*?\))?/,
        /(?<ports>\s*\([\W\w]*?\))?/,
        /\s*;/,
        /(?<body>[\W\w]*?)/,
        /(?<end>end\1)/,
    ].map(x => (typeof x === 'string') ?  x : x.source).join(''), 'mg');

    private r_decl_class: RegExp = new RegExp([
        "(?<=^\\s*(virtual\\s+)?",
        /(?<type>class)\s+/,
        ")",
        /(?<name>\w+)/,
        /(\s+(extends|implements)\s+[\w\W]+?|\s*#\s*\([\w\W]+?\))*?/,
        /\s*;/,
        /(?<body>[\w\W]*?)/,
        /(?<end>endclass)/
    ].map(x => (typeof x === 'string') ?  x : x.source).join(''), 'mg');

    private r_decl_method: RegExp = new RegExp([
        "(?<=^\\s*(virtual|local|extern|pure\\s+virtual)?\\s*",
        /(?<type>(function|task))\s+/,
        /(?<return>[\w:\[\]\s*]+\s*)?/,
        ")",
        /\b(?<name>[\w\.]+)\b\s*/,
        /(?<ports>\([\W\w]*?\))?/,
        /\s*;/,
        /(?<body>[\w\W]*?)/,
        /(?<end>end(function|task))/
    ].map(x => (typeof x === 'string') ?  x : x.source).join(''), 'mg');

    private r_typedef: RegExp = new RegExp([
        /(?<=^\s*)/,
        /(?<type>typedef)\s+/,
        /(?<body>[^;]*)/,
        /(?<name>\b\w+)/,
        /\s*(\[[^;]*?\])*?/,
        /\s*(?<end>;)/
    ].map(x => x.source).join(''), 'mg');

    private r_instantiation: RegExp = new RegExp([
        "(?<=^\\s*",
        /(?:(?<modifier>virtual|static|automatic|rand|randc|pure virtual)\s+)?/,
        // Symbol type, ignore packed array
        this.illegalMatches,
        /\b(?<type>[:\w]+(?:\s*\[[^\]]*?\])*?)\s*/,
        this.comment,
        /(?<params>#\s*\([\w\W]*?\))?\s*/,
        // Allow multiple declaration
        /(\b\w+\s*,\s*)*?/,
        ")",
        this.illegalMatches,
        // Symbol name
        /\b(?<name>\w+)\s*/,
        // Unpacked array | Ports
        /(?:(\[[^\]]*?\]\s*)*?|(\([\w\W]*?\))?)\s*/,
        /\s*(?<end>;|,|=)/
    ].map(x => (typeof x === 'string') ?  x : x.source).join(''), 'mg');
    
    private r_assert: RegExp = new RegExp([
        /(?<=^\s*(?<name>\w+)\s*:\s*)/,
        /(?<type>assert\b)/
    ].map(x => (typeof x === 'string') ?  x : x.source).join(''), 'mg');

    private r_define: RegExp = new RegExp([
        /(?<=^\s*)/,
        /`(?<type>define)\s+/,
        /(?<name>\w+)\b/,
        /((?<ports>\([^\n]*\))|\s*?)/,
        /(?<body>([^\n]*\\\n)*([^\n]*))/,
        /(?<!\\)(?=\n)/
    ].map(x => x.source).join(''), 'mg');

    private r_label: RegExp = new RegExp([
        /\b(?<type>begin)\b/,
        /\s*:\s*/,
        /(?<name>\w+)\s*(?:\/\/.*)?$/,
        // Matches up to 5 nested begin/ends
        // This is the only way to do it with RegExp without balancing groups
        /(?<body>(?:\bbegin\b(?:\bbegin\b(?:\bbegin\b(?:\bbegin\b(?:\bbegin\b[\w\W]+?\bend\b|[\w\W])+?\bend\b|[\w\W])+?\bend\b|[\w\W])+?\bend\b|[\w\W])+?\bend\b|[\w\W])+?)/,
        /\bend\b(\s*:\s*\1)?/
    ].map(x => x.source).join(''), 'mg');

    private r_ports: RegExp = new RegExp([
        /(?<!^(?:\/\/|`|\n).*?)/,
        "(?<=",
        /(?:\b(?:input|output|inout)\b)\s*/,
        /(?<type>(?:`?\w+)?\s*(\[.*?\])*?)?\s*/,
        // Allow multiple declaration
        /(\b\w+\s*,\s*)*?/,
        ")",
        /(?<name>\b\w+\b)/,
        // Has to be followed by , or )
        /(?=\s*((\[.*?\]\s*)*?|\/\/[^\n]*\s*)(?:,|\)))/
    ].map(x => (typeof x === 'string') ?  x : x.source).join(''), 'mg');

    private r_block_fast = new RegExp([
        , /(?<=^\s*(?:virtual\s+)?)/
        , /(?<type>module|class|interface|package|program)\s+/
        , /(?:automatic\s+)?/
        , /(?<name>\w+)/
        , /[\w\W.]*?/
        , /(end\1)/
    ].map(x => x.source).join(''), 'mg');

    public readonly full_parse = [
        this.r_decl_block,
        this.r_decl_class,
        this.r_decl_method,
        this.r_typedef,
        this.r_define,
        this.r_label,
        this.r_instantiation,
        this.r_assert
    ];

    public readonly declaration_parse = [
        this.r_decl_block,
        this.r_decl_class,
        this.r_decl_method,
        this.r_typedef,
        this.r_define
    ];

    public readonly fast_parse = [
        this.r_block_fast
    ];

    /**
        Matches the regex pattern with the document's text. If a match is found, it creates a `SystemVerilogSymbol` object.
        Add the objects to an empty list and return it.

        @param document The document in which the command was invoked.
        @param precision How much the parser will look for, must be "full", "declaration" or "fast"
        @param maxDepth How many deep it will traverse the hierarchy
        @return A list of `SystemVerilogSymbol` objects or a thenable that resolves to such. The lack of a result can be
        signaled by returning `undefined`, `null`, or an empty list.
    */
    public get_all_recursive(document: TextDocument, precision: string="full", maxDepth: number=-1,
                             text?: string, offset: number=0, parent?: string, depth: number=0): Array<SystemVerilogSymbol> {
        let symbols: Array<SystemVerilogSymbol> = [];
        let sub_blocks: Array<RegExpMatchArray> = [];

        if (!text) {
            text = document.getText();
        }

        let regexes = this.translate_precision(precision);

        // Find blocks
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

                let symbolInfo = new SystemVerilogSymbol(
                    match.groups.name,
                    match.groups.type,
                    parent,
                    new Location(document.uri,
                        new Range(document.positionAt(match.index + offset),
                            document.positionAt(match.index + match[0].length + offset)
                        )))
                symbols.push(symbolInfo);

                if (match.groups.ports && precision == 'full') {
                    this.get_ports(
                        document,
                        match.groups.ports,
                        offset + match.index + match[0].indexOf(match.groups.ports),
                        match.groups.name
                    ).then( out => symbols.push.apply(symbols, out) );
                }

                if (match.groups.body) {
                    sub_blocks.push(match);
                }
            }
        }

        // Recursively expand the sub-blocks
        if (depth != maxDepth) {
            for (const i in sub_blocks) {
                const match = sub_blocks[i];
                let sub = this.get_all_recursive(
                    document,
                    precision,
                    maxDepth,
                    match.groups.body,
                    match.index + offset + match[0].indexOf(match.groups.body),
                    match.groups.name,
                    depth+1
                )
                symbols = symbols.concat(sub)
            }
        }
        return symbols;
    };


    private get_ports(document: TextDocument, text: string, offset, parent): Thenable<Array<SystemVerilogSymbol>> {
        return new Promise((resolve) => {
            let symbols: Array<SystemVerilogSymbol> = [];
            while(1) {
                let match_ports: RegExpMatchArray = this.r_ports.exec(text)
                if (match_ports == null) {
                    break;
                }
                let symbolInfo = new SystemVerilogSymbol(
                    match_ports.groups.name,
                    match_ports.groups.type,
                    parent,
                    new Location(document.uri,
                        new Range(document.positionAt(match_ports.index + offset),
                            document.positionAt(match_ports.index + match_ports[0].length + offset)
                        )))
                symbols.push(symbolInfo);
            }
            resolve(symbols);
        });
    }

    private translate_precision(precision: string): Array<RegExp> {
        switch (precision) {
            case "full":
                return this.full_parse;
            case "declaration":
                return this.declaration_parse;
            case "fast":
                return this.fast_parse;
            default:
                throw "Illegal precision";
        }
    }

}
