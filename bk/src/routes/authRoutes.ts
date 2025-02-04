import express from 'express';
import { signUp, login, signOut } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signUp as any);
router.post('/login', login as any);
router.post('/signout', signOut as any);

export default router;
