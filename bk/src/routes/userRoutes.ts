import express from "express";
import { followUser, getUserById, getUserFollowers, getUserItems } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get('/follower', getUserFollowers as any);
router.get('/items', getUserItems as any);
router.get('/:id', getUserById as any);
router.post('/follow/:userId', authMiddleware, followUser as any);


export default router;