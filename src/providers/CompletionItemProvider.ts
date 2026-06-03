import { CompletionItemProvider, CompletionItem, CompletionItemKind, TextDocument, Position, Range, CancellationToken, CompletionList, SnippetString, workspace, commands, SymbolInformation } from 'vscode'; // prettier-ignore
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
        case 'typedef':
            return CompletionItemKind.TypeParameter;
        default:
            return CompletionItemKind.Field;
    }
}

export type CompletionCtx = { kind: 'package' | 'member' | 'port'; base: string };

/**
    Classify what the user is completing from the text before the cursor. Pure
    (string-only) so it can be unit tested. Returns null when no member/port/
    package completion applies.
    - `pkg::`      -> package members
    - `ident.`     -> struct/union/class members of `ident`
    - `(`/`,`/`.`  -> a port connection slot inside an instantiation
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

export class SystemVerilogCompletionItemProvider implements CompletionItemProvider {
    private indexer: SystemVerilogIndexer;

    constructor(indexer: SystemVerilogIndexer) {
        this.indexer = indexer;
    }

    public async provideCompletionItems(
        document: TextDocument,
        position: Position,
        _token: CancellationToken
    ): Promise<CompletionItem[] | CompletionList> {
        try {
            const linePrefix = document.lineAt(position.line).text.slice(0, position.character);
            const ctx = detectContext(linePrefix);
            if (!ctx) {
                return [];
            }

            if (ctx.kind === 'package') {
                return this.completeMembers(ctx.base, DEEP, false);
            }

            if (ctx.kind === 'member') {
                const typeName = await this.resolveType(document, ctx.base);
                if (!typeName) {
                    return [];
                }
                return this.completeMembers(typeName, DEEP, false);
            }

            // Port connection: resolve the instantiated module from the
            // surrounding text, then offer its ports (depth 0 == header ports
            // only, so internal nets of the module are not suggested).
            const moduleName = moduleFromPort(document, new Range(position, position));
            if (!moduleName) {
                return [];
            }
            return this.completeMembers(moduleName, 0, true);
        } catch {
            // Completion must never throw; surface no suggestions instead.
            return [];
        }
    }

    /**
        Resolve `name`'s declaration in the current document to its declared
        type string. Re-parses the current file at depth so locals nested in
        modules/classes are found; falls back to a workspace name lookup.
    */
    private async resolveType(document: TextDocument, name: string): Promise<string | undefined> {
        const local = await this.indexer.client.parseText({
            path: document.uri.fsPath,
            text: document.getText(),
            precision: 'full_no_references',
            maxDepth: DEEP
        });
        const hit = local.find((s) => s.name === name && s.type && s.type !== 'potential_reference');
        if (hit) {
            return normalizeTypeName(hit.type);
        }
        const ws = await this.indexer.client.queryByName(name, { excludeTypes: ['potential_reference'], limit: 50 });
        const wsHit = ws.find((s) => s.type && s.type !== 'potential_reference');
        return wsHit ? normalizeTypeName(wsHit.type) : undefined;
    }

    /**
        List the children of a container symbol (struct/union/class/package/
        module) as completion items. Finds the container's defining file via an
        exact-match workspace query, re-parses it at `maxDepth`, and keeps the
        symbols whose `container` is the container name.
    */
    private async completeMembers(containerName: string, maxDepth: number, asPort: boolean): Promise<CompletionItem[]> {
        if (!containerName) {
            return [];
        }
        const wsSyms =
            (await commands.executeCommand<SymbolInformation[]>(
                'vscode.executeWorkspaceSymbolProvider',
                `¤${containerName}`
            )) || [];

        const seenFiles = new Set<string>();
        const items = new Map<string, CompletionItem>();
        for (const ws of wsSyms) {
            const fsPath = ws.location.uri.fsPath;
            if (seenFiles.has(fsPath)) {
                continue;
            }
            seenFiles.add(fsPath);
            // eslint-disable-next-line no-await-in-loop
            const doc = await workspace.openTextDocument(ws.location.uri);
            // eslint-disable-next-line no-await-in-loop
            const wireSyms = await this.indexer.client.parseText({
                path: fsPath,
                text: doc.getText(),
                precision: 'full_no_references',
                maxDepth
            });
            for (const s of wireSyms) {
                if (s.container === containerName && s.type !== 'potential_reference' && !items.has(s.name)) {
                    items.set(s.name, this.buildItem(s, asPort));
                }
            }
        }
        return [...items.values()];
    }

    private buildItem(sym: SymbolWire, asPort: boolean): CompletionItem {
        const item = new CompletionItem(sym.name, getCompletionItemKind(sym.type));
        if (sym.type) {
            item.detail = sym.type;
        }
        if (asPort) {
            // The triggering `.` is already typed; insert `name(${cursor})`.
            item.insertText = new SnippetString(`${sym.name}($1)`);
        }
        return item;
    }
}
