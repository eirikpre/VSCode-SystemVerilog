import { workspace, window, QuickPickOptions, QuickPickItem } from 'vscode';
import { SystemVerilogSymbol } from '../symbol';
import { SystemVerilogFormatProvider } from './FormatProvider';
import { SystemVerilogWorkspaceSymbolProvider } from './WorkspaceSymbolProvider';

/**
 * Processing states:
 * --------------------------------------------
 * INITIAL: before the ports/parameters header.
 * PARAMETERS: inside the parameters header.
 * PORTS: inside the ports header.
 * COMPLETE: processing is finished.
 * --------------------------------------------
 */
enum ProcessingState {
    INITIAL = 1,
    PARAMETERS = 2,
    PORTS = 3,
    COMPLETE = 4
}

/**
 * Key symbols
 */
const portsKeySymbols = ['input', 'output', 'inout'];
const parameterKeySymbol = 'parameter';

/**
 * Space padding
 */
const padding = ' '.repeat(workspace.getConfiguration(null, null).get('editor.tabSize'));

/**
 * Non-breaking white space
 */
const nonBreakingSpace = '\xa0';

/**
    Checks if symbol is a port.

    @param symbol the symbol
    @return true, if symbol is a port
*/
function isPortSymbol(symbol: string): boolean {
    if (isEmptyKey(symbol)) {
        return false;
    }

    let exists = false;

    symbol = symbol.trim();
    portsKeySymbols.forEach((key) => {
        if (symbol === key) {
            exists = true;
            return false;
        }
    });

    return exists;
}

/**
    Checks if symbol is a parameter.

    @param symbol the symbol
    @return true, if symbol is a parameter
*/
function isParameterSymbol(symbol: string): boolean {
    if (isEmptyKey(symbol)) {
        return false;
    }

    symbol = symbol.trim();

    return symbol === parameterKeySymbol;
}

/**
 * Checks if the given key is empty
 *
 * @param key the key
 * @return true, if the key is empty
 */
function isEmptyKey(key: string): boolean {
    if (key === undefined || key == null || key === '') {
        return true;
    }

    const regex = new RegExp(nonBreakingSpace, 'g');
    key = key.replace(regex, '');
    key = key.replace(/ +|\r\n|\n|\r/g, '');

    return key.length === 0;
}

/**
    Checks if the module is parameterized.

    @param symbol the module's symbol
    @param container the module's container
    @return true, if the module is parameterized
*/
function isModuleParameterized(symbol: string, container: string): boolean {
    if (isEmptyKey(symbol) || isEmptyKey(container)) {
        return false;
    }

    // Remove new lines
    container = container.replace(/\r\n|\n|\r/g, ' ');
    // Surround '#(' with space
    container = container.replace(/#\(/g, ' #( ');
    // Replace multiple white spaces with a single whitespace
    container = container.replace(/\t+/g, ' ');
    container = container.replace(/  +/g, ' ');

    const keys = container.split(' ');
    if (keys.length < 2) {
        return false;
    }

    if (keys[0] === symbol && keys[1] === '#(') {
        return true;
    }

    return false;
}

/**
 * Module instantiator class which queries a given module, fetches the relative container, and parses an instance.
 */
export class SystemVerilogModuleInstantiator {
    private formatProvider: SystemVerilogFormatProvider;
    private symbolProvider: SystemVerilogWorkspaceSymbolProvider;

    constructor(formatProvider: SystemVerilogFormatProvider, symbolProvider: SystemVerilogWorkspaceSymbolProvider) {
        this.formatProvider = formatProvider;
        this.symbolProvider = symbolProvider;
    }

    /**
        Uses the given symbol to query the module's definition,
        and then return the module's instance.

        @param query the module's name
        @return the module's instance.
    */
    public auto_instantiate(item: QuickPickItem): Thenable<string> {
        return new Promise((resolve, reject) =>
            // return this.workspaceSymbolProvider.provideWorkspaceSymbols(query, undefined, true)
            this.symbolProvider
                .getAllModules()
                .then((symbols: SystemVerilogSymbol[]) => {
                    const foundItem = symbols.find(
                        (value) =>
                            workspace.asRelativePath(value.location.uri) === item.description &&
                            value.name === item.label
                    );
                    if (foundItem) {
                        return foundItem;
                    }
                    reject(new Error(`${item.label} module was not found.`));
                })
                .then((s) => {
                    workspace.openTextDocument(s.location.uri).then((doc) => {
                        const container = doc.getText(s.location.range);

                        if (isEmptyKey(container)) {
                            reject(new Error(`${item.label}'s definition is undefined in the workspace.`));
                        }

                        let instance;

                        try {
                            instance = formatInstance(item.label, container);
                        } catch (error) {
                            console.log(error); // eslint-disable-line no-console
                            reject(
                                new Error(`An error occurred when formatting the instance for ${item.label}: ${error}`)
                            );
                        }

                        if (instance === undefined) {
                            reject(new Error(`An error occurred when formatting the instance for ${item.label}.`));
                        }

                        resolve(instance);
                    });
                })
        );
    }

    /**
        Gets module name from the user, and looks up in the workspaceSymbolProvider for a match.
        Looks up the module's definition, and parses it to build the module's instance.
        @return the module's instance, assigns the default parameter values.
    */
    public instantiateModule() {
        const options: QuickPickOptions = {
            canPickMany: false,
            placeHolder: 'Choose a module to instantiate...'
        };

        this.symbolProvider.getAllModules().then((modules) => {
            const choices: QuickPickItem[] = modules.map((item) => ({
                label: item.name,
                description: workspace.asRelativePath(item.location.uri)
            }));
            // request the module's name from the user
            window.showQuickPick(choices, options).then((value) => {
                if (!value) {
                    return;
                }
                // current editor
                const editor = window.activeTextEditor;

                // check if there is no selection
                if (editor.selection.isEmpty) {
                    if (editor) {
                        this.auto_instantiate(value).then(
                            (v) => {
                                editor
                                    .edit((editBuilder) => {
                                        editBuilder.replace(editor.selection, v);
                                    })
                                    .then(() => {
                                        this.formatProvider.provideDocumentRangeFormattingEdits(
                                            editor.document,
                                            editor.selection,
                                            null,
                                            null
                                        );
                                    });
                            },
                            (e) => {
                                window.showErrorMessage(e);
                            }
                        );
                    }
                }
            });
        });
    }
}

/**
    Uses the given symbol, and given container to format the module's instance.

    @param symbol string the module's name
    @container the module's container
    @return the module's instance.
    @throws Array Out of Bounds error with incorrect syntax
*/
export function formatInstance(symbol: string, container: string): string {
    if (isEmptyKey(symbol) || isEmptyKey(container)) {
        return undefined;
    }

    const originalContainer = container;
    container = cleanUpContainer(container);

    const isParameterized = isModuleParameterized(symbol, originalContainer);

    const maxLength = findMaxLength(container, isParameterized);
    container = parseContainer(symbol, container, isParameterized, maxLength);

    return container;
}

/**
 * Cleans up the container from extra characters, and surround delimiters with white space.
 *
 * @param container the module's container
 * @return cleaned up container.
 */
function cleanUpContainer(container: string): string {
    if (isEmptyKey(container)) {
        return undefined;
    }

    // Replace white space with non-breaking white space
    container = container.replace(/ /g, ` ${nonBreakingSpace} `);

    // Surround ',' '=' '(' ')' '//' '/*' with whitespace
    container = container.replace(/,/g, ' , ');
    container = container.replace(/=/g, ' = ');
    container = container.replace(/\(/g, ' ( ');
    container = container.replace(/\)/g, ' ) ');
    container = container.replace(/\/\//g, ' // ');
    container = container.replace(/\/\*/g, ' /* ');

    // Surround key symbols with space
    let regex;
    portsKeySymbols.forEach((key) => {
        regex = new RegExp(key, 'g');
        container = container.replace(regex, ` ${key} `);
    });

    regex = new RegExp(parameterKeySymbol, 'g');
    container = container.replace(regex, ` ${parameterKeySymbol} `);

    // Replace multiple white spaces with a single whitespace
    container = container.replace(/  +/g, ' ');
    container = container.trim();

    return container;
}

/**
 * Get the maximum length of the ports and parameters in the module container.
 *
 * @param container the module's container
 * @param moduleIsParameterized whether the module has parameters or not
 * @return the maximum length
 */
function findMaxLength(container: string, moduleIsParameterized: boolean): number {
    if (isEmptyKey(container)) {
        return undefined;
    }

    const keys = container.split(' ');
    const output = [];
    let maxLength = 0;

    // This is a bit funky, but the for loop below actually checks if these varaibles
    // are undefined so it is important that they are initialized as such
    let lastPort: string = undefined; // eslint-disable-line no-undef-init
    let lastParameter: string = undefined; // eslint-disable-line no-undef-init
    let passedEqualSign = false;

    let state = ProcessingState.INITIAL;

    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === undefined) {
            continue; // eslint-disable-line no-continue
        }

        // Single comment
        if (keys[i] === '//') {
            i = getSingleComment(keys, output, i);
        }
        // Block comment
        else if (keys[i] === '/*') {
            i = getBlockComment(keys, output, i);
        } else if (state === ProcessingState.INITIAL) {
            if (keys[i] === '(') {
                if (moduleIsParameterized) {
                    state = ProcessingState.PARAMETERS;
                } else {
                    state = ProcessingState.PORTS;
                }
            }
        } else if (state === ProcessingState.PARAMETERS) {
            if (keys[i] === ')') {
                state = ProcessingState.PORTS;
            } else if (keys[i] === ',' && lastParameter) {
                maxLength = Math.max(lastParameter.length, maxLength);
                lastParameter = undefined;
                passedEqualSign = false;
            } else if (keys[i] === '=') {
                passedEqualSign = true;
            } else if (!isParameterSymbol(keys[i]) && !isEmptyKey(keys[i])) {
                if (!passedEqualSign) {
                    lastParameter = keys[i].trim();
                }
            }
        } else if (state === ProcessingState.PORTS) {
            if (lastParameter) {
                maxLength = Math.max(lastParameter.length, maxLength);
                lastParameter = undefined;
            }

            if (keys[i] === ')') {
                state = ProcessingState.COMPLETE;
            } else if (keys[i] === ',' && lastPort) {
                maxLength = Math.max(lastPort.length, maxLength);
                lastPort = undefined;
            } else if (!isPortSymbol(keys[i]) && !isEmptyKey(keys[i])) {
                lastPort = keys[i].trim();
            }
        }

        // Last item
        if (i >= keys.length - 1) {
            if (state === ProcessingState.PARAMETERS && lastParameter) {
                maxLength = Math.max(lastParameter.length, maxLength);
            } else if (state === ProcessingState.PORTS && lastPort) {
                maxLength = Math.max(lastPort.length, maxLength);
            }
        }

        if (state === ProcessingState.COMPLETE) {
            if (lastPort) {
                maxLength = Math.max(lastPort.length, maxLength);
            }
            break;
        }
    }
    return maxLength;
}

/**
 * Parse the container, and create the module's instance.
 *
 * @param symbol the module's symbol
 * @param container the module's container
 * @param moduleIsParameterized whether the module has parameters or not
 * @param maxLength the maximum length of ports/parameters
 * @return the module's instance
 */
function parseContainer(symbol: string, container: string, moduleIsParameterized: boolean, maxLength: number): string {
    if (isEmptyKey(symbol) || isEmptyKey(container)) {
        return undefined;
    }
    if (maxLength < 0) {
        return undefined;
    }

    const output = [];
    const keys = container.split(' ');

    // This is a bit funky, but the for loop below actually checks if these varaibles
    // are undefined so it is important that they are initialized as such
    let lastPort: string = undefined; // eslint-disable-line no-undef-init
    let lastParameter: string = undefined; // eslint-disable-line no-undef-init
    let lastParameterDefault: string = undefined; // eslint-disable-line no-undef-init

    let passedEqualSign = false;

    let state = ProcessingState.INITIAL;

    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === undefined) {
            continue; // eslint-disable-line no-continue
        }

        // Single comment
        if (keys[i] === '//') {
            i = getSingleComment(keys, output, i);
        }
        // Block comment
        else if (keys[i] === '/*') {
            i = getBlockComment(keys, output, i);
        } else if (state === ProcessingState.INITIAL) {
            if (keys[i] === '(') {
                if (moduleIsParameterized) {
                    state = ProcessingState.PARAMETERS;
                } else {
                    state = ProcessingState.PORTS;
                }
            }
        } else if (state === ProcessingState.PARAMETERS) {
            if (keys[i] === ')') {
                state = ProcessingState.PORTS;
            } else if (keys[i] === ',' && lastParameter) {
                // Set with default value if it exists
                if (passedEqualSign) {
                    output.push(
                        `${padding}.${lastParameter}${' '.repeat(maxLength - lastParameter.length)}${' '.repeat(4)}(`
                    );
                    output.push(`${lastParameterDefault})`);

                    passedEqualSign = false;
                } else {
                    output.push(
                        `${padding}.${lastParameter}${' '.repeat(maxLength - lastParameter.length)}${' '.repeat(4)}(`
                    );
                    output.push(`${lastParameter})`);
                }

                output.push(',\n');

                lastParameter = undefined;
            } else if (keys[i] === '=') {
                passedEqualSign = true;
            } else if (!isParameterSymbol(keys[i]) && !isEmptyKey(keys[i])) {
                if (passedEqualSign) {
                    lastParameterDefault = keys[i].trim();
                } else {
                    lastParameter = keys[i].trim();
                }
            }
        } else if (state === ProcessingState.PORTS) {
            if (lastParameter) {
                // Set with default value if it exists
                if (passedEqualSign) {
                    output.push(
                        `${padding}.${lastParameter}${' '.repeat(maxLength - lastParameter.length)}${' '.repeat(4)}(`
                    );
                    output.push(`${lastParameterDefault})\n`);

                    passedEqualSign = false;
                } else {
                    output.push(
                        `${padding}.${lastParameter}${' '.repeat(maxLength - lastParameter.length)}${' '.repeat(4)}(`
                    );
                    output.push(`${lastParameter})\n`);
                }
                output.push(`) u_${symbol} (\n`);

                lastParameter = undefined;
            }

            if (keys[i] === ')') {
                state = ProcessingState.COMPLETE;
            } else if (keys[i] === ',' && lastPort) {
                output.push(
                    `${padding}.${lastPort}${' '.repeat(maxLength - lastPort.length)}${' '.repeat(4)}(${lastPort})`
                );
                output.push(',\n');

                lastPort = undefined;
            } else if (!isPortSymbol(keys[i]) && !isEmptyKey(keys[i])) {
                lastPort = keys[i].trim();
            }
        }

        // Last item
        if (i >= keys.length - 1) {
            if (state === ProcessingState.PARAMETERS && lastParameter) {
                // Set with default value if it exists
                if (passedEqualSign) {
                    output.push(
                        `${padding}.${lastParameter}${' '.repeat(maxLength - lastParameter.length)}${' '.repeat(4)}(`
                    );
                    output.push(`${lastParameterDefault})\n`);

                    passedEqualSign = false;
                } else {
                    output.push(
                        `${padding}.${lastParameter}${' '.repeat(maxLength - lastParameter.length)}${' '.repeat(4)}(`
                    );
                    output.push(`${lastParameter})\n`);
                }
            } else if (state === ProcessingState.PORTS && lastPort) {
                output.push(
                    `${padding}.${lastPort}${' '.repeat(maxLength - lastPort.length)}${' '.repeat(4)}(${lastPort})`
                );
                output.push('\n');
            }
        }

        if (state === ProcessingState.COMPLETE) {
            if (lastPort) {
                output.push(
                    `${padding}.${lastPort}${' '.repeat(maxLength - lastPort.length)}${' '.repeat(4)}(${lastPort})`
                );
                output.push('\n');
            }
            break;
        }
    }

    const instance = [];

    if (moduleIsParameterized) {
        instance.push(`${symbol} #(\n`);
        instance.push(`${output.join('')});`);
    } else {
        instance.push(`${symbol} u_${symbol}`);
        instance.push(` (\n${output.join('')});`);
    }

    return instance.join('');
}

/**
 * Parses a single comment from the container starting from a given index in keys.
 *
 * @param keys the container's keys.
 * @param output the array to add the single comment to
 * @param i the start index
 * @return the index where the single comment ends
 */
function getSingleComment(keys: string[], output: string[], i: number): number {
    if (!keys || !output) {
        return undefined;
    }
    if (i < 0 || i > keys.length) {
        return undefined;
    }

    const regex = new RegExp(nonBreakingSpace, 'g');

    output.push(padding + keys[i].replace(regex, ' '));

    if (!keys[i].includes('\n') && !keys[i].includes('\r')) {
        i += 1;
        while (i < keys.length && !keys[i].includes('\n') && !keys[i].includes('\r')) {
            output.push(keys[i].replace(regex, ' '));
            i += 1;
        }

        if (i < keys.length) {
            output.push(keys[i].replace(regex, ' '));
        } else {
            output.push('\n');
        }
    }

    return i;
}

/**
 * Parses a block comment from the container starting from a given index in keys.
 *
 * @param keys the container's keys.
 * @param output the array to add the block comment to
 * @param i the start index
 * @return the index where the block comment ends
 */
function getBlockComment(keys: string[], output: string[], i: number): number {
    if (!keys || !output) {
        return undefined;
    }
    if (i < 0 || i > keys.length) {
        return undefined;
    }

    const regex = new RegExp(nonBreakingSpace, 'g');

    output.push(padding + keys[i].replace(regex, ' '));

    i += 1;
    while (i < keys.length && !keys[i].trim().includes('*/')) {
        // If there is an upcoming new line of comments, add padding
        if (/\r|\n/.exec(keys[i])) {
            output.push(keys[i].replace(regex, ' '));
            i += 1;
            if (i < keys.length) {
                output.push(keys[i].replace(regex, ' '));
            }
        } else {
            output.push(keys[i].replace(regex, ' '));
        }

        i += 1;
    }

    if (i < keys.length) {
        output.push(keys[i].replace(regex, ' '));
    }

    return i;
}
