import { workspace } from 'vscode';
import { SystemVerilogWorkspaceSymbolProvider } from './WorkspaceSymbolProvider';

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
    Checks if the container includes a port.

    @param container the container
    @return true, if container includes a port
*/
function includesPortSymbol(container: string): boolean {
    let includes = false;

    ports_key_symbols.forEach(function (key) {
        if (container.includes(key)) {
            includes = true;
            return false;
        }
    });

    return includes;
}

/**  
    Checks if the module is parameterized.

    @param symbol the module's symbol
    @param container the module's container
    @return true, if the module is parameterized
*/
function moduleIsParameterized(symbol: string, container: string): boolean {
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
    if (symbol === undefined || container === undefined) {
        return undefined;
    } else if (symbol === "" || container === "") {
        return undefined;
    } else if (symbol === null || container === null) {
        return undefined;
    }

    //remove bit ranges
    let original_container = container;
    container = container.replace(/(\[.+\])/g, '');

    //replace tabs with white space
    container = container.replace(/\t+/g, ' ');

    //surround ',' '=' '(' with whitespace
    container = container.replace(/,/g, ' , ');
    container = container.replace(/=/g, ' = ');
    container = container.replace(/\(/g, ' \( ');

    //replace multiple white spaces with a single whitespace
    container = container.replace(/  +/g, ' ');
    container = container.trim();

    let ports_container;
    let ports_declaration;
    let parameters_declaration = undefined;

    if (moduleIsParameterized(symbol, original_container)) {
        let parameters_container = container.split("(")[1].trim();
        //remove last ')'
        parameters_container = parameters_container.substring(0, parameters_container.lastIndexOf(")"));
        
        parameters_declaration = getParametersDeclaration(parameters_container);
        ports_container = container.split("(")[2];
    } else {
        ports_container = container.split("(")[1];
    }

    ports_container = ports_container.substring(0, ports_container.indexOf(");"));
    ports_container = ports_container.replace(/  +/g, ' ');

    //type declaration
    if (includesPortSymbol(ports_container)) {
        ports_declaration = getPortsDeclaration(ports_container, false);
    } else {
        ports_declaration = getPortsDeclaration(ports_container, true);
    }

    let instance = [];

    if (parameters_declaration !== undefined) {
        instance.push(symbol + " #(\n" + parameters_declaration + ") ");
        instance.push("u_" + symbol)
        instance.push(" (\n" + ports_declaration + ");");
    } else {
        instance.push(symbol + " u_" + symbol)
        instance.push(" (\n" + ports_declaration + ");");
    }

    return instance.join("");
}

/**  
    Uses the given ports container to define 
    the ports portion of the module's instance.

    @param ports_container the ports container.
    @container header the ports are declared in the header or not
    @return the ports declaration
    @throws Array Out of Bounds error with incorrect syntax
*/
function getPortsDeclaration(ports_container: string, header: boolean): string {
    if (ports_container === undefined) {
        return undefined;
    }

    let ports = [];

    ports_container = ports_container.trim();
    let keys = (ports_container + " ,").split(" ");

    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === undefined) {
            continue;
        }
        //single comment
        else if (keys[i].startsWith("//")) {
            ports.push("  " + keys[i]);
            
            if(!keys[i].includes("\n") && !keys[i].includes("\r")) {
                while (i < keys.length && !keys[i + 1].includes("\n") && !keys[i + 1].includes("\r")) {
                    ports.push(" " + keys[i + 1]);
                    i++;
                }

                ports.push(" " + keys[i + 1]);
                i++;
            }
        }
        //multiline comment
        else if (keys[i].startsWith("/*")) {
            ports.push("  /*");
            while (i < keys.length && !(keys[i + 1].trim()).includes("*/")) {
                //if there is an upcoming new line of comments, add padding
                if (/\r|\n/.exec(keys[i + 1])) {
                    ports.push(" " + keys[i + 1]);
                    ports.push("  " + keys[i + 2]);
                    i++;
                } else {
                    ports.push(" " + keys[i + 1]);
                }

                i++;
            }
            ports.push(" " + keys[i + 1]);
            i++;
        } else if (header) {
            
            //if declared in a header, then the port is prior to a comma
            if (keys[i + 1] == ",") {
                let port = keys[i].replace(/\s\s+/g, ' ').trim();
                ports.push("  ." + port + " ".repeat(4) + "(" + port + ")");

                i++;
                if (i < keys.length) {
                    ports.push(",\r\n");
                }
            }
        } else if (isPortSymbol(keys[i])) {
            let key = keys[i + 1].replace((/ +|\r\n|\n|\r/g), " ");
            let port = key;
            
            //save each previous non empty string as a port
            //skip all until a comma, the port is prior to a comma
            while (i < keys.length && key != ",") {
                if (keys[i].replace(/ +|\r\n|\n|\r/g, '').length > 0) {
                    port = keys[i];
                }
                key = keys[i + 1].replace((/ +|\r\n|\n|\r/g), " ");
                i++;
            }

            port = port.replace(/\s\s+/g, ' ').trim();
            ports.push("  ." + port + " ".repeat(4) + "(" + port + ")");
            ports.push(",\r\n");

            i++;
        }
    }

    let ports_declaration = ports.join("");

    //remove the last ','
    ports_declaration = ports_declaration.substring(0, ports_declaration.lastIndexOf(",")) + "\n";

    return ports_declaration;
}

/**  
    Uses the given parameters container to define 
    the parameters portion of the module's instance.

    @param parameters_container the parameters container.
    @return the parameters declaration
    @throws Array Out of Bounds error with incorrect syntax
*/
function getParametersDeclaration(parameters_container: string): string {
    if (parameters_container === undefined) {
        return undefined;
    }

    //remove new lines, surround ';' ',' with space
    parameters_container = parameters_container.replace((/\r\n|\n|\r/g), " ");
    parameters_container = parameters_container.replace(/;/g, ' ; ');
    parameters_container = parameters_container.replace(/,/g, ' , ');

    //replace multiple space with a single space
    parameters_container = parameters_container.replace(/ +/g, ' ');

    parameters_container = parameters_container.trim() + " ,";
    let keys = parameters_container.split(' ');

    let parameters = [];

    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === undefined) {
            continue;
        } else if (keys[i] == parameter_key_symbol) {

            while(i < keys.length && keys[i] != "=" && keys[i] != "," && keys[i] != "," && keys[i] != ")") {
                i++;
            }
    
            //set with default value if it exists
            if (keys[i] == "=") {
                parameters.push("  ." + keys[i - 1] + " ".repeat(4) + "(");
                parameters.push(keys[i + 1] + "),\n");
                i++;
            } else {
                parameters.push("  ." + keys[i - 1] + " ".repeat(4) + "(");
                parameters.push(keys[i - 1] + "),\n");
            }
        }
    }

    if (parameters.length == 0) {
        return undefined;
    }

    let parameters_declaration = parameters.join("");

    //remove the last ','
    parameters_declaration = parameters_declaration.substring(0, parameters_declaration.lastIndexOf(",")) + "\n";

    return parameters_declaration;
}