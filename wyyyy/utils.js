const crypto = require('./crypto');
const { BASE_CODE } = require('./emjcode');

function random(e = 16) {
  var t,
    n,
    r = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    i = '';
  for (t = 0; e > t; t += 1)
    (n = Math.random() * r.length), (n = Math.floor(n)), (i += r.charAt(n));
  return i;
}


function random(x) {
  x = x || 16;
  var str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var ret = '';

  for (var i=0; i<x; i++) {
    var idx = Math.random() * str.length;
    idx = Math.floor(idx);
    ret += str.charAt(idx);
  }

  return ret;
}

function makeQuery(data) {
  const presetKey = '0CoJUm6Qyw8W8jud';
  const secretKey = random();
  const params = crypto.aesEncrypt(
    crypto.aesEncrypt(JSON.stringify(data), presetKey),
    secretKey,
  );
  const encSecKey = crypto.rsaEncrypt(secretKey, '010001', BASE_CODE);
  return { params, encSecKey };
}

module.exports = {
  random,
  makeQuery,
};
