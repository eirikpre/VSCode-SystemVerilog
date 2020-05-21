import { HoverProvider, TextDocument, Position, CancellationToken, ProviderResult, Hover, workspace, commands, Location } from 'vscode';

export class SystemVerilogHoverProvider implements HoverProvider {

    provideHover(document : TextDocument, position : Position, token: CancellationToken) : ProviderResult<Hover> {
        return new Promise( (resolve, reject) => {
            var lookupRange = document.getWordRangeAtPosition(position);

            if (!lookupRange) {
                return resolve(undefined);
            }

            resolve(commands.executeCommand(
                "vscode.executeDefinitionProvider", document.uri, position, token)
                .then((loc: Location[]): Thenable<string> => {
                    if (loc.length == 0) { Promise.reject() }
                    return workspace.openTextDocument(loc[0].uri).then(doc => {
                        return doc.lineAt(loc[0].range.start.line).text.trim();
                    });
                }).then((str: string): Hover => {
                    return new Hover([{
                            language: 'systemverilog',
                            value: str
                        }
                    ]);
                })
            );
        });
    }
}
