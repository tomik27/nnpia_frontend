export function base64ToArrayBuffer(base64: string): ArrayBuffer {
    let binaryString = window.atob(base64);
    let len = binaryString.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

export function byteArrayToBase64(byteArray: Uint8Array): string {
    const base64Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let base64 = '';

    for (let i = 0; i < byteArray.length; i += 3) {
        const byte1 = byteArray[i];
        const byte2 = byteArray[i + 1];
        const byte3 = byteArray[i + 2];

        base64 += base64Characters[byte1 >> 2];
        base64 += base64Characters[((byte1 & 3) << 4) | (byte2 >> 4)];
        base64 += base64Characters[((byte2 & 15) << 2) | (byte3 >> 6)];
        base64 += base64Characters[byte3 & 63];
    }

    // Ošetření zbytkových bajtů a doplnění paddingu '='
    if (byteArray.length % 3 === 1) {
        base64 = base64.slice(0, -2) + '==';
    } else if (byteArray.length % 3 === 2) {
        base64 = base64.slice(0, -1) + '=';
    }

    return base64;
}
