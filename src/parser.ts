import { SymbolKind, TextDocument, SymbolInformation, Location, Range, Uri, Position } from "vscode";


// See docs/SymbolKind_icons.png for an overview of the available icons
// Use show_SymbolKinds to see the latest symbols
export function getSymbolKind(name: String): SymbolKind {
    switch (name) {
        case 'parameter':
        case 'localparam': return SymbolKind.Constant;
        case 'package':
        case 'program':
        case 'import': return SymbolKind.Package;
        case 'string': return SymbolKind.String;
        case 'class': return SymbolKind.Class;
        case 'task': return SymbolKind.Method;
        case 'function': return SymbolKind.Function;
        case 'interface': return SymbolKind.Interface;
        case 'event': return SymbolKind.Event;
        case 'struct': return SymbolKind.Struct;
        case 'typedef': return SymbolKind.TypeParameter;
        case 'genvar': return SymbolKind.Operator;
        case 'enum': return SymbolKind.Enum;
        case 'wire':
        case 'reg':
        case 'bit':
        case 'logic':
        case 'int':
        case 'char':
        case 'float': return SymbolKind.Variable;
        case 'module':
        default: return SymbolKind.Field;
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
    private illegalMatches = /(?!return|begin|end|else|join|fork|for|if|virtual|static|automatic|generate|assign|initial|assert)/
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
        this.r_instantiation
    ];

    public readonly declaration_parse = [
        this.r_decl_block,
        this.r_decl_class,
        this.r_decl_method,
        this.r_typedef
    ];

    public readonly fast_parse = [
        this.r_block_fast
    ];

    /**
        Matches the regex pattern with the document's text. If a match is found, it creates a `SymbolInformation` object.
        Add the objects to an empty list and return it.

        @param document The document in which the command was invoked.
        @param precision How much the parser will look for, must be "full", "declaration" or "fast"
        @param maxDepth How many deep it will traverse the hierarchy
        @return A list of `SymbolInformation` objects or a thenable that resolves to such. The lack of a result can be
        signaled by returning `undefined`, `null`, or an empty list.
    */
    public get_all_recursive(document: TextDocument, precision: string="full", maxDepth: number=-1,
                             text?: string, offset: number=0, parent?: string, depth: number=0): Array<SymbolInformation> {
        let symbols: Array<SymbolInformation> = [];
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

                let symbolInfo = new SymbolInformation(
                    match.groups.name,
                    getSymbolKind(match.groups.type),
                    parent,
                    new Location(document.uri,
                        new Range(document.positionAt(match.index + offset),
                            document.positionAt(match.index + match[0].length + offset)
                        )))
                symbols.push(symbolInfo);

                // TODO: Match parameter/port-lists

                if (match.groups.body) {
                    sub_blocks.push(match);
                }

            }
            
        }
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

    /**
     * TODO
     * @param document
     * @param module
     */
    public get_ports(document: TextDocument, module: String): Thenable<Array<SymbolInformation>> {

        return new Promise((resolve) => {
            resolve();
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


// Function to easily show all the SymbolKind icons
function show_SymbolKinds(uri: Uri): Array<SymbolInformation> {
    return new Array<SymbolInformation>(
        new SymbolInformation("File",           SymbolKind.File,          "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Module",         SymbolKind.Module,        "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Namespace",      SymbolKind.Namespace,     "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Package",        SymbolKind.Package,       "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Class",          SymbolKind.Class,         "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Method",         SymbolKind.Method,        "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Property",       SymbolKind.Property,      "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Field",          SymbolKind.Field,         "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Constructor",    SymbolKind.Constructor,   "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Enum",           SymbolKind.Enum,          "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Interface",      SymbolKind.Interface,     "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Function",       SymbolKind.Function,      "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Variable",       SymbolKind.Variable,      "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Constant",       SymbolKind.Constant,      "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("String",         SymbolKind.String,        "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Number",         SymbolKind.Number,        "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Boolean",        SymbolKind.Boolean,       "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Array",          SymbolKind.Array,         "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Object",         SymbolKind.Object,        "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Key",            SymbolKind.Key,           "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Null",           SymbolKind.Null,          "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("EnumMember",     SymbolKind.EnumMember,    "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Struct",         SymbolKind.Struct,        "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Event",          SymbolKind.Event,         "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("Operator",       SymbolKind.Operator,      "undefined", new Location(uri, new Position(0,0))),
        new SymbolInformation("TypeParameter",  SymbolKind.TypeParameter, "undefined", new Location(uri, new Position(0,0)))
    );
}