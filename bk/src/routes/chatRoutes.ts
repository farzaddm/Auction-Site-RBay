import express from "express";
import { getChats, postChat } from "../controllers/chatController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/:itemId", getChats as any);
router.post("/:itemId",authMiddleware, postChat as any);

export default router;
