import { SymbolInformation, SymbolKind, Location } from 'vscode';

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

// See resources/SymbolKind_icons.png for an overview of the available icons
// Use show_SymbolKinds to see the latest symbols
export function getSymbolKind(name: string): SymbolKind {
    if (name === undefined || name === '') {
        // Ports may be declared without type
        return SymbolKind.Variable;
    }
    if (name.indexOf('[') !== -1) {
        return SymbolKind.Array;
    }
    switch (name) {
        case 'parameter':
        case 'localparam':
        case 'Constant':
            return SymbolKind.Constant;
        case 'potential_reference':
        case 'Key':
            return SymbolKind.Key;
        case 'package':
        case 'program':
        case 'import':
        case 'Package':
            return SymbolKind.Package;
        case 'begin': // Labels
        case 'string':
        case 'String':
            return SymbolKind.String;
        case 'class':
        case 'Class':
            return SymbolKind.Class;
        case 'task':
        case 'Method':
            return SymbolKind.Method;
        case 'function':
        case 'Function':
            return SymbolKind.Function;
        case 'interface':
        case 'Interface':
            return SymbolKind.Interface;
        case 'input':
        case 'output':
        case 'inout':
            return SymbolKind.Boolean;
        case 'assert':
        case 'event':
        case 'Event':
            return SymbolKind.Event;
        case 'struct':
        case 'Struct':
            return SymbolKind.Struct;
        case 'typedef':
        case 'TypeParameter':
            return SymbolKind.TypeParameter;
        case 'genvar':
        case 'Operator':
            return SymbolKind.Operator;
        case 'enum':
        case 'Enum':
            return SymbolKind.Enum;
        case 'modport':
        case 'Null':
            return SymbolKind.Null;
        case 'define':
        case 'property':
        case 'Property':
            return SymbolKind.Property;
        case 'wire':
        case 'reg':
        case 'bit':
        case 'logic':
        case 'int':
        case 'integer':
        case 'char':
        case 'time':
        case 'float':
        case 'Variable':
            return SymbolKind.Variable;
        case 'module': // It is important that modules don't share a case with any other kind for the module instantiator to work
            return SymbolKind.Enum;
        default:
            return SymbolKind.Field;
    }
    /* Unused/Free SymbolKind icons
        return SymbolKind.Number;
        return SymbolKind.Enum;
        return SymbolKind.EnumMember;
        return SymbolKind.Operator;
        return SymbolKind.Array;
    */
}
