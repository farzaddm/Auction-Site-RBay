import { Item } from "../models/item";
import { Request, Response } from "express";

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


