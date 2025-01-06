import { sequelize } from "./sequelize";

export async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // Use `force: true` for development to drop and recreate tables
    console.log("Database synchronized successfully!");
  } catch (error) {
    console.error("Failed to synchronize database:", error);
  }
}

