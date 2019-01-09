const { search, getAudio } = require('./got');

(async () => {
  const { body } = await search('哑巴');
  // console.log(body);
  const list = body.data.song.list.map(it => ({
    songmid: it.songmid,
    songname: it.songname,
    singer: it.singer.map(s => s.name).join(' / '),
  }));
  console.log(list);

  const res = await getAudio(list[0].songmid);
  console.log(res.body);
})()
