require("dotenv").config();
const moment = require("moment-timezone");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = process.env.DB_URL;

class MongoDb {
  constructor() {
    try {
      this.client = new MongoClient(uri);
      this.database = this.client.db("foodie");
      this.restaurant = this.database.collection("restaurant");
      this.member = this.database.collection("member");
    } catch (error) {
      console.error(error);
    }
  }

  getRestaurants = async () => {
    try {
      const options = {
        sort: { createDate: -1 },
      };
      const restaurant = await this.restaurant.find({}, options).toArray();
      return restaurant;
    } catch (error) {
      console.error(error);
    }
  };
  getRestaurantDetail = async (id) => {
    try {
      const o_id = new ObjectId(id);
      const query = { _id: o_id };
      const result = await this.restaurant?.findOne(query);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  createRestaurant = async (data) => {
    try {
      const createDate = moment()
        .tz("Asia/Taipei")
        .format("YYYY-MM-DD HH:mm:ss");

      const result = await this.restaurant.insertOne({
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

      const result = await this.restaurant?.updateOne(query, {
        $set: data,
      });
      return result;
    } catch (error) {}
  };

  deleteRestaurant = async (id) => {
    try {
      const o_id = new ObjectId(id);
      const query = { _id: o_id };
      const result = await this.restaurant?.deleteOne(query);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  getMember = async (data) => {
    try {
      const query = { account: data.account, password: data.password };
      const result = await this.member?.findOne(query);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = MongoDb;
