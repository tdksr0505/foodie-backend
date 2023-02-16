const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = `mongodb+srv://admin:admin@cluster0.7shrr3v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const database = client.db("foodie");
const restaurants = database.collection("restaurant");

const getTwoDigit = (param) => {
  if (typeof param !== "string") {
    param = param.toString();
  }
  return param.padStart(2, "0");
};
class MongoDb {
  constructor() {}

  getRestaurants = async () => {
    const restaurant = await restaurants.find().toArray();
    return restaurant;
  };
  getRestaurantDetail = async (id) => {
    try {
      const o_id = new ObjectId(id);
      const query = { _id: o_id };
      const result = await restaurants?.findOne(query);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  createRestaurant = async (data) => {
    try {
      const date = new Date();
      const createDate = `${date.getFullYear()}-${getTwoDigit(
        date.getMonth() + 1
      )}-${getTwoDigit(date.getDate())} ${getTwoDigit(
        date.getHours()
      )}:${getTwoDigit(date.getMinutes())}:${getTwoDigit(date.getSeconds())}`;

      const result = await restaurants.insertOne({
        ...data,
        createDate: createDate,
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  updateRestaurant = async (id, data) => {
    try {
      const o_id = new ObjectId(id);
      const query = { _id: o_id };
      const result = await restaurants?.updateOne(query, {
        $set: data,
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  deleteRestaurant = async (id) => {
    try {
      const o_id = new ObjectId(id);
      const query = { _id: o_id };
      const result = await restaurants?.deleteOne(query);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = MongoDb;
