import express from "express";
import itemRouters from "./src/routes/itemRouters";

const app = express();

app.use(express.json());

app.use("/api/items", itemRouters);

app.get("/", (req, res) => {
  res.send("hi");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
