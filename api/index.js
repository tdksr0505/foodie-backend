const app = require('express')();
const MongoDb = require('../lib/mongodb');
const mongodb = new MongoDb();
const PORT = 8080;
app.get('/api/restaurant', async (req, res) => {
  const restaurants = await mongodb.getRestaurants();
  res.send({
    code: 200,
    data: {
      restaurants,
    },
  });
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.listen(PORT);
console.log(`[LAUNCH] Listening on port ${PORT}`);

module.exports = app;
