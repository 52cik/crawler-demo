const got = require('got');
const { makeQuery } = require('./utils');

const origin = 'https://music.163.com';

const headers = {
  origin,
  Referer: `${origin}/m/`,
  'User-Agent':
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
};

function fetch(url, opts = {}) {
  return got(
    `${origin}${url}`,
    Object.assign({ headers, form: true, json: true }, opts),
  );
}

function search(s) {
  const data = {
    s,
    type: 1,
    limit: 20,
    offset: 0,
    strategy: 5,
    queryCorrect: true,
  };
  return fetch('/weapi/search/get', {
    method: 'post',
    query: makeQuery(data),
  });
}

function getMp3(id) {
  const data = { ids: `["${id}"]`, br: '128000' };
  return fetch('/weapi/song/enhance/player/url', {
    method: 'post',
    query: makeQuery(data),
  });
}

module.exports = {
  fetch,
  search,
  getMp3,
};
