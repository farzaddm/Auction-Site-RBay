import { Request, Response } from "express";
import { Op, literal } from "sequelize";
import { Item } from "../models/item";
import { User } from "../models/user";
import { Like } from "../models/like";
import { View } from "../models/view";
import { Bid } from "../models/bid";
import { Chat } from "../models/chat";
import redisClient from "../DB/redisClient";
import { itemKey, chatKey } from "../utils/keys";
import jwt from "jsonwebtoken";

const EXPIRATION_TIME = 86400; // 1 day in seconds

export const createItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, description, price, pic, duration } = req.body;

    if (!name || !description || !duration) {
      return res
        .status(400)
        .json({ message: "Name, description, and duration are required" });
    }

    const newItem = await Item.create({
      name,
      description,
      price,
      pic,
      duration,
    });

    const itemData = {
      id: newItem.id.toString(),
      name: newItem.name,
      description: newItem.description,
      price: newItem.price.toString(),
      pic: newItem.pic,
      views: newItem.views.toString(),
      likes: newItem.likes.toString(),
      duration: newItem.duration.toString(),
    };

    // Cache the new item
    const cacheKey = itemKey(newItem.id.toString());
    await redisClient.hSet(cacheKey, itemData);
    await redisClient.expire(cacheKey, EXPIRATION_TIME); // Cache for 1 day

    return res.status(201).json({
      message: "Item created successfully",
      data: newItem,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error, could not create item" });
  }
};

export const getItemById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;
  let userId: number | null = null;

  if (authHeader) {
    const tokenParts = authHeader.split(".");
    if (tokenParts.length === 3) {
      try {
        const decoded: any = jwt.verify(authHeader, "your_jwt_secret");
        userId = decoded.userId || null;
      } catch (error) {
        console.error("Invalid token:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
      }
    } else {
      console.error("Malformed token");
      return res.status(400).json({ message: "Malformed token" });
    }
  }

  try {
    const cacheKey = itemKey(id);
    const cachedItem = await redisClient.hGetAll(cacheKey);

    if (Object.keys(cachedItem).length > 0) {
      const liked = userId
        ? await Like.findOne({ where: { userId, itemId: id } })
        : null;
      const bids = await Bid.findAll({
        where: { itemId: id },
        order: [["createdAt", "DESC"]],
      });
      const chatCacheKey = chatKey(id);
      const cachedChats = await redisClient.lRange(chatCacheKey, 0, -1);
      const chats =
        cachedChats.length > 0
          ? cachedChats.map((chat) => JSON.parse(chat))
          : await Chat.findAll({ where: { itemId: id }, include: [User] });

      return res.json({
        ...cachedItem,
        liked: !!liked,
        bids,
        chats,
      });
    }

    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const itemData = {
      id: item.id.toString(),
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      pic: item.pic,
      views: item.views.toString(),
      likes: item.likes.toString(),
      duration: item.duration.toString(),
    };

    await redisClient.hSet(cacheKey, itemData);
    await redisClient.expire(cacheKey, EXPIRATION_TIME); // Cache for 1 day

    const liked = userId
      ? await Like.findOne({ where: { userId, itemId: id } })
      : null;
    const bids = await Bid.findAll({
      where: { itemId: id },
      order: [["createdAt", "DESC"]],
    });
    const chats = await Chat.findAll({
      where: { itemId: id },
      include: [User],
    });

    return res.json({
      ...itemData,
      liked: !!liked,
      bids,
      chats,
    });
  } catch (error) {
    console.error("Error retrieving item:", error);
    return res
      .status(500)
      .json({ message: "Server error, could not retrieve item" });
  }
};

export const likeItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, itemId } = req.body;

  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const like = await Like.findOne({
      where: { userId, itemId },
    });

    const cacheKey = itemKey(itemId);
    const cachedItem = await redisClient.hGetAll(cacheKey);

    if (like) {
      await like.destroy();
      if (Object.keys(cachedItem).length > 0)
        await redisClient.hIncrBy(cacheKey, "likes", -1);
      return res.status(200).json({ message: "Item unliked successfully" });
    } else {
      await Like.create({ userId, itemId });
      if (Object.keys(cachedItem).length > 0)
        await redisClient.hIncrBy(cacheKey, "likes", 1);
      return res.status(201).json({ message: "Item liked successfully" });
    }
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const viewItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, itemId } = req.body;

  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const view = await View.findOne({
      where: { userId, itemId },
    });

    if (view) {
      return res.status(400).json({ message: "Item already viewed" });
    } else {
      await View.create({ userId, itemId });
      item.increment("views");

      const cacheKey = itemKey(itemId);
      const cachedItem = await redisClient.hGetAll(cacheKey);
      if (Object.keys(cachedItem).length > 0)
        await redisClient.hIncrBy(cacheKey, "likes", 1);

      return res.status(200).json({ message: "Item viewed successfully" });
    }
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const bidOnItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { itemId, bidAmount } = req.body;
  const authHeader = req.headers.authorization;
  let userId: number | null = null;

  if (authHeader) {
    const tokenParts = authHeader.split(".");
    if (tokenParts.length === 3) {
      try {
        const decoded: any = jwt.verify(authHeader, "your_jwt_secret");
        userId = decoded.userId || null;
      } catch (error) {
        console.error("Invalid token:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
      }
    } else {
      console.error("Malformed token");
      return res.status(400).json({ message: "Malformed token" });
    }
  }

  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const user = await User.findByPk(userId as number);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (parseInt(bidAmount) <= item.price) {
      return res
        .status(400)
        .json({ message: "Bid amount must be higher than current price" });
    }

    item.price = bidAmount;
    await item.save();

    const newBid = await Bid.create({
      userId: userId,
      itemId: itemId,
      bidAmount: bidAmount,
    });

    return res
      .status(200)
      .json({ message: "Bid placed successfully", data: newBid });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Server error, could not place bid",
        error: error.message,
      });
  }
};

export const getBidHistory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { itemId } = req.params;

  console.log(itemId);

  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const bids = await Bid.findAll({
      where: { itemId },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Bid history retrieved successfully",
      data: bids,
    });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Server error, could not retrieve bid history",
        error: error.message,
      });
  }
};
// get items by sort
export const getItemsByPrice = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const order = req.query.order === "desc" ? "DESC" : "ASC"; // Check if the order is 'desc' for descending, otherwise ascending
    const items = await Item.findAll({
      order: [["price", order]],
    });
    return res.status(200).json({
      message: "Items retrieved successfully",
      data: items,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error, could not retrieve items" });
  }
};

export const getItemsByDuration = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const order = req.query.order === "desc" ? "DESC" : "ASC"; // Check if the order is 'desc' for descending, otherwise ascending
    const items = await Item.findAll({
      order: [
        [
          Item.sequelize?.literal("createdAt + INTERVAL duration SECOND") ||
            "createdAt",
          order,
        ],
      ],
    });
    return res.status(200).json({
      message: "Items retrieved successfully",
      data: items,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error, could not retrieve items" });
  }
};

export const getItemsByViewsInPastDay = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const order = req.query.order === "desc" ? "DESC" : "ASC"; // Check if the order is 'desc' for descending, otherwise ascending
    const items = await Item.findAll({
      include: [
        {
          model: View,
          where: {
            createdAt: {
              [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 1)),
            },
          },
          required: true,
        },
      ],
      order: [[literal("views"), order]],
    });

    return res.status(200).json({
      message: "Items retrieved successfully",
      data: items,
    });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Server error, could not retrieve items",
        error: error.message,
      });
  }
};
