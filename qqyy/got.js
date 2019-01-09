const got = require('got');

const origin = 'https://m.y.qq.com';

const headers = {
  origin,
  referer: `${origin}/`,
  'user-agent':
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
};

function fetch(url, opts = {}) {
  return got(url, Object.assign({ headers, json: true }, opts));
}

function search(w) {
  const query = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    w,
    zhidaqu: 1,
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p: 1,
    remoteplace: 'txt.mqq.all',
    _: Date.now(),
  };
  return fetch('https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp', { query });
}

function getAudio(songmid) {
  const url = `https://i.y.qq.com/v8/playsong.html?songmid=${songmid}&ADTAG=myqq&from=myqq&channel=10007100`;
  return fetch(url, { json: false }).then(res => {
    const audio = (res.body.match(/<audio.+?src="([^"]+)/) || 0)[1];
    res.body = { audio };
    return res;
  });
}

module.exports = {
  search,
  getAudio,
};
