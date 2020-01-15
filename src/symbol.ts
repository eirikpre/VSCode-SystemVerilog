import { SymbolInformation, SymbolKind, Location } from "vscode";

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

// See docs/SymbolKind_icons.png for an overview of the available icons
// Use show_SymbolKinds to see the latest symbols
export function getSymbolKind(name: string): SymbolKind {
    if (name === undefined || name === '') { // Ports may be declared without type
        return SymbolKind.Variable;
    } else if (name.indexOf('[') != -1) {
        return  SymbolKind.Array;
    }
    switch (name) {
        case 'parameter':
        case 'localparam': return SymbolKind.Constant;
        case 'package':
        case 'program':
        case 'import': return SymbolKind.Package;
        case 'begin': // Labels
        case 'string': return SymbolKind.String;
        case 'class': return SymbolKind.Class;
        case 'task': return SymbolKind.Method;
        case 'function': return SymbolKind.Function;
        case 'interface': return SymbolKind.Interface;
        case 'assert':
        case 'event': return SymbolKind.Event;
        case 'struct': return SymbolKind.Struct;
        case 'typedef': return SymbolKind.TypeParameter;
        case 'genvar': return SymbolKind.Operator;
        case 'enum': return SymbolKind.Enum;
        case 'modport': return SymbolKind.Null;
        case 'define':
        case 'property': return SymbolKind.Property;
        case 'wire':
        case 'reg':
        case 'bit':
        case 'logic':
        case 'int':
        case 'integer':
        case 'char':
        case 'time':
        case 'float': return SymbolKind.Variable;
        case 'module':
        default: return SymbolKind.Field;
    }
    /* Unused/Free SymbolKind icons
        return SymbolKind.Number;
        return SymbolKind.Enum;
        return SymbolKind.EnumMember;
        return SymbolKind.Operator;
        return SymbolKind.Array;
    */
}