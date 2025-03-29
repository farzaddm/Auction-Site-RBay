import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import { Item } from "../models/item";
import { User } from "../models/user";
import { Like } from "../models/like";
import { View } from "../models/view";
import { Bid } from "../models/bid";
import { Chat } from "../models/chat";
// import jwt from "jsonwebtoken";

export const createItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.userId;
    const { name, description, price, pic, duration, category } = req.body;

    if (!name || !description || !duration) {
      return res
        .status(400)
        .json({ message: "Name, description, and duration are required" });
    }

    const newItem = await Item.create({
      userId,
      name,
      description,
      price,
      pic,
      duration,
      category,
    });

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
  const { userId } = req.body;

  try {
    const item = await Item.findByPk(id, {
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "pic",
        "category",
        "hotness",
        "likes",
        [
          Sequelize.literal(
            "DATE_ADD(Item.createdAt, INTERVAL Item.duration SECOND)"
          ),
          "expiredTime",
        ],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "pic", "username"], // Select only necessary fields
        },
      ],
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (userId) await viewItem(userId, item.id);

    const liked = userId
      ? await Like.findOne({ where: { userId, itemId: id } })
      : null;
    const bids = await Bid.findAll({
      where: { itemId: id },
      order: [["createdAt", "DESC"]],
      attributes: ["price"], // Only fetch price from Bid
      include: [
        {
          model: User,
          attributes: ["id", "username"], // Only fetch these fields
        },
      ],
    });

    const chats = await Chat.findAll({
      where: { itemId: id },
      include: [User],
    });

    return res.json({
      item,
      liked: !!liked, // convert value to true or false
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
  const { itemId } = req.body;
  const userId = req.userId;

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

    if (like) {
      await like.destroy();
      return res.status(200).json({ message: "Item unliked successfully" });
    } else {
      await Like.create({ userId, itemId });
      return res.status(201).json({ message: "Item liked successfully" });
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
  const { itemId, price } = req.body;
  const userId = req.userId;

  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (parseInt(price) <= item.price) {
      return res
        .status(400)
        .json({ message: "Bid amount must be higher than current price" });
    }

    item.price = price;
    await item.save();

    const newBid = await Bid.create({
      userId: userId,
      itemId: itemId,
      price: price,
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

export const dashboard = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.params.id;
  console.log(userId);

  try {
    const items = await Item.findAll({
      where: { userId },
      attributes: ["id", "name", "price", "views", "likes", "price"],
    });
    if (items.length === 0)
      return res.status(404).json({ message: "No item found for this user" });

    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving items" });
  }
};

export const deleteItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const itemId = req.params.id;
  try {
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Delete the item
    await item.destroy();

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting item" });
  }
};

export const search = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { searchQuery } = req.query;

  if (!searchQuery || typeof searchQuery !== "string")
    return res.status(400).json({ error: "Invalid search query" });

  try {
    const nameRes = await Item.findAll({
      where: { name: { [Op.like]: `%${searchQuery}%` } },
      attributes: ["id", "name", "description"],
    });

    const descriptionRes = await Item.findAll({
      where: {
        description: { [Op.like]: `%${searchQuery}%` },
      },
      attributes: ["id", "name", "description"],
    });

    const results = [...nameRes, ...descriptionRes];
    return res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Somthing went wrong" });
  }
};

const viewItem = async (
  userId: string | null,
  itemId: string
): Promise<void> => {
  try {
    if (!userId) return;
    const item = await Item.findByPk(itemId);

    const view = await View.findOne({
      where: { userId, itemId },
    });

    if (!view) {
      await View.create({ userId, itemId });
      item?.increment("views");
    }
  } catch (error: any) {
    console.log(error);
  }
};
