// Plain data types passed between the extension host and the indexer worker.
// No vscode imports — this module must remain loadable in a worker_threads
// context that has no access to the vscode runtime.

export type SymbolWire = {
    name: string;
    type: string;
    kind: number;
    container: string | null;
    file: string;
    sl: number;
    sc: number;
    el: number;
    ec: number;
};

export type UpsertParams = {
    path: string;
    mtimeMs: number;
    size: number;
    symbols: Array<Omit<SymbolWire, 'file'>>;
};

export type ParseAndUpsertParams = {
    path: string;
    mtimeMs: number;
    size: number;
    text: string;
    precision: string;
    maxDepth: number;
};

export type ParseTextParams = {
    path: string;
    text: string;
    precision: string;
    maxDepth: number;
};
