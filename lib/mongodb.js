const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const uri = `mongodb+srv://admin:admin@cluster0.7shrr3v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const database = client.db('foodie');
const restaurants = database.collection('restaurant');

class MongoDb {
  constructor() {}
  getRestaurants = async () => {
    const restaurant = await restaurants.find().toArray();
    return restaurant;
  };
  getRestaurantDetail = async (id) => {
    const o_id = new ObjectId(id);
    const query = { _id: o_id };
    const result = await restaurants?.findOne(query);
    return result;
  };
}

module.exports = MongoDb;
