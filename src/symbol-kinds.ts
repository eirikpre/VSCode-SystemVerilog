// Numeric mirror of vscode's SymbolKind enum. Kept in sync manually so the
// parser-core / worker can return SymbolWire rows without importing vscode.
// The integer values match `vscode.SymbolKind`.

export const SymbolKind = {
    File: 0,
    Module: 1,
    Namespace: 2,
    Package: 3,
    Class: 4,
    Method: 5,
    Property: 6,
    Field: 7,
    Constructor: 8,
    Enum: 9,
    Interface: 10,
    Function: 11,
    Variable: 12,
    Constant: 13,
    String: 14,
    Number: 15,
    Boolean: 16,
    Array: 17,
    Object: 18,
    Key: 19,
    Null: 20,
    EnumMember: 21,
    Struct: 22,
    Event: 23,
    Operator: 24,
    TypeParameter: 25
} as const;

export function getSymbolKindInt(name: string): number {
    if (name === undefined || name === '') return SymbolKind.Variable;
    if (name.indexOf('[') !== -1) return SymbolKind.Array;
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
        case 'begin':
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
        case 'module':
            // Modules share the Enum icon so the module-instantiator can find them.
            return SymbolKind.Enum;
        default:
            return SymbolKind.Field;
    }
}
