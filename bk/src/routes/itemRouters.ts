import express from "express";
import { createItem, getItemsByPrice, getItemsByDuration, likeItem } from "../controllers/itemController";

const router = express.Router();

router.post('/', createItem as any);
router.get('/by-price', getItemsByPrice as any);
router.get('/by-duration', getItemsByDuration as any);
router.post('/like', likeItem as any);

export default router;