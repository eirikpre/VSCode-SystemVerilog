import * as uriJs from 'uri-js';

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

    const lUri = decodeURIComponent(uri); // convert hexadecimal characters to ASCII
    const parsedUri = uriJs.parse(lUri);
    if (!parsedUri.path) {
        return '';
    }

    let matches;
    const lRootPath = rootPath.replace(/\\/g, '/');
    const regex = new RegExp(`/?${lRootPath}(.*)`);
    if ((matches = regex.exec(parsedUri.path)) != null && matches.length > 1) {
        return lRootPath + matches[1];
    }

    return '';
}
