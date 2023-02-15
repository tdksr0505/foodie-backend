const express = require('express');
const MongoDb = require('./mongodb');
const app = express();
const mongodb = new MongoDb();
const PORT = 8080;
app.get('/restaurants', async function (req, res) {
  const restaurants = await mongodb.getRestaurants();
  res.send({
    code: 200,
    data: {
      restaurants,
    },
  });
});

app.listen(PORT);
console.log(`[LAUNCH] Listening on port ${PORT}`);
