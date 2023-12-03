self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/pako/1.0.11/pako.js');
self.onmessage = function(event) {
    const dataArray = event.data;
    const result = pako.deflate(JSON.stringify(dataArray), { level: 9});
    //console.log(getStringSizeInMB(result));
    self.postMessage(convert8BitArrayToString(result));
}
function getStringSizeInMB(str) {
    // Convert the string to a Blob
    const blob = new Blob([str]);

    // Get the size in bytes
    const sizeInBytes = blob.size;

    // Convert bytes to megabytes
    const sizeInMB = sizeInBytes / (1024 * 1024);

    return sizeInMB;
}
function stringToBinary(str) {
    let binary = '';
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i).toString(2);
        while (charCode.length < 16) {
            charCode = '0' + charCode;
        }
        binary += charCode;
    }
    return binary;
}
function convert8BitArrayToString(array) {
    let result = '';
    for (let i = 0; i < array.length; i++) {
        result += String.fromCharCode(array[i]);
    }
    return result;
}