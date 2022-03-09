import * as assert from 'assert';
import * as path from 'path';
import { window, workspace, Uri, StatusBarAlignment, SymbolKind, Location, Range } from 'vscode';
import { SystemVerilogDocumentSymbolProvider } from '../providers/DocumentSymbolProvider';
import { SystemVerilogWorkspaceSymbolProvider } from '../providers/WorkspaceSymbolProvider';
import { SystemVerilogIndexer } from '../indexer';
import { SystemVerilogParser } from '../parser';
import { SystemVerilogSymbol } from '../symbol';

let docProvider: SystemVerilogDocumentSymbolProvider;
let symProvider: SystemVerilogWorkspaceSymbolProvider;
let indexer: SystemVerilogIndexer;
let parser: SystemVerilogParser;

let symbols: Map<string, Array<SystemVerilogSymbol>>;

const testFolderLocation = '../../src/test';

const uri = Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'ModuleInstantiator.test.1.v'));
const documentSymbols = ['adder', 'bar', 'akker', 'accer', 'anner', 'atter', 'apper', 'golden'];

const nonSVUri = Uri.file(path.join(__dirname, testFolderLocation, 'test-files', 'foo.txt'));

suite('indexer_map Tests', () => {
    test('test #1: addDocumentSymbols, removeDocumentSymbols', async () => {
        await setUp();

        const sVDocument = await workspace.openTextDocument(uri);
        const nonSVDocument = await workspace.openTextDocument(nonSVUri);

        assert.strictEqual(symbols.size, 4);
        let count = await indexer.addDocumentSymbols(sVDocument, symbols);

        assert.strictEqual(count, 8);
        assert.strictEqual(symbols.size, 5);
        assert.strictEqual(symbols.get(uri.fsPath).length, 8);
        assert.strictEqual(getSymbolsCount(), 21);

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
        assert.strictEqual(getSymbolsCount(), 21);

        // undefined/null document
        count = await indexer.addDocumentSymbols(undefined, symbols);
        assert.strictEqual(count, 0);
        assert.strictEqual(symbols.size, 5);
        assert.strictEqual(getSymbolsCount(), 21);

        count = await indexer.addDocumentSymbols(sVDocument, undefined);
        assert.strictEqual(count, 0);
        assert.strictEqual(symbols.size, 5);
        assert.strictEqual(getSymbolsCount(), 21);

        count = await indexer.addDocumentSymbols(undefined, undefined);
        assert.strictEqual(count, 0);
        assert.strictEqual(symbols.size, 5);
        assert.strictEqual(getSymbolsCount(), 21);

        count = await indexer.addDocumentSymbols(null, symbols);
        assert.strictEqual(count, 0);
        assert.strictEqual(symbols.size, 5);
        assert.strictEqual(getSymbolsCount(), 21);
    });

    test('test #2: removeDocumentSymbols', async () => {
        await setUp();

        const sVDocument = await workspace.openTextDocument(uri);
        const nonSVDocument = await workspace.openTextDocument(nonSVUri);

        assert.strictEqual(symbols.size, 4);
        let count = await indexer.addDocumentSymbols(sVDocument, symbols);

        assert.strictEqual(count, 8);
        assert.strictEqual(symbols.size, 5);
        assert.strictEqual(getSymbolsCount(), 21);

        count = indexer.removeDocumentSymbols(sVDocument.uri.fsPath, symbols);

        documentSymbols.forEach((symbolName) => {
            if (symbolExists(symbolName)) {
                assert.fail();
            }
        });

        assert.strictEqual(count, -8);
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
    });

    test('test #3: updateMostRecentModules', async () => {
        await setUp();

        indexer.NUM_FILES = 5;
        indexer.symbols = symbols;
        indexer.updateMostRecentSymbols(undefined);
        assert.strictEqual(indexer.mostRecentSymbols.length, 5);

        const recentSymbols = new Array<SystemVerilogSymbol>();
        const symbolInfo_1 = new SystemVerilogSymbol('symbolInfo_1', 'module', 'parent_module', undefined);
        const symbolInfo_2 = new SystemVerilogSymbol('symbolInfo_2', 'logic', 'parent_logic', undefined);
        const symbolInfo_3 = new SystemVerilogSymbol('symbolInfo_3', 'function', 'parent_function', undefined);
        const symbolInfo_4 = indexer.mostRecentSymbols[0];
        const symbolInfo_5 = indexer.mostRecentSymbols[1];

        recentSymbols.push(symbolInfo_1);
        recentSymbols.push(symbolInfo_2);
        recentSymbols.push(symbolInfo_3);

        indexer.updateMostRecentSymbols(recentSymbols);
        assert.strictEqual(indexer.mostRecentSymbols.length, 5);
        assert.strictEqual(indexer.mostRecentSymbols[0], symbolInfo_1);
        assert.strictEqual(indexer.mostRecentSymbols[1], symbolInfo_2);
        assert.strictEqual(indexer.mostRecentSymbols[2], symbolInfo_3);
        assert.strictEqual(indexer.mostRecentSymbols[3], symbolInfo_4);
        assert.strictEqual(indexer.mostRecentSymbols[4], symbolInfo_5);
    });
});

/**  
  Sets up the `symbols` map for testing.
*/
async function setUp() {
    const document = await workspace.openTextDocument(uri);

    const settings = workspace.getConfiguration();
    const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);

    parser = new SystemVerilogParser();
    indexer = new SystemVerilogIndexer(statusBar, parser, window.createOutputChannel('SystemVerilog'));
    docProvider = new SystemVerilogDocumentSymbolProvider(parser, indexer);
    symProvider = new SystemVerilogWorkspaceSymbolProvider(indexer);

    symbols = new Map<string, Array<SystemVerilogSymbol>>();

    const location = new Location(
        uri,
        new Range(document.positionAt(0), document.positionAt(document.getText().length))
    );

    // File_1
    const file_1 = path.join(__dirname, testFolderLocation, 'test-files', 'file_1.v');

    const list_1 = new Array<SystemVerilogSymbol>();
    // Add SystemVerilogSymbol objects to list_1
    const list_1_SymbolInfo_1 = new SystemVerilogSymbol('list_1_SymbolInfo_1', 'module', undefined, location);
    const list_1_SymbolInfo_2 = new SystemVerilogSymbol('list_1_SymbolInfo_2', 'logic', undefined, location);
    const list_1_SymbolInfo_3 = new SystemVerilogSymbol('list_1_SymbolInfo_3', 'function', undefined, location);
    const list_1_SymbolInfo_4 = new SystemVerilogSymbol('list_1_SymbolInfo_4', 'interface', undefined, location);

    list_1.push(list_1_SymbolInfo_1);
    list_1.push(list_1_SymbolInfo_2);
    list_1.push(list_1_SymbolInfo_3);
    list_1.push(list_1_SymbolInfo_4);

    // File_2
    const file_2 = path.join(__dirname, testFolderLocation, 'test-files', 'file_2.v');

    const list_2 = new Array<SystemVerilogSymbol>();
    // Add SystemVerilogSymbol objects to list_1
    const list_2_SymbolInfo_1 = new SystemVerilogSymbol('list_2_SymbolInfo_1', 'logic', undefined, location);
    const list_2_SymbolInfo_2 = new SystemVerilogSymbol('list_2_SymbolInfo_2', 'logic', undefined, location);
    const list_2_SymbolInfo_3 = new SystemVerilogSymbol('list_2_SymbolInfo_3', 'import', undefined, location);

    list_2.push(list_2_SymbolInfo_1);
    list_2.push(list_2_SymbolInfo_2);
    list_2.push(list_2_SymbolInfo_3);

    // File_3
    const file_3 = path.join(__dirname, testFolderLocation, 'test-files', 'file_3.v');

    const list_3 = new Array<SystemVerilogSymbol>();
    // Add SystemVerilogSymbol objects to list_1
    const list_3_SymbolInfo_1 = new SystemVerilogSymbol('list_3_SymbolInfo_1', 'logic', undefined, location);
    const list_3_SymbolInfo_2 = new SystemVerilogSymbol('list_3_SymbolInfo_2', 'logic', undefined, location);
    const list_3_SymbolInfo_3 = new SystemVerilogSymbol('list_3_SymbolInfo_3', 'module', undefined, location);
    const list_3_SymbolInfo_4 = new SystemVerilogSymbol('list_3_SymbolInfo_4', 'module', undefined, location);
    const list_3_SymbolInfo_5 = new SystemVerilogSymbol('list_3_SymbolInfo_5', 'module', undefined, location);
    const list_3_SymbolInfo_6 = new SystemVerilogSymbol('list_3_SymbolInfo_6', 'import', undefined, location);

    list_3.push(list_3_SymbolInfo_1);
    list_3.push(list_3_SymbolInfo_2);
    list_3.push(list_3_SymbolInfo_3);
    list_3.push(list_3_SymbolInfo_4);
    list_3.push(list_3_SymbolInfo_5);
    list_3.push(list_3_SymbolInfo_6);

    // File_4
    const file_4 = path.join(__dirname, testFolderLocation, 'test-files', 'file_4.v');

    const list_4 = new Array<SystemVerilogSymbol>();

    // Map the lists to the files
    symbols.set(file_1, list_1);
    symbols.set(file_2, list_2);
    symbols.set(file_3, list_3);
    symbols.set(file_4, list_4);
}

/**  
  Counts `SystemVerilogSymbol` objects in the `symbols` map.

  @return the symbols count
*/
function getSymbolsCount(): number {
    if (!symbols) {
        return 0;
    }

    let count = 0;

    symbols.forEach((list) => {
        count += list.length;
    });

    return count;
}

/**  
  Checks if a given `symbolName` exists in the `symbols` map.

  @param symbolName the symbol's name
  @return true if the symbol exists
*/
function symbolExists(symbolName: string): boolean {
    if (!symbols) {
        return false;
    }

    let exists = false;

    symbols.forEach((list) => {
        list.forEach((symbol: SystemVerilogSymbol) => {
            if (symbolName === symbol.name) {
                exists = true;
            }

            return false;
        });

        if (exists) {
            return false;
        }
    });

    return exists;
}
