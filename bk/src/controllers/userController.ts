import { Request, Response } from "express";
import { User } from "../models/user";
import { Follow } from "../models/follow";
import { Item } from "../models/item";
import bcrypt from "bcrypt";

// import jwt from "jsonwebtoken";
// import redisClient from "../DB/redisClient";
// import { userKey } from "../utils/keys";

// const EXPIRATION_TIME = 86400; // 1 day in seconds

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    // const cacheKey = userKey(id);
    // const cachedUser = await redisClient.hGetAll(cacheKey);

    // if (Object.keys(cachedUser).length > 0) {
    //   return res.json(cachedUser);
    // }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const userData = {
      id: user.id.toString(),
      name: user.username,
      email: user.email,
      password: user.password,
      pic: user.pic,
      date_of_birth: user.date_of_birth?.toISOString() || "",
      job: user.job,
      education: user.education,
      location: user.location,
    };

    // await redisClient.hSet(cacheKey, userData);
    // await redisClient.expire(cacheKey, EXPIRATION_TIME); // Cache for 1 day
    return res.json(userData);
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res
      .status(500)
      .json({ message: "Server error, could not retrieve user" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.userId;
  const { name, password, email, ...optionalFields } = req.body;
  try {    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.username = name || user.username;
    user.password = await bcrypt.hash(password, 10) || user.password;
    user.email = email || user.email;
    Object.assign(user, optionalFields);

    await user.save();

    // const userData = {
    //   id: user.id.toString(),
    //   name: user.username,
    //   email: user.email,
    //   password: user.password,
    //   pic: user.pic,
    //   date_of_birth: user.date_of_birth?.toISOString() || "",
    //   job: user.job,
    //   education: user.education,
    //   location: user.location,
    // };

    // Update the cache
    // const cacheKey = userKey(id);
    // await redisClient.hSet(cacheKey, userData);
    // await redisClient.expire(cacheKey, EXPIRATION_TIME); // Cache for 1 day

    return res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Server error, could not update user" });
  }
};

export const getUserFollowers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {    
    const userId = parseInt(req.params.userId);

    const userFollowers = await User.findByPk(userId, {
      include: [
        {
          model: User,
          as: "followers",
          attributes: ["id", "username", "email", "pic"],
        },
      ],
    });
    if (!userFollowers)
      return res.status(404).json({ message: "User donot have follower" });
    return res.json({
      followers: userFollowers.followers || [],
    });
  } catch (error) {
    console.error("Error fetching followers: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const followUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const followerId = parseInt(req.userId);
    const followingId = parseInt(req.params.userId);

    if (followerId === followingId)
      return res.status(400).json({ error: "Cannot follow yourself" });

    const [follower, following] = await Promise.all([
      User.findByPk(followerId),
      User.findByPk(followingId),
    ]);

    if (!follower || !following)
      return res.status(404).json({ error: "User not found" });

    const existingFollow = await Follow.findOne({
      where: { followerId, followingId },
    });
    if (existingFollow)
      return res.status(400).json({ error: "Already following this user" });

    await Follow.create({ followerId, followingId });

    return res.status(201).json({
      message: "Successfully followed user",
      followerId,
      followingId,
    });
  } catch (error) {
    console.error("Follow error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserItems = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {userId} = req.params;
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Item,
          as: "items",    
          attributes: { exclude: ["userId"] },
        },
      ],
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    const items = (user as any).items || [];
    return res.json({
      userId,
      items,
    });
  } catch (error) {
    console.error("Error fetching user items:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
