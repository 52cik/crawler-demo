<?php
require_once 'vendor/autoload.php';

// 抓取列表
$data = search('丑八怪');
$list = array_map(function ($it) {
  return [
    'songmid' => $it->songmid,
    'songname' => $it->songname,
    'singer' => $it->singer[0]->name,
  ];
}, $data->data->song->list);
print_r($list);

// 抓取歌曲地址
echo getAudio($list[0]['songmid']), PHP_EOL;
