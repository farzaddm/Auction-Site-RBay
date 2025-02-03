import { Request, Response } from "express";
import { Chat } from "../models/chat";
import { User } from "../models/user";
import { Item } from "../models/item";

export const getChats = async (req: Request, res: Response) => {
    const { itemId } = req.params;
    try {
        const chats = await Chat.findAll({ where: { itemId }, include: [User] });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch chats" });
    }
};

export const postChat = async (req: Request, res: Response) => {
    const { itemId } = req.params;
    const { userId, message } = req.body;
    console.log(itemId, userId, message);
    
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const item = await Item.findByPk(itemId);
        if (!item) {

            return res.status(400).json({ error: "Item not found" });
        }

        const chat = await Chat.create({ itemId, userId, message });
        return res.status(201).json(chat);
    } catch (error) {
        console.error("Error posting chat:", error);
        return res.status(500).json({ error: "Failed to post chat" });
    }
};
