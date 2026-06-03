import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';

const examplesFolderLocation = '../../verilog-examples';

suite('Folding Tests', () => {
    test('test #1: nested `ifdef/`elsif/`else/`endif fold with correct nesting (#142)', async () => {
        const uri = vscode.Uri.file(path.join(__dirname, examplesFolderLocation, 'ifdef_folding.sv'));
        await vscode.workspace.openTextDocument(uri);
        const ranges =
            ((await vscode.commands.executeCommand(
                'vscode.executeFoldingRangeProvider',
                uri
            )) as vscode.FoldingRange[]) || [];
        const dump = JSON.stringify(ranges.map((r) => [r.start, r.end]));
        const has = (start: number, end: number) => ranges.some((r) => r.start === start && r.end === end);

        // Each `ifdef/`ifndef folds to its own matching `endif, nested:
        //   guard [0,20] > class [2,19] > `ifdef A [4,17] > `ifdef B [6,12]
        assert.ok(has(6, 12), 'nested `ifdef B should fold to `endif // B [6,12]; got ' + dump);
        assert.ok(has(4, 17), '`ifdef A should fold to `endif // A [4,17]; got ' + dump);
        assert.ok(has(2, 19), 'class should fold to endclass [2,19]; got ' + dump);
        assert.ok(has(0, 20), '`ifndef guard should fold to its `endif [0,20]; got ' + dump);

        // `elsif/`else must not let a fold overrun its matching `endif.
        assert.ok(!ranges.some((r) => r.start === 6 && r.end > 12), 'nested `ifdef B must not overrun; got ' + dump);
        assert.ok(!ranges.some((r) => r.start === 4 && r.end > 17), '`ifdef A must not overrun; got ' + dump);
    });
});
