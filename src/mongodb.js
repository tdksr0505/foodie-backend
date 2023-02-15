const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://admin:admin@cluster0.7shrr3v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const database = client.db('foodie');
class MongoDb {
  constructor() {
    this.getRestaurants();
  }
  getRestaurants = async () => {
    const restaurants = database.collection('restaurant');
    const restaurant = await restaurants.find().toArray();
    return restaurant;
  };
}

module.exports = MongoDb;
