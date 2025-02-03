import express from "express";
import { getChats, postChat } from "../controllers/chatController";

const router = express.Router();

router.get("/:itemId", getChats);
router.post("/:itemId", postChat as any);

export default router;
