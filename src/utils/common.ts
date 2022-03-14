import * as uriJs from 'uri-js';
import { Position, TextDocument } from 'vscode';

/**
    Get the indexs of the given regex in the given document

    @param uri the uri
    @param rootPath the root path
    @return the path
*/
export function regexGetIndexes(document: TextDocument, input: string, regex: RegExp, offset: number): Array<Position> {
    const indexes = [];
    let match: RegExpExecArray = null;
    while ((match = regex.exec(input)) !== null) {
        indexes.push(document.positionAt(match.index + offset));
    }
    return indexes;
}

/**
    Get path from a given `uri`

    @param uri the uri
    @param rootPath the root path
    @return the path
*/
export function getPathFromUri(uri: string, rootPath: string): string {
    if (!uri || !rootPath) {
        return '';
    }
    let matches;

    const lUri = decodeURIComponent(uri); // convert hexadecimal characters to ASCII
    // don't parse if it is a windows path starting with a single letter followed by a colon
    const dontParseUri = new RegExp(`^[a-zA-Z]:.*`);
    let parsedPath = null;
    let windowsPath = false;
    if ((matches = dontParseUri.exec(lUri)) !== null && matches.length === 1) {
        parsedPath = uri.replace(/\\/g, '/');
        windowsPath = true;
    } else {
        const parsedUri = uriJs.parse(lUri);
        parsedPath = parsedUri.path;
    }
    if (!parsedPath) {
        return '';
    }

    const lRootPath = rootPath.replace(/\\/g, '/');
    const regex = new RegExp(`/?${lRootPath}(.*)`);
    if ((matches = regex.exec(parsedPath)) != null && matches.length > 1) {
        const foundPath = lRootPath + matches[1];
        if (windowsPath) {
            return foundPath.replace(/\//g, '\\');
        }
        return foundPath;
    }

    return '';
}
