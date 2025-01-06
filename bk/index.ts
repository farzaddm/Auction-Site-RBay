import express from "express";
import itemRouters from "./src/routes/itemRouters";
import dotenv from "dotenv";
import { syncDatabase } from "./src/DB/index"; // Import the main function from DB/index
import morgan from 'morgan';

// Load environment variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use("/api/items", itemRouters);
// app.use("/api/users");

app.get("/", (req, res) => {
  res.send("hi");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // Synchronize the database
  await syncDatabase();
});
