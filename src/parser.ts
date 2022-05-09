import { TextDocument, Location, Range, Position } from 'vscode';
import { SystemVerilogSymbol } from './symbol';
import { regexGetIndexes } from './utils/common';

export class SystemVerilogParser {
    private illegalMatches =
        /(?!\breturn\b|\bbegin\b|\bend\b|\belse\b|\bjoin\b|\bfork\b|\bfor\b|\bif\b|\bvirtual\b|\bstatic\b|\bautomatic\b|\bgenerate\b|\bassign\b|\binitial\b|\bassert\b|\bdisable\b)/;

    private comment = /(?:\/\/.*$)?/;

    private r_decl_block = new RegExp(
        [
            '(?<=^\\s*',
            /(?<type>module|program|interface|package|primitive|config|property)\s+/,
            // Mask automatic
            /(?:automatic\s+)?/,
            ')',
            /(?<name>\w+)/,
            /(?<params>\s*#\s*\([\w\W]*?\))?/,
            /(?<ports>\s*\([\W\w]*?\))?/,
            /\s*;/,
            /(?<body>[\W\w]*?)/,
            /(?<end>end\1)/ // eslint-disable-line no-useless-backreference
        ]
            .map((x) => (typeof x === 'string' ? x : x.source))
            .join(''),
        'mg'
    );

    private r_decl_class = new RegExp(
        [
            '(?<=^\\s*(virtual\\s+)?',
            /(?<type>class)\s+/,
            ')',
            /(?<name>\w+)/,
            /(\s+(extends|implements)\s+[\w\W]+?|\s*#\s*\([\w\W]+?\))*?/,
            /\s*;/,
            /(?<body>[\w\W]*?)/,
            /(?<end>endclass)/
        ]
            .map((x) => (typeof x === 'string' ? x : x.source))
            .join(''),
        'mg'
    );

    private r_decl_method = new RegExp(
        [
            '(?<=^\\s*(virtual|local|extern|pure\\s+virtual)?\\s*',
            /(?<type>(function|task))\s+/,
            /(?<return>[\w:[\]\s*]+\s*)?/,
            ')',
            /\b(?<name>[\w.]+)\b\s*/,
            /(?<ports>\([\W\w]*?\))?/,
            /\s*;/,
            /(?<body>[\w\W]*?)/,
            /(?<end>end(function|task))/
        ]
            .map((x) => (typeof x === 'string' ? x : x.source))
            .join(''),
        'mg'
    );

    private r_typedef = new RegExp(
        [
            /(?<=^\s*)/,
            /(?<type>typedef\b)\s*((?!;|\{)[\W\w])+/,
            // Recursive depth of 3 '{'s
            /(\{(?<body>\{(\{|[\W\w]+?)\}|[\W\w]+?)\}|[\w\W]+?\})?\s*/,
            /(?<name>\b\w+\b)/,
            // Variable dimension
            /(?:\s*\[[^;]*?\])*?/,
            /\s*(?<end>;)/
        ]
            .map((x) => x.source)
            .join(''),
        'mg'
    );

    private r_instantiation = new RegExp(
        [
            '(?<=^\\s*',
            /(?:(?<modifier>virtual|static|automatic|rand|randc|pure virtual)\s+)?/,
            // Symbol type, ignore packed array
            this.illegalMatches,
            /\b(?<type>[:\w]+(?:\s*\[[^\]]*?\])*?)\s*/,
            this.comment,
            /(?<params>#\s*\([\w\W]*?\))?\s*/,
            // Allow multiple declaration
            /(\b\w+\s*,\s*)*?/,
            ')',
            this.illegalMatches,
            // Symbol name
            /\b(?<name>\w+)\s*/,
            // Unpacked array | Ports
            /(?:(\[[^\]]*?\]\s*)*?|(\([\w\W]*?\))?)\s*/,
            /\s*(?<end>;|,|=)/
        ]
            .map((x) => (typeof x === 'string' ? x : x.source))
            .join(''),
        'mg'
    );

    private r_assert = new RegExp(
        [/(?<=^\s*(?<name>\w+)\s*:\s*)/, /(?<type>assert\b)/]
            .map((x) => (typeof x === 'string' ? x : x.source))
            .join(''),
        'mg'
    );

    private r_potential_reference = new RegExp(
        [this.illegalMatches, /\b(?<name>\w+)\b/].map((x) => (typeof x === 'string' ? x : x.source)).join(''),
        'mg'
    );

    private r_define = new RegExp(
        [
            /(?<=^\s*)/,
            /`(?<type>define)\s+/,
            /(?<name>\w+)\b/,
            /((?<ports>\([^\n]*\))|\s*?)/,
            /(?<body>([^\n]*\\\n)*([^\n]*))/,
            /(?<!\\)(?=\n)/
        ]
            .map((x) => x.source)
            .join(''),
        'mg'
    );

    private r_label = new RegExp(
        [
            /\b(?<type>begin)\b/,
            /\s*:\s*/,
            /(?<name>\w+)\s*(?:\/\/.*)?$/,
            // Matches up to 5 nested begin/ends
            // This is the only way to do it with RegExp without balancing groups
            /(?<body>(?:\bbegin\b(?:\bbegin\b(?:\bbegin\b(?:\bbegin\b(?:\bbegin\b[\w\W]+?\bend\b|[\w\W])+?\bend\b|[\w\W])+?\bend\b|[\w\W])+?\bend\b|[\w\W])+?\bend\b|[\w\W])+?)/,
            /\bend\b(\s*:\s*\1)?/ // eslint-disable-line no-useless-backreference
        ]
            .map((x) => x.source)
            .join(''),
        'mg'
    );

    private r_ports = new RegExp(
        [
            /(?:\b(?:input|output|inout|interface)\b)\s*/,
            /(?<type>(?:`?\w+)?\s*(\[.*?\])*?)?\s*/,
            // Allow multiple declaration
            /(\b\w+\s*,\s*)*?/,
            /(?<name>\b\w+\b)/,
            // Has to be followed by , or )
            /(?=\s*((\[.*?\]\s*)*?|\/\/[^\n]*\s*)(?:,|\)))/
        ]
            .map((x) => (typeof x === 'string' ? x : x.source))
            .join(''),
        'mg'
    );

    private r_params: RegExp = new RegExp(
        [
            /(?<type>parameter)\s+/,
            /(?:(?<data_type>\w+\s*)*?)/,
            // Multi-dimensional arrays
            /(?:\[.*?\]\s*)*?/,
            // Multiple declaration not allowed (yet)
            /(?<name>\w+)\s*/
            // Don't track the value, too many branches
        ]
            .map((x) => (typeof x === 'string' ? x : x.source))
            .join(''),
        'mg'
    );

    private r_block_fast = new RegExp(
        [
            /(?<=^\s*(?:virtual\s+)?)/,
            /(?<type>module|class|interface|package|program)\s+/,
            /(?:automatic\s+)?/,
            /(?<name>\w+)/,
            /[\w\W.]*?/,
            /(end\1)/ // eslint-disable-line no-useless-backreference
        ]
            .map((x) => x.source)
            .join(''),
        'mg'
    );

    public readonly full_parse = [
        this.r_decl_block,
        this.r_decl_class,
        this.r_decl_method,
        this.r_typedef,
        this.r_define,
        this.r_label,
        this.r_instantiation,
        this.r_assert,
        this.r_potential_reference
    ];

    // Used to save time in DocumentSymbolProvider, because references are not needed in that mode
    public readonly full_parse_no_references = [
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

    public readonly fast_parse = [this.r_block_fast];

    /**
        Matches the regex pattern with the document's text. If a match is found, it creates a `SystemVerilogSymbol` object.
        Add the objects to an empty list and return it.

        @param document The document in which the command was invoked.
        @param precision How much the parser will look for, must be "full", "declaration" or "fast"
        @param maxDepth How many deep it will traverse the hierarchy
        @return A list of `SystemVerilogSymbol` objects or a thenable that resolves to such. The lack of a result can be
        signaled by returning `undefined`, `null`, or an empty list.
    */
    public get_all_recursive(
        document: TextDocument,
        precision = 'full',
        maxDepth = -1,
        text?: string,
        offset = 0,
        parent?: string,
        depth = 0
    ): Array<SystemVerilogSymbol> {
        let symbols: Array<SystemVerilogSymbol> = [];
        const subBlocks: Array<RegExpMatchArray> = [];

        if (!text) {
            text = document.getText();
        }

        const regexes = this.translate_precision(precision);

        // Get the locations of begin and end comment blocks
        let blockCommentStartLocations: Array<Position> = [];
        let blockCommentEndLocations: Array<Position> = [];
        if (precision.includes('full')) {
            blockCommentStartLocations = regexGetIndexes(document, text, /(?<!\/)\/\*/g, offset);
            blockCommentEndLocations = regexGetIndexes(document, text, /\*\//g, offset);
        }

        // Find blocks
        for (let i = 0; i < regexes.length; i++) {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const match: RegExpMatchArray = regexes[i].exec(text);
                if (match == null) {
                    break;
                }
                const type = match.groups.type ? match.groups.type : 'potential_reference';
                if (match.index === 0 && parent !== undefined) {
                    continue; // eslint-disable-line no-continue
                } else if (
                    type !== 'potential_reference' &&
                    subBlocks.some((b) => match.index >= b.index && match.index < b.index + b[0].length)
                ) {
                    continue; // eslint-disable-line no-continue
                }

                const location = new Location(
                    document.uri,
                    new Range(
                        document.positionAt(match.index + offset),
                        document.positionAt(match.index + match[0].length + offset)
                    )
                );
                const isCommented = this.isSymbolInsideComment(
                    document,
                    location,
                    blockCommentStartLocations,
                    blockCommentEndLocations
                );
                if (!isCommented) {
                    const symbolInfo = new SystemVerilogSymbol(match.groups.name, type, parent, location);
                    symbols.push(symbolInfo);

                    if (match.groups.ports && precision.includes('full')) {
                        this.get_ports(
                            document,
                            match.groups.ports,
                            offset + match.index + match[0].indexOf(match.groups.ports),
                            match.groups.name
                        ).then((out) => symbols.push(...out)); // eslint-disable-line @typescript-eslint/no-loop-func
                    }
                    if (match.groups.params && precision.includes('full')) {
                        this.get_params(
                            document,
                            match.groups.params,
                            offset + match.index + match[0].indexOf(match.groups.params),
                            match.groups.name
                        ).then((out) => symbols.push(...out)); // eslint-disable-line @typescript-eslint/no-loop-func
                    }

                    if (match.groups.body) {
                        subBlocks.push(match);
                    }
                }
            }
        }

        // Recursively expand the sub-blocks
        if (depth !== maxDepth) {
            // eslint-disable-next-line guard-for-in
            for (const i in subBlocks) {
                const match = subBlocks[i];
                const sub = this.get_all_recursive(
                    document,
                    precision,
                    maxDepth,
                    match.groups.body,
                    match.index + offset + match[0].indexOf(match.groups.body),
                    match.groups.name,
                    depth + 1
                );
                symbols = symbols.concat(sub);
            }
        }
        return symbols;
    }

    // We don't want to provide symbols for text that is comemnted.
    // The easiest way to do this is to remove comments from the text before parsing
    private isSymbolInsideComment(
        document: TextDocument,
        location: Location,
        commentStart: Array<Position>,
        commentEnd: Array<Position>
    ): Boolean {
        const line = document.lineAt(location.range.start).text;

        /* eslint-disable spaced-comment */
        //is line commented out with a single line comment (//)?
        const isSingleComment = /^\s*\/\/.*/.test(line);
        if (isSingleComment) {
            return true;
        }
        if (commentStart.length === 0) {
            return false;
        }
        // only look at text before symbol. If we see a begin comment, an end comment
        // must be implied and we can ignore looking for one
        const lastStartComment = commentStart.find((x) => x.isBeforeOrEqual(location.range.start));
        const lastEndComment = commentEnd.find((x) => x.isBeforeOrEqual(location.range.start));

        // If there is begin comment (/*) that is not yet closed,
        // we know the symbol must be commented out.
        if (lastStartComment > lastEndComment) {
            // we must be within a block comment
            return true;
        }
        return false;
    }

    private get_ports(document: TextDocument, text: string, offset, parent): Thenable<Array<SystemVerilogSymbol>> {
        return new Promise((resolve) => {
            const symbols: Array<SystemVerilogSymbol> = [];
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const matchPorts: RegExpMatchArray = this.r_ports.exec(text);
                if (matchPorts == null) {
                    break;
                }
                const location = new Location(
                    document.uri,
                    new Range(
                        document.positionAt(matchPorts.index + offset),
                        document.positionAt(matchPorts.index + matchPorts[0].length + offset)
                    )
                );
                const symbolInfo = new SystemVerilogSymbol(
                    matchPorts.groups.name,
                    matchPorts.groups.type,
                    parent,
                    location
                );
                symbols.push(symbolInfo);
            }
            resolve(symbols);
        });
    }

    /////////////
    // TODO: parse parameter input syntax .VAR(val) too
    private get_params(document: TextDocument, text: string, offset, parent): Thenable<Array<SystemVerilogSymbol>> {
        return new Promise((resolve) => {
            let matchParams: RegExpMatchArray;
            const symbols: Array<SystemVerilogSymbol> = [];
            do {
                matchParams = this.r_params.exec(text);
                if (matchParams) {
                    const location = new Location(
                        document.uri,
                        new Range(
                            document.positionAt(matchParams.index + offset),
                            document.positionAt(matchParams.index + matchParams[0].length + offset)
                        )
                    );
                    const symbolInfo = new SystemVerilogSymbol(
                        matchParams.groups.name,
                        matchParams.groups.type,
                        parent,
                        location
                    );
                    symbols.push(symbolInfo);
                }
            } while (matchParams);

            resolve(symbols);
        });
    }

    private translate_precision(precision: string): Array<RegExp> {
        switch (precision) {
            case 'full':
                return this.full_parse;
            case 'full_no_references':
                return this.full_parse_no_references;
            case 'declaration':
                return this.declaration_parse;
            case 'fast':
                return this.fast_parse;
            default:
                throw new Error('Illegal precision');
        }
    }
}
