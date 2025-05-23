import express from "express";
import {
  createItem,
  bidOnItem,
  getItemById,
  likeItem,
  getItems,
  dashboard,
  deleteItem,
  search,
} from "../controllers/itemController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createItem as any);
router.get("/search", search as any);
router.get("/", getItems as any);
router.post("/like", authMiddleware, likeItem as any);
router.get("/:id", getItemById as any);
router.post("/bid", authMiddleware, bidOnItem as any);
router.get("/dashboard/:id", dashboard as any);
router.delete("/:id", authMiddleware, deleteItem as any);

export default router;
