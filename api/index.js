const app = require('express')();
const MongoDb = require('../lib/mongodb');
const mongodb = new MongoDb();
const PORT = 8080;

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/restaurant', async (req, res) => {
  //查詢
  const restaurants = await mongodb.getRestaurants();
  res.send({
    code: 200,
    data: {
      restaurants,
    },
  });
});

app.post('/api/restaurant', async (req, res) => {
  //新增
  const date = new Date();
  const createDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(
      2,
      '0'
    )} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const result = await restaurants.insertOne({
    ...req.body,
    createDate: createDate,
  });
  if (result.acknowledged) {
    res.status(200).json({
      code: 0,
      data: { msg: '已成功新增' },
    });
  } else {
    res.status(200).json({
      code: 1,
      data: { msg: '新增失敗' },
    });
  }
});

app.get('/api/restaurant/:slug', async (req, res) => {
  // GET 拿資料
  const { slug } = req.params;
  const result = await mongodb.getRestaurantDetail(slug);
  res.status(200).json({ code: 0, data: result });
});

app.listen(PORT);
console.log(`[LAUNCH] Listening on port ${PORT}`);

module.exports = app;
