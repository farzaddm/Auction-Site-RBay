import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import { Item } from "../models/item";
import { Bid } from "../models/bid";
import { View } from "../models/view";
import { Like } from "../models/like";
import { Follow } from "../models/follow";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3360'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "auction",
  logging: console.log,
  models: [User, Follow, Item, Bid, View, Like], // Ensure Follow is after User
});
