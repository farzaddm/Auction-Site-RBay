import { Item } from "../models/item";
import { Request, Response } from "express";
import { User } from "../models/user";
import { Like } from "../models/like";
import { View } from "../models/view";
import { Op, literal } from "sequelize";

export const createItem = async (req: Request, res: Response): Promise<Response> => {  
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

export const getItemById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json({
      message: "Item retrieved successfully",
      data: item,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, could not retrieve item" });
  }
};


export const likeItem = async (req: Request, res: Response) => {
  const { userId, itemId } = req.body;
  console.log(userId, itemId);
  
  
  
  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const like = await Like.findOne({
      where: { userId, itemId },
    });

    if (like) {
      await like.destroy();
      return res.status(200).json({ message: 'Item unliked successfully' });
    } else {
      await Like.create({ userId, itemId });
      return res.status(201).json({ message: 'Item liked successfully' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const viewItem = async (req: Request, res: Response) => {
  const { userId, itemId } = req.body;

  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const view = await View.findOne({
      where: { userId, itemId },
    });

    if (view) {
      return res.status(400).json({ message: 'Item already viewed' });
    } else {
      await View.create({ userId, itemId });
      item.increment('views');
      return res.status(200).json({ message: 'Item viewed successfully' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// get items by sort
export const getItemsByPrice = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = req.query.order === 'desc' ? 'DESC' : 'ASC'; // Check if the order is 'desc' for descending, otherwise ascending
    const items = await Item.findAll({
      order: [['price', order]]
    });
    return res.status(200).json({
      message: "Items retrieved successfully",
      data: items,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, could not retrieve items" });
  }
};

export const getItemsByDuration = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = req.query.order === 'desc' ? 'DESC' : 'ASC'; // Check if the order is 'desc' for descending, otherwise ascending
    const items = await Item.findAll({
      order: [[Item.sequelize?.literal('createdAt + INTERVAL duration SECOND') || 'createdAt', order]]
    });
    return res.status(200).json({
      message: "Items retrieved successfully",
      data: items,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, could not retrieve items" });
  }
};

export const getItemsByViewsInPastDay = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = req.query.order === 'desc' ? 'DESC' : 'ASC'; // Check if the order is 'desc' for descending, otherwise ascending
    const items = await Item.findAll({
      include: [{
        model: View,
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 1))
          }
        },
        required: true
      }],
      order: [[literal('views'), order]]
    });

    return res.status(200).json({
      message: "Items retrieved successfully",
      data: items,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Server error, could not retrieve items", error: error.message });
  }
};