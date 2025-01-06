import { Request, Response } from "express";
import { User } from "../models/user";

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, password, email, ...optionalFields } = req.body;
    
        if (!name || !password || !email) {
          return res.status(400).json({ message: "Name, password, and email are required." });
        }
    
        const newUser = await User.create({
          name,
          password,
          email,
          ...optionalFields,
        });
    
        return res.status(201).json({
          message: "User created successfully",
          data: newUser,
        });
      } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server error, could not create user." });
      }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, password, email, ...optionalFields } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.name = name || user.name;
    user.password = password || user.password;
    user.email = email || user.email;
    Object.assign(user, optionalFields);

    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      data: user,
    });

  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server error, could not update user."});
  }
}