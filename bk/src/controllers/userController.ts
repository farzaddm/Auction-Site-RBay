import { Request, Response } from "express";
import { User } from "../models/user";
// import redisClient from "../DB/redisClient";
// import { userKey } from "../utils/keys";

// const EXPIRATION_TIME = 86400; // 1 day in seconds

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    // const cacheKey = userKey(id);
    // const cachedUser = await redisClient.hGetAll(cacheKey);

    // if (Object.keys(cachedUser).length > 0) {
    //   return res.json(cachedUser);
    // }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const userData = { // give following
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
  const { id } = req.params;
  const { name, password, email, ...optionalFields } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.username = name || user.username;
    user.password = password || user.password;
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
