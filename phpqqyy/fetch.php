<?php

function fetch($url, $opts) {
  $origin = 'https://m.y.qq.com';
  $client = new \GuzzleHttp\Client();
  $res = $client->request('GET', $url, [
    'headers' => [
      'Origin' => $origin,
      'Referer' => $origin,
      'User-Agent' => 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    ]
  ] + $opts);
  return $res->getBody();
}

function search($w) {
  $query = [
    'g_tk' => 5381,
    'uin' => 0,
    'format' => 'json',
    'inCharset' => 'utf-8',
    'outCharset' => 'utf-8',
    'notice' => 0,
    'platform' => 'h5',
    'needNewCode' => 1,
    'w' => $w,
    'zhidaqu' => 1,
    'catZhida' => 1,
    't' => 0,
    'flag' => 1,
    'ie' => 'utf-8',
    'sem' => 1,
    'aggr' => 0,
    'perpage' => 20,
    'n' => 20,
    'p' => 1,
    'remoteplace' => 'txt.mqq.all',
    '_' => (time() . rand(100, 999)),
  ];
  $url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
  $json = fetch($url, [
    'query' => $query,
  ]);
  $data = json_decode($json);

  return $data;
}

function getAudio($songmid) {
  $url = "https://i.y.qq.com/v8/playsong.html?songmid=${songmid}&ADTAG=myqq&from=myqq&channel=10007100";
  $html = fetch($url, []);
  if (preg_match('/<audio.+?src="([^"]+)/', $html, $m)) {
    return $m[1];
  }
  return '';
}
