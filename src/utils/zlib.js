const zlib = require('zlib');

// Compresses a string using gzip
export function compressString(string) {
    // Convert the string to a buffer
    const buffer = Buffer.from(string);

    // Compress the buffer
    return zlib.gzipSync(buffer).toString('base64');
}

// Decompresses a string using gzip
export function decompressString(string) {
    // Convert the string to a buffer
    const buffer = Buffer.from(string, 'base64');

    // Decompress the buffer
    return zlib.gunzipSync(buffer).toString();
}