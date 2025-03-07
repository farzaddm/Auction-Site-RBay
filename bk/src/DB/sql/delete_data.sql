-- Disable foreign key checks temporarily to avoid constraint issues when truncating
SET FOREIGN_KEY_CHECKS = 0;

-- Truncate all tables to delete all data
TRUNCATE TABLE Chats;
TRUNCATE TABLE Likes;
TRUNCATE TABLE Views;
TRUNCATE TABLE Follows;
TRUNCATE TABLE Bids;
TRUNCATE TABLE Items;
TRUNCATE TABLE Users;

-- Re-enable foreign key checks after truncating
SET FOREIGN_KEY_CHECKS = 1;
