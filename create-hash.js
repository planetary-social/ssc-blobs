var Blake2s = require('blake2s-js')

module.exports = function createHash (file) {
    var h = new Blake2s(32);
    var enc = new TextEncoder();
    h.update(enc.encode(file));
    return h.hexDigest();  // returns string with hex digest
}
