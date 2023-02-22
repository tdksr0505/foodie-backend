const express = require('express');
const MongoDb = require('../lib/mongodb');
const jwt = require('jsonwebtoken');

const mongodb = new MongoDb();
const PORT = 8080;
const app = express();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const expiresIn = '7d';

const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    return decoded;
  } catch (error) {
    // err
    console.error(error);
    return null;
  }
};

app.use(express.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/restaurant', async (req, res) => {
  //查詢 全部
  const result = await mongodb.getRestaurants();
  res.send({
    code: 200,
    data: {
      restaurant: result,
    },
  });
});
app.get('/api/restaurant/:id', async (req, res) => {
  // 查詢 單一
  const { id } = req.params;
  const result = await mongodb.getRestaurantDetail(id);
  const code = result ? 0 : 1;
  res.status(200).json({ code, data: result });
});

app.post('/api/restaurant', async (req, res) => {
  //新增
  const result = await mongodb.createRestaurant(req.body);
  if (result && result.acknowledged) {
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

app.post('/api/restaurant/:id', async (req, res) => {
  //編輯
  const { id } = req.params;
  const { _id, ...rest } = req.body;
  const result = await mongodb.updateRestaurant(id, rest);
  if (result && result.acknowledged && result.modifiedCount === 1) {
    res.status(200).json({ code: 0, data: { msg: '已成功更新 ' } });
  } else {
    res.status(200).json({ code: 1, data: { msg: '更新失敗 ' } });
  }
});

app.delete('/api/restaurant/:id', async (req, res) => {
  //刪除
  const { id } = req.params;
  const result = await mongodb.deleteRestaurant(id);
  if (result.acknowledged) {
    res.status(200).json({
      code: 0,
      data: { msg: '已成功刪除' },
    });
  } else {
    res.status(200).json({
      code: 1,
      data: { msg: '刪除失敗' },
    });
  }
});

app.post('/api/login', async (req, res) => {
  //登入

  const result = await mongodb.getMember(req.body);
  console.log(result);
  if (result) {
    const token = createToken({ account: result.account });
    res.status(200).json({
      code: 0,
      data: {
        account: result.account,
        name: result.name,
        token,
        msg: '登入成功',
      },
    });
  } else {
    res.status(200).json({
      code: 1,
      data: { msg: '登入失敗' },
    });
  }
});

app.post('/api/auth/verify', async (req, res) => {
  //jwt 驗證
  const token = req.body.token;
  const result = verifyToken(token);
  res.status(200).json({
    code: result ? 0 : 1,
    data: { result },
  });
});

app.listen(PORT);
console.log(`[LAUNCH] Listening on port ${PORT}`);
