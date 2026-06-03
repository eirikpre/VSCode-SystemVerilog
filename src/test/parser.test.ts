import * as assert from 'assert';
import { SystemVerilogParser, StringSource } from '../parser-core';

function symbols(text: string) {
    return new SystemVerilogParser().parse(new StringSource(text, '/tmp/x.sv'), 'full', 10);
}
function moduleNames(text: string): string[] {
    return symbols(text)
        .filter((s) => s.type === 'module')
        .map((s) => s.name);
}

suite('Parser Tests', () => {
    test('test #1: module with a package import in the header is indexed (#189)', () => {
        const text =
            'module foo\n  import foo_pkg::*;\n#(parameter z = 1) (\n  input logic x,\n  output logic y\n);\nendmodule\n';
        assert.deepStrictEqual(moduleNames(text), ['foo']);
    });

    test('test #2: module with a comment in the header is indexed (#189)', () => {
        const text =
            'module foo //this comment used to break the parser\n#(parameter z = 1) (\n  input x\n);\nendmodule\n';
        assert.deepStrictEqual(moduleNames(text), ['foo']);
    });

    test('test #3: module with multiple/comma-separated imports is indexed (#189)', () => {
        const text =
            'module foo\n  import a_pkg::*;\n  import b_pkg::item, c_pkg::*;\n#(parameter z = 1)(input x);\nendmodule\n';
        assert.deepStrictEqual(moduleNames(text), ['foo']);
    });

    test('test #4: a plain module still indexes its params and ports', () => {
        const text = 'module foo #(parameter z = 1)(input logic x, output logic y);\nendmodule\n';
        const syms = symbols(text);
        assert.ok(
            syms.some((s) => s.type === 'module' && s.name === 'foo'),
            'module foo indexed'
        );
        assert.ok(
            syms.some((s) => s.name === 'z' && s.container === 'foo'),
            'parameter z under foo'
        );
        assert.ok(
            syms.some((s) => s.name === 'x' && s.container === 'foo'),
            'port x under foo'
        );
        assert.ok(
            syms.some((s) => s.name === 'y' && s.container === 'foo'),
            'port y under foo'
        );
    });

    test('test #5: a module with an import header still indexes its params and ports (#189)', () => {
        const text =
            'module foo\n  import foo_pkg::*;\n#(parameter z = 1) (\n  input logic x,\n  output logic y\n);\nendmodule\n';
        const syms = symbols(text);
        assert.ok(
            syms.some((s) => s.name === 'z' && s.container === 'foo'),
            'parameter z under foo'
        );
        assert.ok(
            syms.some((s) => s.name === 'x' && s.container === 'foo'),
            'port x under foo'
        );
        assert.ok(
            syms.some((s) => s.name === 'y' && s.container === 'foo'),
            'port y under foo'
        );
    });

    test('test #6: enum values are indexed as members of the enum type (#82)', () => {
        const text = 'package p;\n  typedef enum logic [1:0] { RED, GREEN = 2, BLUE } color_e;\nendpackage\n';
        const syms = symbols(text);
        const values = syms.filter((s) => s.container === 'color_e').map((s) => s.name);
        assert.deepStrictEqual(values, ['RED', 'GREEN', 'BLUE']);
        assert.ok(
            syms.every((s) => s.type !== 'enum_value' || s.container === 'color_e'),
            'enum values are contained by the enum type'
        );
    });
});
