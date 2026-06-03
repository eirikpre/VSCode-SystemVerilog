// Pure-JS SystemVerilog parser. Operates on a `ParseSource` (string + lazy
// line-offset table), returns plain wire-shape symbols. Has no vscode imports
// so it can run inside the indexer worker.

import { SymbolWire } from './wire-types';
import { getSymbolKindInt } from './symbol-kinds';

export interface ParseSource {
    text: string;
    fsPath: string;
    positionAt(offset: number): { line: number; character: number };
    lineCount: number;
    lineAt(line: number): { text: string };
}

type Pos = { line: number; character: number };

function posBeforeOrEqual(a: Pos, b: Pos): boolean {
    if (a.line < b.line) return true;
    if (a.line > b.line) return false;
    return a.character <= b.character;
}

function posGreaterThan(a: Pos, b: Pos): boolean {
    if (a.line > b.line) return true;
    if (a.line < b.line) return false;
    return a.character > b.character;
}

/** Wraps a plain string + fsPath so it satisfies `ParseSource`. */
export class StringSource implements ParseSource {
    public text: string;
    public fsPath: string;
    private _lineStarts: number[] | null = null;

    constructor(text: string, fsPath: string) {
        this.text = text;
        this.fsPath = fsPath;
    }

    private get lineStarts(): number[] {
        if (this._lineStarts) return this._lineStarts;
        const ls = [0];
        const t = this.text;
        for (let i = 0; i < t.length; i++) {
            if (t.charCodeAt(i) === 10 /* \n */) ls.push(i + 1);
        }
        this._lineStarts = ls;
        return ls;
    }

    get lineCount(): number {
        return this.lineStarts.length;
    }

    positionAt(offset: number): Pos {
        const ls = this.lineStarts;
        if (offset <= 0) return { line: 0, character: 0 };
        if (offset >= this.text.length) {
            const lastLine = ls.length - 1;
            return { line: lastLine, character: this.text.length - ls[lastLine] };
        }
        let lo = 0;
        let hi = ls.length - 1;
        while (lo < hi) {
            const mid = (lo + hi + 1) >>> 1;
            if (ls[mid] <= offset) lo = mid;
            else hi = mid - 1;
        }
        return { line: lo, character: offset - ls[lo] };
    }

    lineAt(line: number): { text: string } {
        const ls = this.lineStarts;
        if (line < 0 || line >= ls.length) return { text: '' };
        const start = ls[line];
        const end = line + 1 < ls.length ? ls[line + 1] - 1 : this.text.length;
        let endTrim = end;
        if (endTrim > start && this.text.charCodeAt(endTrim - 1) === 13 /* \r */) endTrim -= 1;
        return { text: this.text.slice(start, endTrim) };
    }
}

export class SystemVerilogParser {
    private illegalMatches =
        /(?!\breturn\b|\bbegin\b|\bend\b|\belse\b|\bjoin\b|\bfork\b|\bfor\b|\bif\b|\bvirtual\b|\bstatic\b|\bautomatic\b|\bgenerate\b|\bassign\b|\binitial\b|\bassert\b|\bdisable\b)/;

    private comment = /(?:\/\/.*$)?/;

    private r_decl_block = new RegExp(
        [
            '(?<=^\\s*',
            /(?<type>module|program|interface|package|primitive|config|property)\s+/,
            /(?:automatic\s+)?/,
            ')',
            /(?<name>\w+)/,
            // ANSI module headers may carry package-import declarations and/or
            // comments between the name and the parameter/port lists (issue
            // #189). Consume any number of them (non-capturing so the `end\1`
            // back-reference to the `type` group is unaffected).
            /(?:\s*(?:\/\/[^\n]*|\/\*[\w\W]*?\*\/|import\s+\w+\s*::\s*[\w*]+(?:\s*,\s*\w+\s*::\s*[\w*]+)*\s*;))*/,
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
            /(\{(?<body>\{(\{|[\W\w]+?)\}|[\W\w]+?)\}|[\w\W]+?\})?\s*/,
            /(?<name>\b\w+\b)/,
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
            this.illegalMatches,
            /\b(?<type>[:\w]+(?:\s*\[[^\]]*?\])*?)\s*/,
            this.comment,
            /(?<params>#\s*\([\w\W]*?\))?\s*/,
            /(\b\w+\s*,\s*)*?/,
            ')',
            this.illegalMatches,
            /\b(?<name>\w+)\s*/,
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
            /(\b\w+\s*,\s*)*?/,
            /(?<name>\b\w+\b)/,
            /(?=\s*((\[.*?\]\s*)*?|\/\/[^\n]*\s*)(?:,|\)))/
        ]
            .map((x) => (typeof x === 'string' ? x : x.source))
            .join(''),
        'mg'
    );

    private r_params: RegExp = new RegExp(
        [/(?<type>parameter)/, /(?:(\s+(?<data_type>\w+))*)/, /(?:\s*\[.*?\]\s*)*?/, /\s+(?<name>\w+)\s*/]
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

    public parse(source: ParseSource, precision: string, maxDepth: number): SymbolWire[] {
        // Pre-compute comment ranges once per file.
        let blockCommentStart: Pos[] = [];
        let blockCommentEnd: Pos[] = [];
        if (precision.includes('full')) {
            blockCommentStart = this.findAll(source, source.text, /(?<!\/)\/\*/g, 0);
            blockCommentEnd = this.findAll(source, source.text, /\*\//g, 0);
        }
        // Cheap whole-file pre-scans to decide which regexes are worth running.
        // Each of these has expensive worst-case backtracking; skipping a regex
        // when its anchoring keyword isn't in the file is always safe (the
        // regex couldn't match anyway) and dramatically cheaper.
        const t = source.text;
        const skip = new Set<RegExp>();
        if (!/\bbegin\b\s*:\s*\w+/.test(t)) skip.add(this.r_label);
        if (!/\btypedef\b/.test(t)) skip.add(this.r_typedef);
        if (!/`define\b/.test(t)) skip.add(this.r_define);
        if (!/\b(?:function|task)\b/.test(t)) skip.add(this.r_decl_method);
        if (!/\bclass\b/.test(t)) skip.add(this.r_decl_class);
        if (!/\bassert\b/.test(t)) skip.add(this.r_assert);
        if (!/\b(?:module|program|interface|package|primitive|config|property)\b/.test(t)) {
            skip.add(this.r_decl_block);
            skip.add(this.r_block_fast);
        }
        return this.parseRecursive(
            source,
            precision,
            maxDepth,
            source.text,
            0,
            '',
            0,
            blockCommentStart,
            blockCommentEnd,
            skip
        );
    }

    private parseRecursive(
        source: ParseSource,
        precision: string,
        maxDepth: number,
        text: string,
        offset: number,
        parent: string,
        depth: number,
        blockCommentStart: Pos[],
        blockCommentEnd: Pos[],
        skip: Set<RegExp>
    ): SymbolWire[] {
        let symbols: SymbolWire[] = [];
        const subBlocks: Array<{ match: RegExpMatchArray; bodyOffset: number }> = [];

        const regexes = this.translatePrecision(precision);

        for (let i = 0; i < regexes.length; i++) {
            // Skip regexes whose anchoring keyword doesn't appear in the file.
            // The pre-scan happens once per parse() call in `parse()`.
            if (skip.has(regexes[i])) continue;

            // Reset regex state to make this re-entrant.
            regexes[i].lastIndex = 0;
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const match: RegExpMatchArray = regexes[i].exec(text);
                if (match == null) break;
                const type = match.groups!.type ? match.groups!.type : 'potential_reference';
                if (match.index === 0 && parent !== '') continue;
                if (
                    type !== 'potential_reference' &&
                    subBlocks.some(
                        (b) => match.index! >= b.match.index! && match.index! < b.match.index! + b.match[0].length
                    )
                )
                    continue;

                const start = source.positionAt(match.index! + offset);
                const end = source.positionAt(match.index! + match[0].length + offset);

                if (!this.isInsideComment(source, start, blockCommentStart, blockCommentEnd)) {
                    const name = match.groups!.name;
                    symbols.push({
                        name,
                        type,
                        kind: getSymbolKindInt(type),
                        container: parent || null,
                        file: source.fsPath,
                        sl: start.line,
                        sc: start.character,
                        el: end.line,
                        ec: end.character
                    });

                    if (match.groups!.ports && precision.includes('full')) {
                        symbols.push(
                            ...this.getPorts(
                                source,
                                match.groups!.ports,
                                offset + match.index! + match[0].indexOf(match.groups!.ports),
                                name
                            )
                        );
                    }
                    if (match.groups!.params && precision.includes('full')) {
                        symbols.push(
                            ...this.getParams(
                                source,
                                match.groups!.params,
                                offset + match.index! + match[0].indexOf(match.groups!.params),
                                name
                            )
                        );
                    }
                    if (match.groups!.body) {
                        const bodyOffset = match.index! + offset + match[0].indexOf(match.groups!.body);
                        if (type === 'typedef' && /\benum\b/.test(match[0]) && precision.includes('full')) {
                            // An enum body is a comma-separated value list, not
                            // declarations, so extract the values directly as
                            // members of the enum type (so they can be completed
                            // in `==`/case contexts).
                            symbols.push(...this.getEnumValues(source, match.groups!.body, bodyOffset, name));
                        } else {
                            subBlocks.push({ match, bodyOffset });
                        }
                    }
                }
            }
        }

        if (depth !== maxDepth) {
            for (const b of subBlocks) {
                symbols = symbols.concat(
                    this.parseRecursive(
                        source,
                        precision,
                        maxDepth,
                        b.match.groups!.body,
                        b.bodyOffset,
                        b.match.groups!.name,
                        depth + 1,
                        blockCommentStart,
                        blockCommentEnd,
                        skip
                    )
                );
            }
        }
        return symbols;
    }

    private translatePrecision(precision: string): RegExp[] {
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
                throw new Error(`Illegal precision: ${precision}`);
        }
    }

    // Extract the value identifiers from an enum body (the text between the
    // braces), e.g. `RED, GREEN = 2, BLUE[1:0]` -> RED, GREEN, BLUE. Each is
    // emitted as a member of the enum type `parent`.
    private getEnumValues(source: ParseSource, text: string, offset: number, parent: string): SymbolWire[] {
        const out: SymbolWire[] = [];
        const re = /(?:^|,)\s*([a-zA-Z_]\w*)/g;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const m = re.exec(text);
            if (m == null) break;
            const nameStart = m.index + m[0].indexOf(m[1]);
            const start = source.positionAt(nameStart + offset);
            const end = source.positionAt(nameStart + m[1].length + offset);
            out.push({
                name: m[1],
                type: 'enum_value',
                kind: getSymbolKindInt('enum_value'),
                container: parent,
                file: source.fsPath,
                sl: start.line,
                sc: start.character,
                el: end.line,
                ec: end.character
            });
        }
        return out;
    }

    private getPorts(source: ParseSource, text: string, offset: number, parent: string): SymbolWire[] {
        const out: SymbolWire[] = [];
        const re = new RegExp(this.r_ports.source, this.r_ports.flags);
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const m = re.exec(text);
            if (m == null) break;
            const start = source.positionAt(m.index! + offset);
            const end = source.positionAt(m.index! + m[0].length + offset);
            out.push({
                name: m.groups!.name,
                type: m.groups!.type || '',
                kind: getSymbolKindInt(m.groups!.type || ''),
                container: parent,
                file: source.fsPath,
                sl: start.line,
                sc: start.character,
                el: end.line,
                ec: end.character
            });
        }
        return out;
    }

    private getParams(source: ParseSource, text: string, offset: number, parent: string): SymbolWire[] {
        const out: SymbolWire[] = [];
        const re = new RegExp(this.r_params.source, this.r_params.flags);
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const m = re.exec(text);
            if (m == null) break;
            const start = source.positionAt(m.index! + offset);
            const end = source.positionAt(m.index! + m[0].length + offset);
            out.push({
                name: m.groups!.name,
                type: m.groups!.type,
                kind: getSymbolKindInt(m.groups!.type),
                container: parent,
                file: source.fsPath,
                sl: start.line,
                sc: start.character,
                el: end.line,
                ec: end.character
            });
        }
        return out;
    }

    private isInsideComment(source: ParseSource, start: Pos, commentStart: Pos[], commentEnd: Pos[]): boolean {
        const line = source.lineAt(start.line).text;
        if (/^\s*\/\/.*/.test(line)) return true;
        if (commentStart.length === 0) return false;
        const lastStart = commentStart.find((x) => posBeforeOrEqual(x, start));
        const lastEnd = commentEnd.find((x) => posBeforeOrEqual(x, start));
        // posGreaterThan(lastStart, lastEnd) means there is an unclosed `/*` before `start`.
        if (lastStart && (!lastEnd || posGreaterThan(lastStart, lastEnd))) return true;
        return false;
    }

    private findAll(source: ParseSource, text: string, regex: RegExp, offset: number): Pos[] {
        const out: Pos[] = [];
        const re = new RegExp(regex.source, regex.flags);
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const m = re.exec(text);
            if (m == null) break;
            out.push(source.positionAt(m.index! + offset));
        }
        return out;
    }
}
