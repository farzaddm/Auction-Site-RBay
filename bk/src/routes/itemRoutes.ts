import express from "express";
import { createItem, getItemById, getItemsByPrice, getItemsByDuration, likeItem, viewItem, getItemsByViewsInPastDay } from "../controllers/itemController";

const router = express.Router();

router.post('/', createItem as any);
router.get('/by-price', getItemsByPrice as any);
router.get('/by-duration', getItemsByDuration as any);
router.post('/like', likeItem as any);
router.post('/view', viewItem as any);
router.get('/views-in-past-day', getItemsByViewsInPastDay as any);
router.get('/:id', getItemById as any);

export default router;