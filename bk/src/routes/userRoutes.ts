import express from "express";
import { followUser, getUserById, getUserFollowers, getUserItems, updateUser } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get('/follower/:userId', getUserFollowers as any);
router.get('/items/:userId', getUserItems as any);
router.get('/:id', getUserById as any);
router.put('/', authMiddleware, updateUser as any);
router.post('/follow/:userId', authMiddleware, followUser as any);


export default router;