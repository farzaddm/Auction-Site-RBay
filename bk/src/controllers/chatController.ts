import { Request, Response } from "express";
import { Chat } from "../models/chat";
import { User } from "../models/user";
import { Item } from "../models/item";
// import redisClient from "../DB/redisClient";
// import { chatKey } from '../utils/keys';

// const EXPIRATION_TIME = 86400; // 1 day in seconds

export const getChats = async (req: Request, res: Response): Promise<Response> => {
    const { itemId } = req.params;
    try {
        // const cacheKey = chatKey(itemId);
        // const cachedChats = await redisClient.lRange(cacheKey, 0, -1);

        // if (cachedChats.length > 0) {
        //     const chats = cachedChats.map(chat => JSON.parse(chat));
        //     return res.json(chats);
        // }

        const chats = await Chat.findAll({ where: { itemId }, include: [User] });
        // const chatStrings = chats.map(chat => JSON.stringify(chat));
        // await redisClient.rPush(cacheKey, chatStrings);
        // await redisClient.expire(cacheKey, EXPIRATION_TIME); // Set expiration time to 1 day
        return res.json(chats);
    } catch (error) {
        console.error("Error fetching chats:", error);
        return res.status(500).json({ error: "Failed to fetch chats" });
    }
};

export const postChat = async (req: Request, res: Response): Promise<Response> => {
    const { itemId } = req.params;
    const { userId, message } = req.body;    
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

        // Add the new chat message to the Redis list
        // const cacheKey = chatKey(itemId);
        // await redisClient.rPush(cacheKey, JSON.stringify(chat));
        // await redisClient.expire(cacheKey, EXPIRATION_TIME); // Set expiration time to 1 day
        
        return res.status(201).json(chat);
    } catch (error) {
        console.error("Error posting chat:", error);
        return res.status(500).json({ error: "Failed to post chat" });
    }
};
