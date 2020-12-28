import { TreeDataProvider, TreeItem, EventEmitter, Event, TreeItemCollapsibleState, window } from 'vscode';
import { SystemVerilogDocumentSymbolProvider } from '../providers/DocumentSymbolProvider';

export class SystemVerilogTreeDataProvider implements TreeDataProvider<TreeItem> {
    private _onDidChangeTreeData: EventEmitter<any> = new EventEmitter<any>();
    readonly onDidChangeTreeData: Event<any> = this._onDidChangeTreeData.event;

    public getTreeItem(element: TreeItem): Promise<TreeItem> {
        return new Promise((resolve, _reject) => {
            resolve(element);
        });
    }

    public getChildren(element?: TreeItem): Thenable<TreeItem[]> {
        return new Promise((resolve, _reject) => {
            if (!element) {
                resolve([new TreeItem('testRoot', TreeItemCollapsibleState.Collapsed)]);
            } else {
                resolve([new TreeItem('testChild')]);
            }
        });
    }
}

export class SystemVerilogDocumentSymbolTreeProvider implements TreeDataProvider<TreeItem> {
    // TODO: Not updating when active file changes
    private _onDidChangeTreeData: EventEmitter<any> = new EventEmitter<any>();
    readonly onDidChangeTreeData: Event<any> = this._onDidChangeTreeData.event;

    private provider: SystemVerilogDocumentSymbolProvider;

    public getTreeItem(element: TreeItem): Promise<TreeItem> {
        return new Promise((resolve, _reject) => {
            resolve(element);
        });
    }

    public getChildren(element?: TreeItem): Thenable<TreeItem[]> {
        return new Promise((resolve, _reject) => {
            let items = [];
            if (!element) {
                this.provider.provideDocumentSymbols(window.activeTextEditor.document).then((symbols) => {
                    symbols.forEach((symbol) => {
                        if (symbol.containerName == '') {
                            let item = new TreeItem(symbol.name);
                            item.resourceUri = window.activeTextEditor.document.uri;
                            if (symbols.map((a) => a.containerName).indexOf(symbol.name) != 0) {
                                item.collapsibleState = TreeItemCollapsibleState.Collapsed;
                            }
                            items.push(item);
                        }
                    });
                });
            } else {
                this.provider.provideDocumentSymbols(window.activeTextEditor.document).then((symbols) => {
                    symbols.forEach((symbol) => {
                        if (element.label == symbol.containerName) {
                            let item = new TreeItem(symbol.name);
                            item.resourceUri = window.activeTextEditor.document.uri;
                            item.id = symbol.location.uri.toString();
                            item.id += ',line:' + symbol.location.range.start.line.toString();
                            item.id += ',char:' + symbol.location.range.start.line.toString();
                            if (symbols.map((a) => a.containerName).indexOf(symbol.name) != -1) {
                                item.collapsibleState = TreeItemCollapsibleState.Collapsed;
                            }
                            items.push(item);
                        }
                    });
                });
            }
            resolve(items);
        });
    }
}
