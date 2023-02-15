const app = require('express')();
const PORT = 8080;
app.get('/api', (req, res) => {
  res.end(`Hello! Go to item:`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.listen(PORT);
console.log(`[LAUNCH] Listening on port ${PORT}`);

module.exports = app;
