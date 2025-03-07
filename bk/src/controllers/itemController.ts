import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import { Item } from "../models/item";
import { User } from "../models/user";
import { Like } from "../models/like";
import { View } from "../models/view";
import { Bid } from "../models/bid";
import { Chat } from "../models/chat";
// import redisClient from "../DB/redisClient";
// import { itemKey, chatKey } from "../utils/keys";
import jwt from "jsonwebtoken";

// const EXPIRATION_TIME = 86400; // 1 day in seconds

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

    // const itemData = {
    //   id: newItem.id.toString(),
    //   name: newItem.name,
    //   description: newItem.description,
    //   price: newItem.price.toString(),
    //   pic: newItem.pic,
    //   views: newItem.views.toString(),
    //   likes: newItem.likes.toString(),
    //   duration: newItem.duration.toString(),
    // };

    // Cache the new item
    // const cacheKey = itemKey(newItem.id.toString());
    // await redisClient.hSet(cacheKey, itemData);
    // await redisClient.expire(cacheKey, EXPIRATION_TIME); // Cache for 1 day

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
  // const authHeader = req.headers.authorization;
  let userId: string | null = "4";

  // if (authHeader) {
  //   const tokenParts = authHeader.split(".");
  //   if (tokenParts.length === 3) {
  //     try {
  //       const decoded: any = jwt.verify(authHeader, "your_jwt_secret");
  //       userId = decoded.userId || null;
  //     } catch (error) {
  //       console.error("Invalid token:", error);
  //       return res.status(401).json({ message: "Invalid or expired token" });
  //     }
  //   } else {
  //     console.error("Malformed token");
  //     return res.status(400).json({ message: "Malformed token" });
  //   }
  // }

  try {
    // const cacheKey = itemKey(id);
    // const cachedItem = await redisClient.hGetAll(cacheKey);

    // if (Object.keys(cachedItem).length > 0) {
    //   const liked = userId
    //     ? await Like.findOne({ where: { userId, itemId: id } })
    //     : null;
    //   const bids = await Bid.findAll({
    //     where: { itemId: id },
    //     order: [["createdAt", "DESC"]],
    //   });
    //   const chatCacheKey = chatKey(id);
    //   const cachedChats = await redisClient.lRange(chatCacheKey, 0, -1);
    //   const chats =
    //     cachedChats.length > 0
    //       ? cachedChats.map((chat) => JSON.parse(chat))
    //       : await Chat.findAll({ where: { itemId: id }, include: [User] });

    //   return res.json({
    //     ...cachedItem,
    //     liked: !!liked,
    //     bids,
    //     chats,
    //   });
    // }

    const item = await Item.findByPk(id, {
      include: [{
        model: User,
        attributes: ['id', 'pic', 'username'] // Select only necessary fields
      }]
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const itemData = {
      id: item.id.toString(),
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      pic: item.pic,
      category: item.category.toString(),
      hotness: item.hotness.toString(),
      likes: item.likes.toString(),
      expiredTime: new Date(item.duration + item.createdAt),
      user: {
        id: item.user.id,
        pic: item.user.pic,
        username: item.user.username
      }
    };

    // await redisClient.hSet(cacheKey, itemData);
    // await redisClient.expire(cacheKey, EXPIRATION_TIME); // Cache for 1 day
    await viewItem(userId, item.id);

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

    // const cacheKey = itemKey(itemId);
    // const cachedItem = await redisClient.hGetAll(cacheKey);

    if (like) {
      await like.destroy();
      // if (Object.keys(cachedItem).length > 0)
      //   await redisClient.hIncrBy(cacheKey, "likes", -1);
      return res.status(200).json({ message: "Item unliked successfully" });
    } else {
      await Like.create({ userId, itemId });
      // if (Object.keys(cachedItem).length > 0)
      //   await redisClient.hIncrBy(cacheKey, "likes", 1);
      return res.status(201).json({ message: "Item liked successfully" });
    }
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const viewItem = async (userId: string, itemId :string): Promise<void> => {
  try {
    const item = await Item.findByPk(itemId);

    const view = await View.findOne({
      where: { userId, itemId },
    });

    if (!view) {
      await View.create({ userId, itemId });
      item?.increment("views");

      // const cacheKey = itemKey(itemId);
      // const cachedItem = await redisClient.hGetAll(cacheKey);
      // if (Object.keys(cachedItem).length > 0)
      //   await redisClient.hIncrBy(cacheKey, "likes", 1);
    }
  } catch (error: any) {
    console.log(error);
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
    return res.status(500).json({
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
    return res.status(500).json({
      message: "Server error, could not retrieve bid history",
      error: error.message,
    });
  }
};
// get items by sort
export const getItems = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { price, sort = "newest", ending, category, hotness } = req.query;

    if (!price) {
      return res.status(400).json({ error: "Price range is required." });
    }
    const [priceMin, priceMax] = (price as string).split(",").map(Number);

    if (isNaN(priceMin) || isNaN(priceMax)) {
      return res.status(400).json({ error: "Invalid price range format." });
    }

    // Sorting options
    const sortOptions: Record<string, [string, string]> = {
      like: ["likes", "DESC"],
      following: ["views", "DESC"],
      newest: ["createdAt", "DESC"],
      oldest: ["createdAt", "ASC"],
      favorite: ["likes", "DESC"],
    };

    const order = sortOptions[sort as string] || sortOptions["newest"];

    const timeMap: Record<string, number> = {
      "1h": 1 * 60 * 60 * 1000,
      "6h": 6 * 60 * 60 * 1000,
      "3d": 3 * 24 * 60 * 60 * 1000,
      "1w": 7 * 24 * 60 * 60 * 1000,
      "2w": 14 * 24 * 60 * 60 * 1000,
      "1m": 30 * 24 * 60 * 60 * 1000,
    };

    let endingFilter = {};
    if (ending && timeMap[ending as string]) {
      const now = new Date();
      const futureTimeInSeconds = timeMap[ending as string];
      const futureDate = new Date(now.getTime() + futureTimeInSeconds * 1000);

      // Filtering items that will expire within "futureTime"
      endingFilter = {
        [Op.and]: [
          { createdAt: { [Op.lte]: now } }, // Ensure item is already created
          Sequelize.literal(
            `DATE_ADD(createdAt, INTERVAL duration SECOND) <= '${futureDate.toISOString()}'`
          ),
        ],
      };
    }

    // Category filter
    const categoryFilter = category ? { category } : {};

    // Hotness filter
    const hotnessFilter = hotness ? { hotness: hotness === "true" } : {};

    // Get items
    const items = await Item.findAll({
      where: {
        ...categoryFilter,
        ...hotnessFilter,
        ...endingFilter,
      },
      include: [
        {
          model: Bid,
          attributes: ["price"],
          order: [["createdAt", "DESC"]],
          limit: 1, // Get the latest bid
        },
      ],
      order: [order],
    });

    // Filter items based on last bid price range
    const filteredItems = items.filter((item) => {
      const lastBid = (item as any).bids?.[0]?.price || item.price;
      return lastBid >= priceMin && lastBid <= priceMax;
    });

    return res.json(filteredItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
