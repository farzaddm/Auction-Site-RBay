import express from "express";
import { createItem, getItemsByPrice } from "../controllers/itemController";

const router = express.Router();

router.post('/', createItem as any);
router.get('/get-by-price', getItemsByPrice as any);

export default router;