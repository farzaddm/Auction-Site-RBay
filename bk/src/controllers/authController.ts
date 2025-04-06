import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import validator from "validator";

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    return res.json({
      message: "Login successful",
      userId: user.id,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password, username } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = jwt.sign({ userId: newUser.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    // Set JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // HTTPS in production
      sameSite: "strict", // Prevent CSRF
      maxAge: 3600000, // 1 hour (matches JWT expiry)
    });

    return res
      .status(201)
      .json({ message: "User signup successfuly", userId: newUser.id });
  } catch (error) {
    console.error("Signup Error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req: Request, res: Response): Response => {
  res.clearCookie("token");
  return res.json({ message: "Logout successful" });
};
