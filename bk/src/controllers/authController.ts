import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import validator from 'validator';

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log(token);
    
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  const { email, password, name } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, name });
    const token = jwt.sign({ userId: newUser.id }, 'your_jwt_secret', { expiresIn: '1h' });
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const signOut = (req: Request, res: Response): Response => {
  res.clearCookie('token'); // Assuming the token is stored in a cookie
  return res.json({ message: 'Signed out successfully' });
};
