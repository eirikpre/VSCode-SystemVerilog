import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import { detectContext, normalizeTypeName } from '../providers/CompletionItemProvider';

const examplesFolderLocation = '../../verilog-examples';

// --- Pure-logic unit tests (no indexing needed) -----------------------------

suite('Completion Context Tests', () => {
    test('test #1: detectContext classifies package / member / port / none', () => {
        assert.deepStrictEqual(detectContext('  x = mc_pkg::'), { kind: 'package', base: 'mc_pkg' });
        assert.deepStrictEqual(detectContext('  alias_a = s.'), { kind: 'member', base: 's' });
        assert.deepStrictEqual(detectContext('  mc_sub u_sub (.'), { kind: 'port', base: '' });
        assert.deepStrictEqual(detectContext('    .'), { kind: 'port', base: '' });
        // Comparison against a value (e.g. an enum value).
        assert.deepStrictEqual(detectContext('  if (fsm_state == '), { kind: 'value', base: 'fsm_state' });
        assert.deepStrictEqual(detectContext('  x = a != b'), { kind: 'value', base: 'a' });
        // A lone ':' (also a trigger char) must not be treated as package scope.
        assert.strictEqual(detectContext('  x = mc_pkg:'), null);
        // Plain text with no trigger.
        assert.strictEqual(detectContext('  logic foo'), null);
    });

    test('test #2: normalizeTypeName strips dims and package scope', () => {
        assert.strictEqual(normalizeTypeName('mc_struct_t'), 'mc_struct_t');
        assert.strictEqual(normalizeTypeName('mc_pkg::mc_struct_t'), 'mc_struct_t');
        assert.strictEqual(normalizeTypeName('logic [7:0]'), 'logic');
        assert.strictEqual(normalizeTypeName(''), '');
    });
});

// --- Provider integration tests (need the workspace index) ------------------

suite('Completion Provider Tests', () => {
    const uri = vscode.Uri.file(path.join(__dirname, examplesFolderLocation, 'member_completion.sv'));
    const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

    async function labelsAtOffset(offset: number): Promise<string[]> {
        const doc = await vscode.workspace.openTextDocument(uri);
        const position = doc.positionAt(offset);
        const list = (await vscode.commands.executeCommand(
            'vscode.executeCompletionItemProvider',
            uri,
            position
        )) as vscode.CompletionList;
        return (list?.items || []).map((i) => (typeof i.label === 'string' ? i.label : i.label.label));
    }

    // Position the cursor immediately after `after`.
    async function labelsAt(after: string): Promise<string[]> {
        const doc = await vscode.workspace.openTextDocument(uri);
        return labelsAtOffset(doc.getText().indexOf(after) + after.length);
    }

    // Position the cursor immediately before `before`.
    async function labelsBefore(before: string): Promise<string[]> {
        const doc = await vscode.workspace.openTextDocument(uri);
        return labelsAtOffset(doc.getText().indexOf(before));
    }

    suiteSetup(async () => {
        await vscode.commands.executeCommand('systemverilog.build_index');
        // Wait until the container types from this fixture are indexed.
        const deadline = Date.now() + 30000;
        while (Date.now() < deadline) {
            const syms = (await vscode.commands.executeCommand(
                'vscode.executeWorkspaceSymbolProvider',
                '¤mc_struct_t'
            )) as vscode.SymbolInformation[];
            if (syms && syms.length > 0) break;
            await waitFor(200);
        }
    });

    test('test #1: struct members after "s." (#82)', async () => {
        const labels = await labelsAt('alias_a = s.');
        assert.ok(labels.includes('alpha'), 'expected alpha; got ' + labels.join(','));
        assert.ok(labels.includes('beta'), 'expected beta; got ' + labels.join(','));
    });

    test('test #2: package members after "mc_pkg::"', async () => {
        const labels = await labelsAt('X = mc_pkg::');
        assert.ok(labels.includes('MC_PARAM'), 'expected MC_PARAM; got ' + labels.join(','));
        assert.ok(labels.includes('mc_struct_t'), 'expected mc_struct_t; got ' + labels.join(','));
    });

    test('test #3: class members after "c."', async () => {
        const labels = await labelsAt('alias_g = c.');
        assert.ok(labels.includes('gamma'), 'expected gamma; got ' + labels.join(','));
    });

    test('test #4: module ports after "(." in an instantiation', async () => {
        const labels = await labelsAt('u_sub (.');
        assert.ok(labels.includes('clk_in'), 'expected clk_in; got ' + labels.join(','));
        assert.ok(labels.includes('data_out'), 'expected data_out; got ' + labels.join(','));
    });

    test('test #5: enum values after "==" comparison', async () => {
        const labels = await labelsAt('fsm_state == ');
        assert.ok(labels.includes('RED'), 'expected RED; got ' + labels.join(','));
        assert.ok(labels.includes('GREEN'), 'expected GREEN; got ' + labels.join(','));
        assert.ok(labels.includes('BLUE'), 'expected BLUE; got ' + labels.join(','));
    });

    test('test #6: enum values as case-item labels', async () => {
        // Cursor at the start of the "RED:" label line (prefix is whitespace).
        const labels = await labelsBefore('RED:');
        assert.ok(labels.includes('RED'), 'expected RED; got ' + labels.join(','));
        assert.ok(labels.includes('GREEN'), 'expected GREEN; got ' + labels.join(','));
        assert.ok(labels.includes('BLUE'), 'expected BLUE; got ' + labels.join(','));
    });

    test('test #7: same-named type in another file is not merged in (scope)', async () => {
        // scope_a.sv and scope_b.sv both define `scope_color_e` with different
        // values. Completing in scope_a must only offer scope_a's values.
        const aUri = vscode.Uri.file(path.join(__dirname, examplesFolderLocation, 'scope_a.sv'));
        const doc = await vscode.workspace.openTextDocument(aUri);
        const offset = doc.getText().indexOf('a_state == ') + 'a_state == '.length;
        const list = (await vscode.commands.executeCommand(
            'vscode.executeCompletionItemProvider',
            aUri,
            doc.positionAt(offset)
        )) as vscode.CompletionList;
        const labels = (list?.items || []).map((i) => (typeof i.label === 'string' ? i.label : i.label.label));
        assert.ok(labels.includes('A_RED'), 'expected A_RED; got ' + labels.join(','));
        assert.ok(labels.includes('A_GREEN'), 'expected A_GREEN; got ' + labels.join(','));
        assert.ok(!labels.includes('B_BLUE'), 'must NOT include scope_b values; got ' + labels.join(','));
        assert.ok(!labels.includes('B_YELLOW'), 'must NOT include scope_b values; got ' + labels.join(','));
    });
});
