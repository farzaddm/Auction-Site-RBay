import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import { Item } from "../models/item";
import { Bid } from "../models/bid";
import { View } from "../models/view";
import { Like } from "../models/like";
import dotenv from "dotenv";
import { Follow } from "../models/follow";
import { Chat } from "../models/chat";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || "",
  database: "auction",
  // logging: console.log,
  logging: false,
  models: [User, Follow, Item, Bid, View, Like, Chat], // Register models here
});


// export const syncDatabase = async() => {
//   try {
//     await sequelize.sync({ alter: true }); // Use `alter: true` to create tables just if they are not already exists
//     console.log("Database synchronized successfully!");
//   } catch (error) {
//     console.error("Failed to synchronize database:", error);
//   }
// }
export const syncDatabase = async () => {
  let retries = 3;

  while (retries) {
    try {
      await sequelize.sync({ alter: true });
      console.log("Database synchronized successfully!");
      break;
    } catch (error) {
      console.log("Database not ready, retrying in 5 seconds...");
      retries -= 1;
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};


