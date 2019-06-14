import { workspace } from 'vscode';
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
var processingState = Object.freeze({"INITIAL":1, "PARAMETERS":2, "PORTS":3, "COMPLETE":4});

/** 
 * key symbols 
 */
const ports_key_symbols = ["input", "output", "inout"];
const parameter_key_symbol = "parameter";

/**  
    Checks if symbol is a port.

    @param symbol the symbol
    @return true, if symbol is a port
*/
function isPortSymbol(symbol: string): boolean {
    let exists = false;

    ports_key_symbols.forEach(function (key) {
        if (symbol == key) {
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
    return symbol == parameter_key_symbol;
}

/**
 * Checks if the given key is empty
 * 
 * @param key the key
 * @return true, if the key is empty
*/
function isEmptyKey(key: string): boolean {
    if(key === undefined || key === null || key == "") {
        return true;
    }

    key = key.replace((/ +|\r\n|\n|\r/g), "");

    return key.length == 0;
}

/**  
    Checks if the module is parameterized.

    @param symbol the module's symbol
    @param container the module's container
    @return true, if the module is parameterized
*/
function moduleIsParameterized(symbol: string, container: string): boolean {
    if(symbol === undefined || symbol === null || symbol == "") {
        return false;
    }
    if(container === undefined || container === null || container == "") {
        return false;
    }

    //remove new lines
    container = container.replace(/\r\n|\n|\r/g, ' ');
    //surround '#(' with space
    container = container.replace(/#\(/g, ' #\( ');
    //replace multiple white spaces with a single whitespace
    container = container.replace(/  +/g, ' ');

    let keys = container.split(" ");
    if(keys.length < 3) {
        return false;
    }

    if(keys[0] == "module" && keys[1] == symbol && keys[2] == "#\(") {
        return true;
    }

    return false;
}


/**
 * Module instantiator class which queries a given module, fetches the relative container, and parses an instance.
*/
export class SystemVerilogModuleInstantiator {
    private workspaceSymbolProvider: SystemVerilogWorkspaceSymbolProvider;

    constructor(workspaceSymbolProvider: SystemVerilogWorkspaceSymbolProvider) {
        this.workspaceSymbolProvider = workspaceSymbolProvider;
    }

    /**  
        Uses the given symbol to query the module's definition, 
        and then return the module's instance.

        @param symbol the module's name
        @return the module's instance.
    */
    public auto_instantiate(symbol: string): Thenable <string> {
        return new Promise((resolve, reject) => {
            if(symbol === undefined || symbol === null || symbol == "") {
                reject(symbol + " is not a valid symbol.");
            }

            let symbols = this.workspaceSymbolProvider.provideWorkspaceModules(symbol);

            if (symbols === undefined) {
                reject(symbol + " module was not found in the workspace.");
            }

            let uri = symbols.location.uri;
            let range = symbols.location.range;
            workspace.openTextDocument(uri).then(doc => {
                let container = doc.getText(range);
                if (container === undefined || container === "" || container === null) {
                    reject(symbol + "'s definition is undefined in the workspace.");
                }

                let formatted = undefined;

                try {
                    formatted = formatInstance(symbol, container);
                } catch (error) {
                    console.log(error);
                    reject("An error occurred when formatting the instance for " + symbol + ": " + error);
                }

                if (formatted === undefined) {
                    reject("An error occurred when formatting the instance for " + symbol + ".");
                }

                resolve(formatted);
            })
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
    if(symbol === undefined || symbol === null || symbol == "") {
        return undefined;
    }
    if(container === undefined || container === null || container == "") {
        return undefined;
    }

    let original_container = container;
    container = cleanUpContainer(container);

    let isParameterized = moduleIsParameterized(symbol, original_container);
 
    let maxLength = findMaxLength(container, isParameterized);
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
    if(container === undefined || container === null || container == "") {
        return undefined;
    }

    //remove bit ranges
    container = container.replace(/(\[.+\])/g, '');

    //replace tabs with white space
    container = container.replace(/\t+/g, ' ');

    //surround ',' '=' '(' ')' '//' '/*' with whitespace
    container = container.replace(/,/g, ' , ');
    container = container.replace(/=/g, ' = ');
    container = container.replace(/\(/g, ' \( ');
    container = container.replace(/\)/g, ' \) ');
    container = container.replace(/\/\//g, ' \/\/ ');
    container = container.replace(/\/\*/g, ' \/\* ');

    //replace multiple white spaces with a single whitespace
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
    if(container === undefined || container === null || container == "") {
        return undefined;
    }

    let keys = container.split(" ");
    let output = [];
    let maxLength = 0;

    let lastPort = undefined;
    let lastParameter = undefined;
    let passedEqualSign = false;

    let state = processingState.INITIAL;

    for(let i = 0; i < keys.length; i++) {
        if(keys[i] == undefined) {
            continue;
        }

        //single comment
        if (keys[i] == "//") {
            i = getSingleComment(keys, output, i);
        }
        //block comment
        else if (keys[i] == "/*") {
            i = getBlockComment(keys, output, i);
        }
        else if(state == processingState.INITIAL) {
            if(keys[i] == "(") {
                if(moduleIsParameterized) {
                    state = processingState.PARAMETERS;
                }
                else {
                    state = processingState.PORTS;
                }
            }
        }
        else if(state == processingState.PARAMETERS) {
            if(keys[i] == ")") {
                state = processingState.PORTS;
            }
            else if (keys[i] == "," && lastParameter) {
                if(lastParameter.length > maxLength) {
                    maxLength = lastParameter.length;
                }
                lastParameter = undefined;
                passedEqualSign = false;
            }
            else if(keys[i] == "=") {
                passedEqualSign = true;
            }
            else if (!isParameterSymbol(keys[i]) && !isEmptyKey(keys[i])) {
                if(!passedEqualSign) {
                    lastParameter = keys[i].trim();
                }
            } 
        }
        else if(state == processingState.PORTS) {
            if(lastParameter) {
                if(lastParameter.length > maxLength) {
                    maxLength = lastParameter.length;
                }
                lastParameter = undefined;
            }

            if(keys[i] == ")") {
                state = processingState.COMPLETE;
            } else if(keys[i] == "," && lastPort) {
                if(lastPort.length > maxLength) {
                    maxLength = lastPort.length;
                }
                lastPort = undefined;
            } else if (!isPortSymbol(keys[i]) && !isEmptyKey(keys[i])) {
                lastPort = keys[i].trim();
            }
        }

        //last item
        if(i >= keys.length - 1) {
            if(state == processingState.PARAMETERS && lastParameter) {
                if(lastParameter.length > maxLength) {
                    maxLength = lastParameter.length;
                }
            }
            else if(state == processingState.PORTS && lastPort) {
                if(lastPort.length > maxLength) {
                    maxLength = lastPort.length;
                }
            }
        }

        if(state == processingState.COMPLETE) {
            if(lastPort) {
                if(lastPort.length > maxLength) {
                    maxLength = lastPort.length;
                }
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
    if(symbol === undefined || symbol === null || symbol == "") {
        return undefined;
    }
    if(container === undefined || container === null || container == "") {
        return undefined;
    }
    if(maxLength < 0) {
        return undefined;
    }

    let output = [];
    let keys = container.split(" ");

    let lastPort = undefined;
    let lastParameter = undefined;
    let lastParameterDefault = undefined;

    let passedEqualSign = false;

    let state = processingState.INITIAL;
 
    for(let i = 0; i < keys.length; i++) {
        if(keys[i] == undefined) {
            continue;
        }

        //single comment
        if (keys[i] == "//") {
            i = getSingleComment(keys, output, i);
        }
        //block comment
        else if (keys[i] == "/*") {
            i = getBlockComment(keys, output, i);
        }
        else if(state == processingState.INITIAL) {
            if(keys[i] == "(") {
                if(moduleIsParameterized) {
                    state = processingState.PARAMETERS;
                }
                else {
                    state = processingState.PORTS;
                }
            }
        }
        else if(state == processingState.PARAMETERS) {
            if(keys[i] == ")") {
                state = processingState.PORTS;
            }
            else if (keys[i] == "," && lastParameter) {
                //set with default value if it exists
                if (passedEqualSign) {
                    output.push("  ." + lastParameter + " ".repeat(maxLength - lastParameter.length) + " ".repeat(4) + "(");
                    output.push(lastParameterDefault + ")");
                    
                    passedEqualSign = false;
                } else {
                    output.push("  ." + lastParameter + " ".repeat(maxLength - lastParameter.length) + " ".repeat(4) + "(");
                    output.push(lastParameter + ")");
                }
                
                output.push(",\n");
                
                lastParameter = undefined;
            }
            else if(keys[i] == "=") {
                passedEqualSign = true;
            }
            else if (!isParameterSymbol(keys[i]) && !isEmptyKey(keys[i])) {
                if(passedEqualSign) {
                    lastParameterDefault = keys[i].trim();
                }
                else{
                    lastParameter = keys[i].trim();
                }
            } 
        }
        else if(state == processingState.PORTS) {
            if(lastParameter) {
                //set with default value if it exists
                if (passedEqualSign) {
                    output.push("  ." + lastParameter + " ".repeat(maxLength - lastParameter.length) + " ".repeat(4) + "(");
                    output.push(lastParameterDefault + ")\n");
                    
                    passedEqualSign = false;
                } else {
                    output.push("  ." + lastParameter + " ".repeat(maxLength - lastParameter.length) + " ".repeat(4) + "(");
                    output.push(lastParameter + ")\n");
                }
                output.push(") u_" + symbol + " (\n");
                
                lastParameter = undefined;
            }

            if(keys[i] == ")") {
                state = processingState.COMPLETE;
            } else if(keys[i] == "," && lastPort) {
                output.push("  ." + lastPort + " ".repeat(maxLength - lastPort.length) + " ".repeat(4) + "(" + lastPort + ")");
                output.push(",\r\n");
                
                lastPort = undefined;
            } else if (!isPortSymbol(keys[i]) && !isEmptyKey(keys[i])) {
                lastPort = keys[i].trim();
            }
        }

        //last item
        if(i >= keys.length - 1) {
            if(state == processingState.PARAMETERS && lastParameter) {
                //set with default value if it exists
                if (passedEqualSign) {
                    output.push("  ." + lastParameter + " ".repeat(maxLength - lastParameter.length) + " ".repeat(4) + "(");
                    output.push(lastParameterDefault + ")\n");
                    
                    passedEqualSign = false;
                } else {
                    output.push("  ." + lastParameter + " ".repeat(maxLength - lastParameter.length) + " ".repeat(4) + "(");
                    output.push(lastParameter + ")\n");
                }
            }
            else if(state == processingState.PORTS && lastPort) {
                output.push("  ." + lastPort + " ".repeat(maxLength - lastPort.length) + " ".repeat(4) + "(" + lastPort + ")");
                output.push("\r\n");
            }
        }

        if(state == processingState.COMPLETE) {
            if(lastPort) {
                output.push("  ." + lastPort + " ".repeat(maxLength - lastPort.length) + " ".repeat(4) + "(" + lastPort + ")");
                output.push("\r\n");
            }
            break;
        }
    }

    let instance = [];

    if (moduleIsParameterized) {
        instance.push(symbol + " #(\n");
        instance.push(output.join("") + ");");
    } else {
        instance.push(symbol + " u_" + symbol)
        instance.push(" (\n" + output.join("") + ");");
    }

    return instance.join("");
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
    if(keys === undefined || keys === null) {
        return undefined;
    }
    if(output === undefined || output === null) {
        return undefined;
    }
    if(i < 0 || i > keys.length) {
        return undefined;
    }
    
    output.push("  " + keys[i]);
            
    if(!keys[i].includes("\n") && !keys[i].includes("\r")) {
        i++;
        while (i < keys.length && !keys[i].includes("\n") && !keys[i].includes("\r")) {
            output.push(" " + keys[i]);
            i++;
        }

        if(i < keys.length) {
            output.push(" " + keys[i]);
        }
        else{
            output.push("\n");
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
    if(keys === undefined || keys === null) {
        return undefined;
    }
    if(output === undefined || output === null) {
        return undefined;
    }
    if(i < 0 || i > keys.length) {
        return undefined;
    }
    
    output.push("  " + keys[i]);
    i++;
    while (i < keys.length && !(keys[i].trim()).includes("*/")) {
        //if there is an upcoming new line of comments, add padding
        if (/\r|\n/.exec(keys[i])) {
            output.push(" " + keys[i]);
            i++;
            if(i < keys.length) {
                output.push("  " + keys[i]);
            }
        } else {
            output.push(" " + keys[i]);
        }

        i++;
    }

    if(i < keys.length) {
        output.push("  " + keys[i]);
    }

    return i;
}