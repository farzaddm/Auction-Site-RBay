import express from "express";
import { createItem } from "../controllers/itemController";

const router = express.Router();

router.post('/', createItem as any);

export default router;