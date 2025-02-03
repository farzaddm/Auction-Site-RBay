import express from "express";
import { createUser, getUserById } from "../controllers/userController";

const router = express.Router();

router.post('/', createUser as any);
router.get('/:id', getUserById as any)

export default router;