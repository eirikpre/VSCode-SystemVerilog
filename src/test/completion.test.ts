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

    async function labelsAt(after: string): Promise<string[]> {
        const doc = await vscode.workspace.openTextDocument(uri);
        const offset = doc.getText().indexOf(after) + after.length;
        const position = doc.positionAt(offset);
        const list = (await vscode.commands.executeCommand(
            'vscode.executeCompletionItemProvider',
            uri,
            position
        )) as vscode.CompletionList;
        return (list?.items || []).map((i) => (typeof i.label === 'string' ? i.label : i.label.label));
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
});
