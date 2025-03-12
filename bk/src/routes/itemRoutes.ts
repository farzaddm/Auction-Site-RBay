import express from "express";
import { createItem, bidOnItem, getItemById, likeItem, getItems, dashboard, deleteItem, search } from "../controllers/itemController";

const router = express.Router();

router.post('/', createItem as any);
router.get('/search', search as any);
router.get('/', getItems as any);
router.post('/like', likeItem as any);
router.get('/:id', getItemById as any);
router.post('/bid', bidOnItem as any);
router.get('/dashboard/:id', dashboard as any);
router.delete('/:id', deleteItem as any);



export default router;