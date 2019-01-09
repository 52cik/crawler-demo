const { search, getMp3 } = require('./got');

(async () => {
  const { body } = await search('渡');
  // console.log(JSON.stringify(body, null, 2));
  const list = body.result.songs.map(it => ({
    id: it.id,
    name: it.name,
    ar: it.ar.map(a => a.name).join('/'),
  }));
  console.log(list);

  const res = await getMp3(list[0].id);
  console.log(res.body);
})().catch(console.error);
