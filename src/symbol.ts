import { SymbolInformation, SymbolKind, Location, Range, Uri } from 'vscode';
import { getSymbolKindInt } from './symbol-kinds';
import { SymbolWire } from './wire-types';

export { SymbolWire } from './wire-types';

export class SystemVerilogSymbol extends SymbolInformation {
    public type: string;

    /**
     * Creates a new symbol information object.
     *
     * @param name The name of the symbol.
     * @param type The name of the symbol.
     * @param containerName The name of the symbol containing the symbol.
     * @param location The location of the symbol.
     */
    constructor(name: string, type: string, containerName: string, location: Location) {
        super(name, getSymbolKind(type), containerName, location);
        this.type = type;
    }
}

export function symbolToWire(s: SystemVerilogSymbol): Omit<SymbolWire, 'file'> {
    const r = s.location.range;
    return {
        name: s.name,
        type: s.type,
        kind: s.kind as number,
        container: s.containerName || null,
        sl: r.start.line,
        sc: r.start.character,
        el: r.end.line,
        ec: r.end.character
    };
}

export function wireToSymbol(w: SymbolWire): SystemVerilogSymbol {
    return new SystemVerilogSymbol(
        w.name,
        w.type,
        w.container || '',
        new Location(Uri.file(w.file), new Range(w.sl, w.sc, w.el, w.ec))
    );
}

// Host-side façade that returns vscode's SymbolKind enum value. The integer
// table lives in symbol-kinds.ts so the worker (which can't import vscode)
// can reuse the same mapping.
export function getSymbolKind(name: string): SymbolKind {
    return getSymbolKindInt(name) as SymbolKind;
}
