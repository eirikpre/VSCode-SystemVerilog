import { ReferenceProvider, TextDocument, Range, Position, workspace, Location, CancellationToken, Definition, Uri, SymbolInformation, commands } from 'vscode'; // prettier-ignore
import { SystemVerilogDefinitionProvider } from './DefinitionProvider';
import { SystemVerilogSymbol } from '../symbol';
import { SystemVerilogIndexer } from '../indexer';
import { SystemVerilogParser } from '../parser';
import { Integer_covergroup_expressionContext } from '../compiling/ANTLR/grammar/build/SystemVerilogParser';
import { resolve } from 'vscode-languageserver/lib/node/files';

export class SystemVerilogReferenceProvider implements ReferenceProvider {
    public indexer: SystemVerilogIndexer;
    public results: Location[];

    constructor(indexer: SystemVerilogIndexer) {
        this.indexer = indexer;
    }

    public async provideReferences(
        document: TextDocument,
        position: Position,
        options: { includeDeclaration: boolean },
        token: CancellationToken
    ): Promise<Location[]> {
        return new Promise<Location[]>(async (resolve, _reject) => {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);
            let cancelled = false;
            this.results = [];

            if (!range) {
                return this.results;
            }

            //TODO: remove this
            //this.results.push(new Location(document.uri, position))

            var definitionProvider = new SystemVerilogDefinitionProvider();
            const defLocation = await new Promise<Location>((resolve, reject) => {
                definitionProvider.provideDefinition(document, position, token)
                .then((res: Definition) => {
                    var defLocation: Location;
                    if (typeof res == typeof Location) {
                        defLocation = res as Location;
                    } else if (res[0] != null) {
                        defLocation = res[0] as Location;
                    } else {
                        defLocation = new Location(document.uri, position);
                    }
                    //TODO: remove this
                    //this.results.push(defLocation);

                    resolve(defLocation);
                });
            });

            const parser = new SystemVerilogParser();
            var indexer = new SystemVerilogIndexer(null, parser, null);
            indexer.initialize();
            const uris = await indexer.find_files(token);
            for (let fileNumber = 0; fileNumber < uris.length; fileNumber += indexer.parallelProcessing) {
                const subset = uris.slice(fileNumber, fileNumber + indexer.parallelProcessing);
                if (token.isCancellationRequested) {
                    cancelled = true;
                    break;
                }
                for (const uri of subset) {
                    const locations = await this.processFile(uri, word);
                    for(const loc of locations) {
                        this.results.push(loc);
                    }
                }
            }
            
            resolve(this.results);
                    
            //return refAtPos ? (await findReferences(refAtPos.ref)).map(({ location }) => location) : [];
        });
    }

    public async processFile(uri: Uri, symbol: string): Promise<Location[]> {
        const document = await workspace.openTextDocument(uri);
        return new Promise<Location[]>(resolve => {
            let text = document.getText();
            let regex = /\btest\b/g;
            let regex2 = new RegExp('\\b'+symbol+'\\b', 'g');
            let match;
            let results: Location[] = [];
            while ((match = regex.exec(text)) !== null) {
                let foundLocation = new Location(
                    document.uri,
                    new Range(
                        document.positionAt(match.index),
                        document.positionAt(match.index + regex.lastIndex)
                    )
                )
                //TODO check against defLocation
                results.push(foundLocation);
            }
            resolve(results);
        });
    }
}
