import * as uriJs from 'uri-js';

/**
    Get path from a given `uri`

    @param uri the uri
    @return the path
*/
export function getPathFromUri(uri: string): string {
    if (!uri) {
        return "";
    }

    uri = decodeURIComponent(uri); //convert hex chars to ASCII

    let parsedUri = uriJs.parse(uri);
    if (!parsedUri.path) {
        return "";
    }

    //remove preceding and trailing slashes 
    return parsedUri.path.replace(/^\/|\/$/g, '')
}