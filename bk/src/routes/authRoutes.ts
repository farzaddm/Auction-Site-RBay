import express from 'express';
import { signUp, login, logout } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signUp as any);
router.post('/login', login as any);
router.post('/logout', logout as any);

export default router;
