import * as assert from 'assert';
import * as path from 'path';
import {
  window,
  workspace,
  Uri,
  SymbolInformation,
  StatusBarAlignment,
  SymbolKind,
  Location,
  Range
} from 'vscode';
import { SystemVerilogDocumentSymbolProvider } from '../providers/DocumentSymbolProvider';
import { SystemVerilogWorkspaceSymbolProvider } from '../providers/WorkspaceSymbolProvider';
import { SystemVerilogIndexer } from '../indexer';
import { SystemVerilogParser } from '../parser';

let docProvider: SystemVerilogDocumentSymbolProvider;
let symProvider: SystemVerilogWorkspaceSymbolProvider;
let indexer: SystemVerilogIndexer;
let parser: SystemVerilogParser;

let symbols: Map<string, Array<SymbolInformation>>;

const testFolderLocation = '../../../src/test/';

let uri = Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.1.v`));
let documentSymbols = ["adder", "bar", "akker", "accer", "anner", "atter", "apper", "golden"];

let nonSVUri = Uri.file(path.join(`${__dirname + testFolderLocation}test-files/foo.txt`));

suite('indexer_map Tests', () => {

  test('test #1: addDocumentSymbols, removeDocumentSymbols', async () => {
    await setUp();

    const sVDocument = await workspace.openTextDocument(uri);
    const nonSVDocument = await workspace.openTextDocument(nonSVUri);

    assert.equal(symbols.size, 4);
    let count = await indexer.addDocumentSymbols(sVDocument, symbols);

    assert.equal(count, 8);
    assert.equal(symbols.size, 5);
    assert.equal(symbols.get(uri.fsPath).length, 8);
    assert.equal(getSymbolsCount(), 21);

    documentSymbols.forEach((symbolName) => {
      if (!symbolExists(symbolName)) {
        assert.fail();
      }
    });

    //non SV document
    count = await indexer.addDocumentSymbols(nonSVDocument, symbols);
    assert.equal(count, 0);
    assert.equal(symbols.size, 5);
    assert.equal(symbols.get(nonSVUri.fsPath), undefined);
    assert.equal(getSymbolsCount(), 21);

    //undefined/null document
    count = await indexer.addDocumentSymbols(undefined, symbols);
    assert.equal(count, 0);
    assert.equal(symbols.size, 5);
    assert.equal(getSymbolsCount(), 21);

    count = await indexer.addDocumentSymbols(sVDocument, undefined);
    assert.equal(count, 0);
    assert.equal(symbols.size, 5);
    assert.equal(getSymbolsCount(), 21);

    count = await indexer.addDocumentSymbols(undefined, undefined);
    assert.equal(count, 0);
    assert.equal(symbols.size, 5);
    assert.equal(getSymbolsCount(), 21);

    count = await indexer.addDocumentSymbols(null, symbols);
    assert.equal(count, 0);
    assert.equal(symbols.size, 5);
    assert.equal(getSymbolsCount(), 21);
  });

  test('test #2: removeDocumentSymbols', async () => {
    await setUp();

    const sVDocument = await workspace.openTextDocument(uri);
    const nonSVDocument = await workspace.openTextDocument(nonSVUri);

    assert.equal(symbols.size, 4);
    let count = await indexer.addDocumentSymbols(sVDocument, symbols);

    assert.equal(count, 8);
    assert.equal(symbols.size, 5);
    assert.equal(getSymbolsCount(), 21);

    count = indexer.removeDocumentSymbols(sVDocument.uri.fsPath, symbols);

    documentSymbols.forEach((symbolName) => {
      if (symbolExists(symbolName)) {
        assert.fail();
      }
    });

    assert.equal(count, -8);
    assert.equal(symbols.size, 4);
    assert.equal(getSymbolsCount(), 13);

    //non SV document
    count = indexer.removeDocumentSymbols(nonSVDocument.uri.fsPath, symbols);
    assert.equal(count, 0);
    assert.equal(symbols.size, 4);
    assert.equal(getSymbolsCount(), 13);

    //undefined/null document
    count = indexer.removeDocumentSymbols(undefined, symbols);
    assert.equal(count, 0);
    assert.equal(symbols.size, 4);
    assert.equal(getSymbolsCount(), 13);

    count = indexer.removeDocumentSymbols(sVDocument.uri.fsPath, undefined);
    assert.equal(count, 0);
    assert.equal(symbols.size, 4);
    assert.equal(getSymbolsCount(), 13);

    count = indexer.removeDocumentSymbols(undefined, undefined);
    assert.equal(count, 0);
    assert.equal(symbols.size, 4);
    assert.equal(getSymbolsCount(), 13);

    count = indexer.removeDocumentSymbols(null, symbols);
    assert.equal(count, 0);
    assert.equal(symbols.size, 4);
    assert.equal(getSymbolsCount(), 13);
  });

  test('test #3: updateMostRecentModules', async () => {
    await setUp();

    indexer.NUM_FILES = 5;
    indexer.symbols = symbols;
    indexer.updateMostRecentSymbols(undefined);
    assert.equal(indexer.mostRecentSymbols.length, 5);

    let recentSymbols = new Array<SymbolInformation>();
    let symbolInfo_1 = new SymbolInformation("symbolInfo_1", SymbolKind.Variable, "module", undefined);
    let symbolInfo_2 = new SymbolInformation("symbolInfo_2", SymbolKind.Boolean, "logic", undefined);
    let symbolInfo_3 = new SymbolInformation("symbolInfo_3", SymbolKind.Function, "function", undefined);
    let symbolInfo_4 = indexer.mostRecentSymbols[0];
    let symbolInfo_5 = indexer.mostRecentSymbols[1];

    recentSymbols.push(symbolInfo_1);
    recentSymbols.push(symbolInfo_2);
    recentSymbols.push(symbolInfo_3);

    indexer.updateMostRecentSymbols(recentSymbols);
    assert.equal(indexer.mostRecentSymbols.length, 5);
    assert.equal(indexer.mostRecentSymbols[0], symbolInfo_1);
    assert.equal(indexer.mostRecentSymbols[1], symbolInfo_2);
    assert.equal(indexer.mostRecentSymbols[2], symbolInfo_3);
    assert.equal(indexer.mostRecentSymbols[3], symbolInfo_4);
    assert.equal(indexer.mostRecentSymbols[4], symbolInfo_5);
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
  indexer = new SystemVerilogIndexer(statusBar, parser, window.createOutputChannel("SystemVerilog"));
  docProvider = new SystemVerilogDocumentSymbolProvider(parser);
  symProvider = new SystemVerilogWorkspaceSymbolProvider(indexer);

  symbols = new Map<string, Array<SymbolInformation>>();

  let location = new Location(uri,
    new Range(document.positionAt(0),
      document.positionAt(document.getText().length)
    ));

  //file_1
  let file_1 = path.join(`${__dirname + testFolderLocation}test-files/file_1.v`);

  let list_1 = new Array<SymbolInformation>();
  //add symbolInformation objects to list_1
  let list_1_SymbolInfo_1 = new SymbolInformation("list_1_SymbolInfo_1", SymbolKind.Variable, "module", location);
  let list_1_SymbolInfo_2 = new SymbolInformation("list_1_SymbolInfo_2", SymbolKind.Boolean, "logic", location);
  let list_1_SymbolInfo_3 = new SymbolInformation("list_1_SymbolInfo_3", SymbolKind.Function, "function", location);
  let list_1_SymbolInfo_4 = new SymbolInformation("list_1_SymbolInfo_4", SymbolKind.Interface, "interface", location);

  list_1.push(list_1_SymbolInfo_1);
  list_1.push(list_1_SymbolInfo_2);
  list_1.push(list_1_SymbolInfo_3);
  list_1.push(list_1_SymbolInfo_4);

  //file_2
  let file_2 = path.join(`${__dirname + testFolderLocation}test-files/file_2.v`);

  let list_2 = new Array<SymbolInformation>();
  //add symbolInformation objects to list_1
  let list_2_SymbolInfo_1 = new SymbolInformation("list_2_SymbolInfo_1", SymbolKind.Boolean, "logic", location);
  let list_2_SymbolInfo_2 = new SymbolInformation("list_2_SymbolInfo_2", SymbolKind.Boolean, "logic", location);
  let list_2_SymbolInfo_3 = new SymbolInformation("list_2_SymbolInfo_3", SymbolKind.Package, "import", location);

  list_2.push(list_2_SymbolInfo_1);
  list_2.push(list_2_SymbolInfo_2);
  list_2.push(list_2_SymbolInfo_3);

  //file_3
  let file_3 = path.join(`${__dirname + testFolderLocation}test-files/file_3.v`);

  let list_3 = new Array<SymbolInformation>();
  //add symbolInformation objects to list_1
  let list_3_SymbolInfo_1 = new SymbolInformation("list_3_SymbolInfo_1", SymbolKind.Boolean, "logic", location);
  let list_3_SymbolInfo_2 = new SymbolInformation("list_3_SymbolInfo_2", SymbolKind.Boolean, "logic", location);
  let list_3_SymbolInfo_3 = new SymbolInformation("list_3_SymbolInfo_3", SymbolKind.Variable, "module", location);
  let list_3_SymbolInfo_4 = new SymbolInformation("list_3_SymbolInfo_4", SymbolKind.Variable, "module", location);
  let list_3_SymbolInfo_5 = new SymbolInformation("list_3_SymbolInfo_5", SymbolKind.Variable, "module", location);
  let list_3_SymbolInfo_6 = new SymbolInformation("list_3_SymbolInfo_6", SymbolKind.Package, "import", location);

  list_3.push(list_3_SymbolInfo_1);
  list_3.push(list_3_SymbolInfo_2);
  list_3.push(list_3_SymbolInfo_3);
  list_3.push(list_3_SymbolInfo_4);
  list_3.push(list_3_SymbolInfo_5);
  list_3.push(list_3_SymbolInfo_6);

  //file_4
  let file_4 = path.join(`${__dirname + testFolderLocation}test-files/file_4.v`);

  let list_4 = new Array<SymbolInformation>();

  //map the lists to the files
  symbols.set(file_1, list_1);
  symbols.set(file_2, list_2);
  symbols.set(file_3, list_3);
  symbols.set(file_4, list_4);

}

/**  
  Counts `SymbolInformation` objects in the `symbols` map.

  @return the symbols count
*/
function getSymbolsCount(): number {
  if (!symbols) {
    return 0;
  }

  let count = 0;

  symbols.forEach(list => {
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

  symbols.forEach(list => {
    list.forEach((symbol: SymbolInformation) => {
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