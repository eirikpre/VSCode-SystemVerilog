import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import { formatInstance } from '../providers/ModuleInstantiator';

const testFolderLocation = '../../../src/test/';

suite('ModuleInstantiator Tests', () => {
  test('test #1: formatInstance without parameters', async () => {
    let uri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.1.v`));
    let document = await vscode.workspace.openTextDocument(uri);

    // range of the module in the document
    let fullRange = new vscode.Range(
      document.positionAt(605),
      document.positionAt(1195),
    );

    var container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');

    uri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.2.v`));
    document = await vscode.workspace.openTextDocument(uri);

    fullRange = new vscode.Range(
      document.positionAt(155),
      document.positionAt(370),
    );

    var instance = document.getText(fullRange).replace((/\r\n|\n|\r/g), " ").trim();
    //replace multiple space with a single space
    instance = instance.replace(/ +/g, ' ');

    var actual_instance = undefined;

    try {
      actual_instance = formatInstance('adder', container).replace((/\r\n|\n|\r/g), " ").trim();
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }

    //replace multiple space with a single space
    actual_instance = actual_instance.replace(/ +/g, ' ');

    assert.equal(instance, actual_instance);
  });

  test('test #2: formatInstance with parameters', async () => {
    let uri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.1.v`));
    let document = await vscode.workspace.openTextDocument(uri);

    // range of the module in the document
    let fullRange = new vscode.Range(
      document.positionAt(1350),
      document.positionAt(2000),
    );

    var container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
    //replace multiple space with a single space
    container = container.replace(/ +/g, ' ');

    uri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.2.v`));
    document = await vscode.workspace.openTextDocument(uri);

    fullRange = new vscode.Range(
      document.positionAt(530),
      document.positionAt(820),
    );

    var instance = document.getText(fullRange).replace((/\r\n|\n|\r/g), " ").trim();
    //replace multiple space with a single space
    instance = instance.replace(/ +/g, ' ');

    var actual_instance = undefined;

    try {
      actual_instance = formatInstance('bar', container).replace((/\r\n|\n|\r/g), " ").trim();
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }

    //replace multiple space with a single space
    actual_instance = actual_instance.replace(/ +/g, ' ');

    assert.equal(instance, actual_instance);
  });


  test('test #3: formatInstance without parameters, ports in header', async () => {
    let uri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.1.v`));
    let document = await vscode.workspace.openTextDocument(uri);

    // range of the module in the document
    let fullRange = new vscode.Range(
      document.positionAt(2169),
      document.positionAt(2780),
    );

    var container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
    //replace multiple space with a single space
    container = container.replace(/ +/g, ' ');

    uri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.2.v`));
    document = await vscode.workspace.openTextDocument(uri);

    fullRange = new vscode.Range(
      document.positionAt(995),
      document.positionAt(1120),
    );

    var instance = document.getText(fullRange).replace((/\r\n|\n|\r/g), " ").trim();
    //replace multiple space with a single space
    instance = instance.replace(/ +/g, ' ');

    var actual_instance = undefined;

    try {
      actual_instance = formatInstance('akker', container).replace((/\r\n|\n|\r/g), " ").trim();
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }

    //replace multiple space with a single space
    actual_instance = actual_instance.replace(/ +/g, ' ');

    assert.equal(instance, actual_instance);
  });


  test('test #4: formatInstance with parameters, ports in header', async () => {
    let uri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.1.v`));
    let document = await vscode.workspace.openTextDocument(uri);

    // range of the module in the document
    let fullRange = new vscode.Range(
      document.positionAt(2950),
      document.positionAt(3700),
    );

    var container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
    //replace multiple space with a single space
    container = container.replace(/ +/g, ' ');

    uri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.2.v`));
    document = await vscode.workspace.openTextDocument(uri);

    fullRange = new vscode.Range(
      document.positionAt(1293),
      document.positionAt(1475),
    );

    var instance = document.getText(fullRange).replace((/\r\n|\n|\r/g), " ").trim();
    //replace multiple space with a single space
    instance = instance.replace(/ +/g, ' ');

    var actual_instance = undefined;

    try {
      actual_instance = formatInstance('accer', container).replace((/\r\n|\n|\r/g), " ").trim();
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }

    //replace multiple white spaces with a single space
    actual_instance = actual_instance.replace(/ +/g, ' ');

    assert.equal(instance, actual_instance);
  });


  test('test #5: formatInstance with defaulted parameters.', async () => {
    let uri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.1.v`));
    let document = await vscode.workspace.openTextDocument(uri);

    // range of the module in the document
    let fullRange = new vscode.Range(
      document.positionAt(3820),
      document.positionAt(4300),
    );

    var container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
    //replace multiple space with a single space
    container = container.replace(/ +/g, ' ');

    uri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.2.v`));
    document = await vscode.workspace.openTextDocument(uri);

    fullRange = new vscode.Range(
      document.positionAt(1660),
      document.positionAt(1833),
    );

    var instance = document.getText(fullRange).replace((/\r\n|\n|\r/g), " ").trim();
    //replace multiple space with a single space
    instance = instance.replace(/ +/g, ' ');

    var actual_instance = undefined;

    try {
      actual_instance = formatInstance('anner', container).replace((/\r\n|\n|\r/g), " ").trim();
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }

    //replace multiple white spaces with a single space
    actual_instance = actual_instance.replace(/ +/g, ' ');

    assert.equal(instance, actual_instance);
  });

  test('test #6: empty and undefined container/symbol scenarios', async () => {
    var actual_instance = undefined;

    //empty container with valid symbol
    try {
      actual_instance = formatInstance('bar', "");
      assert.equal(undefined, actual_instance);
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }

    //undefined container with valid symbol
    try {
      actual_instance = formatInstance('bar', undefined);
      assert.equal(undefined, actual_instance);
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }


    let uri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.1.v`));
    let document = await vscode.workspace.openTextDocument(uri);

    // range of the module in the document
    let fullRange = new vscode.Range(
      document.positionAt(1350),
      document.positionAt(2000),
    );

    var container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
    //replace multiple space with a single space
    container = container.replace(/ +/g, ' ');

    //empty symbol with valid container
    try {
      actual_instance = formatInstance("", container);
      assert.equal(undefined, actual_instance);
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }

    //undefined symbol with valid container
    try {
      actual_instance = formatInstance(undefined, container);
      assert.equal(undefined, actual_instance);
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }

    //empty symbol and container
    try {
      actual_instance = formatInstance("", "");
      assert.equal(undefined, actual_instance);
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }

    //undefined symbol and container
    try {
      actual_instance = formatInstance(undefined, undefined);
      assert.equal(undefined, actual_instance);
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }

    //valid symbol and null container
    try {
      actual_instance = formatInstance("bar", null);
      assert.equal(undefined, actual_instance);
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }

    //null symbol and container
    try {
      actual_instance = formatInstance(null, null);
      assert.equal(undefined, actual_instance);
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }

  });


  test('test #7: formatInstance golden output.', async () => {
    let uri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.1.v`));
    let document = await vscode.workspace.openTextDocument(uri);

    // range of the module in the document
    let fullRange = new vscode.Range(
      document.positionAt(5588),
      document.positionAt(6000),
    );

    var container = document.getText(fullRange).replace(/^\s+|\s+$/g, '');
    //replace multiple space with a single space
    container = container.replace(/ +/g, ' ');

    uri = vscode.Uri.file(path.join(`${__dirname + testFolderLocation}test-files/ModuleInstantiator.test.2.v`));
    document = await vscode.workspace.openTextDocument(uri);

    fullRange = new vscode.Range(
      document.positionAt(2759),
      document.positionAt(2988),
    );

    var instance = document.getText(fullRange);

    var actual_instance = undefined;

    try {
      actual_instance = formatInstance('golden', container);
    } catch (error) {
      assert.fail("formatInstance produced an error:" + error);
    }

    assert.equal(instance, actual_instance);
  });

});