import express from "express";
import { createItem, getItemsByPrice, getItemsByDuration } from "../controllers/itemController";

const router = express.Router();

router.post('/', createItem as any);
router.get('/by-price', getItemsByPrice as any);
router.get('/by-duration', getItemsByDuration as any);

export default router;