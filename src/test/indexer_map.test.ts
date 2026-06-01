import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { window, workspace, Uri, StatusBarAlignment, Location, Range } from 'vscode';
import { SystemVerilogIndexer } from '../indexer';
import { SystemVerilogSymbol, symbolToWire } from '../symbol';
import { IndexerClient } from '../utils/indexer-client';

let indexer: SystemVerilogIndexer;
let client: IndexerClient;

const testFolderLocation = '../../src/test';

const uri = Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
const documentSymbols = ['adder', 'bar', 'akker', 'accer', 'anner', 'atter', 'apper', 'golden', 'abber', 'affer'];

const nonSVUri = Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'foo.txt'));

async function countSymbols(): Promise<number> {
    return client.count();
}

async function symbolExists(name: string): Promise<boolean> {
    const rows = await client.queryByName(name);
    return rows.length > 0;
}

suite('indexer_map Tests', () => {
    test('test #1: processFile adds symbols, onDelete removes them', async () => {
        await setUp();

        await indexer.processFile(uri);
        const rowsAfterAdd = await client.getFileSymbols(uri.fsPath);
        assert.ok(rowsAfterAdd.length >= documentSymbols.length, `expected at least ${documentSymbols.length} symbols`); // prettier-ignore

        for (const name of documentSymbols) {
            // eslint-disable-next-line no-await-in-loop
            assert.strictEqual(await symbolExists(name), true, `symbol '${name}' should exist after processFile`);
        }

        // Non-SV document is a no-op via onChange's language gate.
        const nonSVDocument = await workspace.openTextDocument(nonSVUri);
        await indexer.onChange(nonSVDocument);
        const meta = await client.getFileMeta([nonSVUri.fsPath]);
        assert.strictEqual(meta[nonSVUri.fsPath], undefined);

        assert.strictEqual(symbols.size, 4);
        let count = await indexer.addDocumentSymbols(sVDocument, symbols);

        assert.strictEqual(count, 12);
        assert.strictEqual(symbols.size, 5);
        assert.strictEqual(symbols.get(uri.fsPath).length, 12);
        assert.strictEqual(getSymbolsCount(), 25);

        documentSymbols.forEach((symbolName) => {
            if (!symbolExists(symbolName)) {
                assert.fail();
            }
        });

        // Non-SV document
        count = await indexer.addDocumentSymbols(nonSVDocument, symbols);
        assert.strictEqual(count, 0);
        assert.strictEqual(symbols.size, 5);
        assert.strictEqual(symbols.get(nonSVUri.fsPath), undefined);
        assert.strictEqual(getSymbolsCount(), 25);

        // undefined/null document
        count = await indexer.addDocumentSymbols(undefined, symbols);
        assert.strictEqual(count, 0);
        assert.strictEqual(symbols.size, 5);
        assert.strictEqual(getSymbolsCount(), 25);

        count = await indexer.addDocumentSymbols(sVDocument, undefined);
        assert.strictEqual(count, 0);
        assert.strictEqual(symbols.size, 5);
        assert.strictEqual(getSymbolsCount(), 25);

        count = await indexer.addDocumentSymbols(undefined, undefined);
        assert.strictEqual(count, 0);
        assert.strictEqual(symbols.size, 5);
        assert.strictEqual(getSymbolsCount(), 25);

        count = await indexer.addDocumentSymbols(null, symbols);
        assert.strictEqual(count, 0);
        assert.strictEqual(symbols.size, 5);
        assert.strictEqual(getSymbolsCount(), 25);
        // Removing the indexed file clears its symbols.
        await indexer.onDelete(uri);
        const rowsAfterDel = await client.getFileSymbols(uri.fsPath);
        assert.strictEqual(rowsAfterDel.length, 0);
        for (const name of documentSymbols) {
            // eslint-disable-next-line no-await-in-loop
            assert.strictEqual(await symbolExists(name), false, `symbol '${name}' should be gone after onDelete`);
        }
    });

    test('test #2: deleteFile removes only the targeted file', async () => {
        await setUp();

        await indexer.processFile(uri);
        const fixtureCount = await countSymbols();
        const fileRows = (await client.getFileSymbols(uri.fsPath)).length;
        assert.ok(fileRows > 0, 'expected processFile to insert rows');

        assert.strictEqual(symbols.size, 4);
        let count = await indexer.addDocumentSymbols(sVDocument, symbols);

        assert.strictEqual(count, 12);
        assert.strictEqual(symbols.size, 5);
        assert.strictEqual(getSymbolsCount(), 25);

        count = indexer.removeDocumentSymbols(sVDocument.uri.fsPath, symbols);

        documentSymbols.forEach((symbolName) => {
            if (symbolExists(symbolName)) {
                assert.fail();
            }
        });

        assert.strictEqual(count, -12);
        assert.strictEqual(symbols.size, 4);
        assert.strictEqual(getSymbolsCount(), 13);

        // Non-SV document
        count = indexer.removeDocumentSymbols(nonSVDocument.uri.fsPath, symbols);
        assert.strictEqual(count, -0);
        assert.strictEqual(symbols.size, 4);
        assert.strictEqual(getSymbolsCount(), 13);

        // undefined/null document
        count = indexer.removeDocumentSymbols(undefined, symbols);
        assert.strictEqual(count, 0);
        assert.strictEqual(symbols.size, 4);
        assert.strictEqual(getSymbolsCount(), 13);

        count = indexer.removeDocumentSymbols(sVDocument.uri.fsPath, undefined);
        assert.strictEqual(count, 0);
        assert.strictEqual(symbols.size, 4);
        assert.strictEqual(getSymbolsCount(), 13);

        count = indexer.removeDocumentSymbols(undefined, undefined);
        assert.strictEqual(count, 0);
        assert.strictEqual(symbols.size, 4);
        assert.strictEqual(getSymbolsCount(), 13);

        count = indexer.removeDocumentSymbols(null, symbols);
        assert.strictEqual(count, 0);
        assert.strictEqual(symbols.size, 4);
        assert.strictEqual(getSymbolsCount(), 13);
        await client.deleteFile(uri.fsPath);
        assert.strictEqual((await client.getFileSymbols(uri.fsPath)).length, 0);
        assert.strictEqual(await countSymbols(), fixtureCount - fileRows);
    });

    test('test #3: updateMostRecentSymbols populates from index and splices', async () => {
        await setUp();

        indexer.NUM_FILES = 5;
        await indexer.updateMostRecentSymbols(undefined);
        assert.strictEqual(indexer.mostRecentSymbols.length, 5);

        const recentSymbols = new Array<SystemVerilogSymbol>();
        const dummyLoc = new Location(uri, new Range(0, 0, 0, 0));
        const symbolInfo1 = new SystemVerilogSymbol('symbolInfo1', 'module', 'parent_module', dummyLoc);
        const symbolInfo2 = new SystemVerilogSymbol('symbolInfo2', 'logic', 'parent_logic', dummyLoc);
        const symbolInfo3 = new SystemVerilogSymbol('symbolInfo3', 'function', 'parent_function', dummyLoc);
        const symbolInfo4 = indexer.mostRecentSymbols[0];
        const symbolInfo5 = indexer.mostRecentSymbols[1];

        recentSymbols.push(symbolInfo1);
        recentSymbols.push(symbolInfo2);
        recentSymbols.push(symbolInfo3);

        await indexer.updateMostRecentSymbols(recentSymbols);
        assert.strictEqual(indexer.mostRecentSymbols.length, 5);
        assert.strictEqual(indexer.mostRecentSymbols[0], symbolInfo1);
        assert.strictEqual(indexer.mostRecentSymbols[1], symbolInfo2);
        assert.strictEqual(indexer.mostRecentSymbols[2], symbolInfo3);
        assert.strictEqual(indexer.mostRecentSymbols[3], symbolInfo4);
        assert.strictEqual(indexer.mostRecentSymbols[4], symbolInfo5);
    });
});

/**
  Sets up the indexer with an in-memory SQLite index pre-populated with four
  fixture files (mirroring the legacy Map-based fixture).
*/
async function setUp() {
    const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);

    const storageDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sv-index-test-'));
    client = new IndexerClient({ storageDir, inProcess: true });
    await client.whenReady();
    await client.clearAll();

    indexer = new SystemVerilogIndexer(statusBar, window.createOutputChannel('SystemVerilog'), client); // prettier-ignore
    indexer.initialize();

    const document = await workspace.openTextDocument(uri);
    const location = new Location(
        uri,
        new Range(document.positionAt(0), document.positionAt(document.getText().length))
    );

    // File_1
    const file1 = path.join(__dirname, testFolderLocation, 'test-files', 'file_1.v');
    const list1 = [
        new SystemVerilogSymbol('list_1_SymbolInfo_1', 'module', undefined, location),
        new SystemVerilogSymbol('list_1_SymbolInfo_2', 'logic', undefined, location),
        new SystemVerilogSymbol('list_1_SymbolInfo_3', 'function', undefined, location),
        new SystemVerilogSymbol('list_1_SymbolInfo_4', 'interface', undefined, location)
    ];

    // File_2
    const file2 = path.join(__dirname, testFolderLocation, 'test-files', 'file_2.v');
    const list2 = [
        new SystemVerilogSymbol('list_2_SymbolInfo_1', 'logic', undefined, location),
        new SystemVerilogSymbol('list_2_SymbolInfo_2', 'logic', undefined, location),
        new SystemVerilogSymbol('list_2_SymbolInfo_3', 'import', undefined, location)
    ];

    // File_3
    const file3 = path.join(__dirname, testFolderLocation, 'test-files', 'file_3.v');
    const list3 = [
        new SystemVerilogSymbol('list_3_SymbolInfo_1', 'logic', undefined, location),
        new SystemVerilogSymbol('list_3_SymbolInfo_2', 'logic', undefined, location),
        new SystemVerilogSymbol('list_3_SymbolInfo_3', 'module', undefined, location),
        new SystemVerilogSymbol('list_3_SymbolInfo_4', 'module', undefined, location),
        new SystemVerilogSymbol('list_3_SymbolInfo_5', 'module', undefined, location),
        new SystemVerilogSymbol('list_3_SymbolInfo_6', 'import', undefined, location)
    ];

    // File_4 (empty)
    const file4 = path.join(__dirname, testFolderLocation, 'test-files', 'file_4.v');

    await client.upsertFileNow({ path: file1, mtimeMs: 1, size: 1, symbols: list1.map(symbolToWire) });
    await client.upsertFileNow({ path: file2, mtimeMs: 1, size: 1, symbols: list2.map(symbolToWire) });
    await client.upsertFileNow({ path: file3, mtimeMs: 1, size: 1, symbols: list3.map(symbolToWire) });
    await client.upsertFileNow({ path: file4, mtimeMs: 1, size: 1, symbols: [] });
}
