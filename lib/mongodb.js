require("dotenv").config();
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = process.env.DB_URL;

const getTwoDigit = (param) => {
  if (typeof param !== "string") {
    param = param.toString();
  }
  return param.padStart(2, "0");
};
class MongoDb {
  constructor() {
    try {
      this.client = new MongoClient(uri);
      this.database = this.client.db("foodie");
      this.restaurants = this.database.collection("restaurant");
    } catch (error) {
      console.error(error);
    }
  }

  getRestaurants = async () => {
    try {
      const options = {
        sort: { createDate: -1 },
      };
      const restaurant = await this.restaurants.find({}, options).toArray();
      return restaurant;
    } catch (error) {
      console.error(error);
    }
  };
  getRestaurantDetail = async (id) => {
    try {
      const o_id = new ObjectId(id);
      const query = { _id: o_id };
      const result = await this.restaurants?.findOne(query);
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

      const result = await this.restaurants.insertOne({
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
      const result = await this.restaurants?.updateOne(query, {
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
      const result = await this.restaurants?.deleteOne(query);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = MongoDb;
