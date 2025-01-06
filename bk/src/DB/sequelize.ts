import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import { Item } from "../models/item";
import { Bid } from "../models/bid";
import { View } from "../models/view";
import { Like } from "../models/like";


export const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3360'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "auction",
  logging: console.log,
  models: [User, Item, Bid, View, Like], // Register models here
});
