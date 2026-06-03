import { CompletionItemProvider, CompletionItem, CompletionItemKind, TextDocument, Position, Range, CancellationToken, CompletionList, SnippetString, workspace, window, commands, SymbolInformation } from 'vscode'; // prettier-ignore
import { SystemVerilogIndexer } from '../indexer';
import { SymbolWire } from '../wire-types';
import { moduleFromPort } from './DefinitionProvider';

// Members of types nested inside a package/module live below the default
// indexing depth (maxDepthForPrecision === 1), so completions re-parse the
// defining file at a generous depth to surface them.
const DEEP = 32;

// See test/SymbolKind_icons.png for an overview of the icons.
export function getCompletionItemKind(name: string): CompletionItemKind {
    switch (name) {
        case 'parameter':
        case 'localparam':
            return CompletionItemKind.Property;
        case 'package':
        case 'import':
            return CompletionItemKind.File;
        case 'wire':
        case 'reg':
        case 'logic':
        case 'bit':
        case 'byte':
        case 'int':
        case 'integer':
            return CompletionItemKind.Variable;
        case 'string':
            return CompletionItemKind.Text;
        case 'class':
            return CompletionItemKind.Class;
        case 'task':
        case 'function':
            return CompletionItemKind.Method;
        case 'interface':
            return CompletionItemKind.Interface;
        case 'event':
            return CompletionItemKind.Event;
        case 'struct':
        case 'union':
            return CompletionItemKind.Struct;
        case 'enum':
            return CompletionItemKind.Enum;
        case 'enum_value':
            return CompletionItemKind.EnumMember;
        case 'typedef':
            return CompletionItemKind.TypeParameter;
        default:
            return CompletionItemKind.Field;
    }
}

export type CompletionCtx = { kind: 'package' | 'member' | 'port' | 'value'; base: string };

/**
    Classify what the user is completing from the text before the cursor. Pure
    (string-only) so it can be unit tested. Returns null when no member/port/
    package/value completion applies.
    - `pkg::`        -> package members
    - `ident.`       -> struct/union/class members of `ident`
    - `ident ==`     -> values of `ident`'s type (e.g. enum values)
    - `(`/`,`/`.`    -> a port connection slot inside an instantiation
*/
export function detectContext(linePrefix: string): CompletionCtx | null {
    // Package scope. Match `::` specifically; a lone `:` (also a trigger char)
    // matches nothing and yields no completion.
    const pkg = linePrefix.match(/([a-zA-Z_]\w*)\s*::\s*$/);
    if (pkg) {
        return { kind: 'package', base: pkg[1] };
    }
    // Member access: a dot immediately after an identifier.
    const member = linePrefix.match(/([a-zA-Z_]\w*)\s*\.\s*$/);
    if (member) {
        return { kind: 'member', base: member[1] };
    }
    // Comparison against a value of the operand's type (typically an enum):
    // `expr ==`/`!=`/`===`/`!==`. The right-hand side may be partially typed.
    const cmp = linePrefix.match(/([a-zA-Z_]\w*)\s*(?:===|!==|==|!=)\s*[a-zA-Z_]?\w*$/);
    if (cmp) {
        return { kind: 'value', base: cmp[1] };
    }
    // Port connection slot: a dot that is NOT preceded by an identifier
    // (start of line, or after `(` or `,`). The enclosing module is resolved
    // separately via moduleFromPort.
    if (/(?:^|[(,])\s*\.\s*$/.test(linePrefix)) {
        return { kind: 'port', base: '' };
    }
    return null;
}

/**
    Reduce a declared type string to the bare type name used as the `container`
    of its members: drop packed dimensions and a `pkg::` scope. Pure.
*/
export function normalizeTypeName(type: string): string {
    if (!type) {
        return '';
    }
    let t = type.replace(/\[[^\]]*\]/g, ' ').trim();
    const scope = t.lastIndexOf('::');
    if (scope !== -1) {
        t = t.slice(scope + 2);
    }
    return t.trim().split(/\s+/).pop() || '';
}

/**
    Extract the explicit package scope from a declared type, if any: the package
    immediately enclosing the type. `mypkg::state_e` -> `mypkg`,
    `a::b::c` -> `b`, plain `state_e`/`logic [7:0]` -> undefined. Pure.
*/
export function typeScope(type: string): string | undefined {
    if (!type) {
        return undefined;
    }
    const t =
        type
            .replace(/\[[^\]]*\]/g, ' ')
            .trim()
            .split(/\s+/)
            .pop() || '';
    const parts = t.split('::');
    return parts.length >= 2 ? parts[parts.length - 2] : undefined;
}

export class SystemVerilogCompletionItemProvider implements CompletionItemProvider {
    private indexer: SystemVerilogIndexer;

    // Per-file parse cache keyed by `fsPath|maxDepth`, invalidated by the
    // document version. Avoids re-parsing the same (unchanged) file on every
    // completion — the bulk of the latency. One entry per (file, depth).
    private parseCache = new Map<string, { version: number; syms: SymbolWire[] }>();

    constructor(indexer: SystemVerilogIndexer) {
        this.indexer = indexer;
    }

    public async provideCompletionItems(
        document: TextDocument,
        position: Position,
        _token: CancellationToken
    ): Promise<CompletionItem[] | CompletionList> {
        let ctx: CompletionCtx | null = null;
        try {
            const linePrefix = document.lineAt(position.line).text.slice(0, position.character);
            ctx = detectContext(linePrefix);
            if (!ctx && /^\s*\w*$/.test(linePrefix)) {
                // A bare identifier at the start of a line may be a case-item
                // label; offer the values of the enclosing `case (expr)`
                // selector's type (typically an enum).
                const caseVar = this.enclosingCaseExpr(document, position.line);
                if (caseVar) {
                    ctx = { kind: 'value', base: caseVar };
                }
            }
        } catch {
            return [];
        }
        if (!ctx) {
            return [];
        }

        // Show a transient status-bar spinner while the (potentially slow)
        // member resolution runs; it clears automatically when the work
        // settles. Completion must never throw — fall back to no suggestions.
        const work = this.resolve(ctx, document, position).catch(() => [] as CompletionItem[]);
        window.setStatusBarMessage('$(sync~spin) SystemVerilog: resolving members…', work);
        return work;
    }

    private async resolve(ctx: CompletionCtx, document: TextDocument, position: Position): Promise<CompletionItem[]> {
        if (ctx.kind === 'package') {
            return this.completeMembers(ctx.base, DEEP, false, document);
        }

        if (ctx.kind === 'member' || ctx.kind === 'value') {
            // Resolve the operand's type, then list that type's members
            // (struct/class fields for `.`, enum values for `==`/case). An
            // explicit `pkg::` scope on the type narrows the lookup precisely.
            const resolved = await this.resolveType(document, ctx.base);
            if (!resolved || !resolved.name) {
                return [];
            }
            return this.completeMembers(resolved.name, DEEP, false, document, resolved.scope);
        }

        // Port connection: resolve the instantiated module from the surrounding
        // text, then offer its ports (depth 0 == header ports only, so internal
        // nets of the module are not suggested).
        const moduleName = moduleFromPort(document, new Range(position, position));
        if (!moduleName) {
            return [];
        }
        return this.completeMembers(moduleName, 0, true, document);
    }

    /**
        If `line` is inside a `case (expr) … endcase`, return the case selector
        identifier. Scans upward, skipping already-closed case blocks, so nested
        cases resolve to the innermost enclosing one. Bounded for performance.
    */
    private enclosingCaseExpr(document: TextDocument, line: number): string | undefined {
        let closed = 0;
        for (let ln = line - 1; ln >= 0 && line - ln < 200; ln -= 1) {
            const text = document.lineAt(ln).text;
            if (/\bendcase\b/.test(text)) {
                closed += 1;
            }
            const m = text.match(/\bcase[xz]?\s*\(\s*([a-zA-Z_]\w*)/);
            if (m) {
                if (closed === 0) {
                    return m[1];
                }
                closed -= 1;
            }
        }
        return undefined;
    }

    /**
        Parse a document at `maxDepth`, reusing a cached result while the
        document version is unchanged.
    */
    private async parseDoc(doc: TextDocument, maxDepth: number): Promise<SymbolWire[]> {
        const key = `${doc.uri.fsPath}|${maxDepth}`;
        const cached = this.parseCache.get(key);
        if (cached && cached.version === doc.version) {
            return cached.syms;
        }
        const syms = await this.indexer.client.parseText({
            path: doc.uri.fsPath,
            text: doc.getText(),
            precision: 'full_no_references',
            maxDepth
        });
        this.parseCache.set(key, { version: doc.version, syms });
        return syms;
    }

    /**
        Resolve `name`'s declaration in the current document to its declared
        type string. Re-parses the current file at depth so locals nested in
        modules/classes are found; falls back to a workspace name lookup.
    */
    private async resolveType(
        document: TextDocument,
        name: string
    ): Promise<{ name: string; scope?: string } | undefined> {
        const pick = (raw: string) => ({ name: normalizeTypeName(raw), scope: typeScope(raw) });
        const local = await this.parseDoc(document, DEEP);
        const hit = local.find((s) => s.name === name && s.type && s.type !== 'potential_reference');
        if (hit) {
            return pick(hit.type);
        }
        const ws = await this.indexer.client.queryByName(name, { excludeTypes: ['potential_reference'], limit: 50 });
        const wsHit = ws.find((s) => s.type && s.type !== 'potential_reference');
        return wsHit ? pick(wsHit.type) : undefined;
    }

    /**
        List the children of a container symbol (struct/union/class/package/
        module) as completion items, respecting SystemVerilog scope so that
        unrelated same-named definitions in other files are not merged in:
        1. a definition in the current file wins (local scope);
        2. otherwise resolve via the workspace, but when the name is defined in
           more than one file, prefer the definition whose package is imported
           by the current file, falling back to a single (first) match rather
           than the union of every same-named definition.
    */
    private async completeMembers(
        containerName: string,
        maxDepth: number,
        asPort: boolean,
        document: TextDocument,
        preferScope?: string
    ): Promise<CompletionItem[]> {
        if (!containerName) {
            return [];
        }
        const matches = (s: SymbolWire) => s.container === containerName && s.type !== 'potential_reference';

        // 1) A local definition wins — unless the reference was explicitly
        //    package-scoped (`pkg::Type`), which must resolve to that package
        //    even if a same-named type exists locally.
        if (!preferScope) {
            const localMembers = (await this.parseDoc(document, maxDepth)).filter(matches);
            if (localMembers.length > 0) {
                return this.toItems(localMembers, asPort);
            }
        }

        // 2) Resolve via the workspace, scoped to the in-scope definition.
        const wsSyms =
            (await commands.executeCommand<SymbolInformation[]>(
                'vscode.executeWorkspaceSymbolProvider',
                `¤${containerName}`
            )) || [];
        if (wsSyms.length === 0) {
            return [];
        }
        let chosen = wsSyms;
        if (wsSyms.length > 1 || preferScope) {
            // Prefer a definition whose enclosing package is in scope: an
            // explicit `pkg::` on the reference, or a wildcard-imported package.
            const preferred = this.importedScopes(document);
            if (preferScope) {
                preferred.add(preferScope);
            }
            const scoped = wsSyms.filter((s) => s.containerName && preferred.has(s.containerName));
            // Otherwise a single match, never the union of every same-named def.
            chosen = scoped.length > 0 ? scoped : [wsSyms[0]];
        }

        const seenFiles = new Set<string>();
        const members: SymbolWire[] = [];
        for (const ws of chosen) {
            const fsPath = ws.location.uri.fsPath;
            if (seenFiles.has(fsPath)) {
                continue;
            }
            seenFiles.add(fsPath);
            // eslint-disable-next-line no-await-in-loop
            const doc = await workspace.openTextDocument(ws.location.uri);
            // eslint-disable-next-line no-await-in-loop
            members.push(...(await this.parseDoc(doc, maxDepth)).filter(matches));
        }
        return this.toItems(members, asPort);
    }

    private toItems(members: SymbolWire[], asPort: boolean): CompletionItem[] {
        const items = new Map<string, CompletionItem>();
        for (const s of members) {
            if (!items.has(s.name)) {
                items.set(s.name, this.buildItem(s, asPort));
            }
        }
        return [...items.values()];
    }

    // Package names brought into scope by `import pkg::*;` / `import pkg::name;`
    // in the current document.
    private importedScopes(document: TextDocument): Set<string> {
        const set = new Set<string>();
        const re = /\bimport\s+([a-zA-Z_]\w*)\s*::/g;
        const text = document.getText();
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const m = re.exec(text);
            if (m == null) break;
            set.add(m[1]);
        }
        return set;
    }

    private buildItem(sym: SymbolWire, asPort: boolean): CompletionItem {
        const item = new CompletionItem(sym.name, getCompletionItemKind(sym.type));
        // For enum values the raw type is the internal 'enum_value' marker, so
        // show the enum type (the container) instead; otherwise show the type.
        if (sym.type === 'enum_value') {
            item.detail = sym.container || 'enum';
        } else if (sym.type) {
            item.detail = sym.type;
        }
        if (asPort) {
            // The triggering `.` is already typed; insert `name(${cursor})`.
            item.insertText = new SnippetString(`${sym.name}($1)`);
        }
        return item;
    }
}
