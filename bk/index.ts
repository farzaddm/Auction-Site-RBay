import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import itemRoutes from "./src/routes/itemRoutes";
import userRoutes from "./src/routes/userRoutes";
import authRoutes from "./src/routes/authRoutes";
import chatRoutes from "./src/routes/chatRoutes";

import dotenv from "dotenv";
import { syncDatabase } from "./src/DB/index"; // Import the main function from DB/index
import morgan from "morgan";

// Load environment variables
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // Synchronize the database
  await syncDatabase();
});
