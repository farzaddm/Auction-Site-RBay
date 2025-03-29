import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Request type to include userId
declare global {
  namespace Express {
    interface Request {
      userId: string; // Add custom property to Request
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ error: "Unauthorized - No token provided" });
      return;
    }
    
    const decoded = jwt.verify(token, "your_jwt_secret") as { userId: string };
    req.userId = decoded.userId;
    next();

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Unauthorized - Invalid token" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
