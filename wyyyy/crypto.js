const CryptoJS = require('crypto-js');
const RSA = require('rsa-javascript');

function aesEncrypt(text, secKey) {
  var key = CryptoJS.enc.Utf8.parse(secKey);
  var iv = CryptoJS.enc.Utf8.parse('0102030405060708');
  var srcs = CryptoJS.enc.Utf8.parse(text);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  });
  return encrypted.toString();
}

function rsaEncrypt(text, pubKey, modulus) {
  RSA.setMaxDigits(131);
  var keys = new RSA.RSAKeyPair(pubKey, '', modulus);
  return RSA.encryptedString(keys, text);
}

module.exports = {
  aesEncrypt,
  rsaEncrypt,
};
