-- Insert Users
INSERT INTO Users (username, password, email, pic, date_of_birth, job, education, location, createdAt, updatedAt) VALUES
('alice_johnson', 'pass123', 'alice@mail.com', 'alice.jpg', '1990-05-14', 'Engineer', 'MIT', 'New York', '2024-03-01 10:00:00', '2024-03-01 10:00:00'),
('bob_smith', 'secure456', 'bob@mail.com', 'bob.jpg', '1985-08-21', 'Designer', 'Harvard', 'San Francisco', '2024-03-02 11:15:00', '2024-03-02 11:15:00'),
('charlie_brown', 'qwerty789', 'charlie@mail.com', 'charlie.jpg', '1995-02-11', 'Developer', 'Stanford', 'Los Angeles', '2024-03-03 09:45:00', '2024-03-03 09:45:00'),
('david_white', 'davidpass', 'david@mail.com', 'david.jpg', '1988-07-30', 'Manager', 'Yale', 'Seattle', '2024-03-04 08:30:00', '2024-03-04 08:30:00'),
('emma_davis', 'emma321', 'emma@mail.com', 'emma.jpg', '1993-12-05', 'Analyst', 'Princeton', 'Chicago', '2024-03-05 07:20:00', '2024-03-05 07:20:00');

-- Insert Items
-- INSERT INTO Items (userId, name, description, price, pic, duration, category, hotness, createdAt, updatedAt) VALUES
-- (1, 'Vintage Vase', 'A beautiful antique vase.', 49.99, 'vase.jpg', 7, 'decorative', TRUE, '2024-03-06 12:00:00', '2024-03-06 12:00:00'),
-- (2, 'Leather Sofa', 'A comfortable brown leather sofa.', 299.99, 'sofa.jpg', 10, 'furniture', FALSE, '2024-03-07 13:15:00', '2024-03-07 13:15:00'),
-- (3, 'Smart TV', 'A 55-inch 4K smart television.', 499.99, 'tv.jpg', 5, 'electronics', TRUE, '2024-03-08 14:30:00', '2024-03-08 14:30:00'),
-- (4, 'Winter Jacket', 'A stylish winter jacket.', 79.99, 'jacket.jpg', 14, 'clothing', FALSE, '2024-03-09 15:45:00', '2024-03-09 15:45:00'),
-- (5, 'Python Programming Book', 'A book on Python programming.', 19.99, 'book.jpg', 30, 'books', FALSE, '2024-03-10 16:00:00', '2024-03-10 16:00:00');
-- Insert Items
INSERT INTO Items (userId, name, description, price, pic, views, likes, duration, category, hotness, createdAt, updatedAt) VALUES
(1, 'Vintage Lamp', 'A beautiful antique lamp.', 50.00, 'lamp.jpg', 120, 15, 3600, 'decorative', FALSE, '2024-03-01 12:00:00', '2024-03-01 12:00:00'),
(2, 'Modern Sofa', 'Comfortable and stylish sofa.', 250.00, 'sofa.jpg', 300, 40, 86400, 'furniture', TRUE, '2024-03-02 14:30:00', '2024-03-02 14:30:00'),
(3, 'Smartphone', 'Latest model with 128GB storage.', 700.00, 'phone.jpg', 500, 60, 259200, 'electronics', TRUE, '2024-03-03 09:00:00', '2024-03-03 09:00:00'),
(4, 'Winter Jacket', 'Warm and cozy.', 80.00, 'jacket.jpg', 150, 25, 172800, 'clothing', FALSE, '2024-03-04 11:45:00', '2024-03-04 11:45:00'),
(5, 'Harry Potter Set', 'Complete book collection.', 120.00, 'books.jpg', 220, 35, 432000, 'books', FALSE, '2024-03-05 16:20:00', '2024-03-05 16:20:00'),
(1, 'Gaming Console', 'Brand new with extra controllers.', 400.00, 'console.jpg', 800, 100, 604800, 'electronics', TRUE, '2024-03-06 18:10:00', '2024-03-06 18:10:00'),
(1, 'Mountain Bike', 'Durable and lightweight.', 550.00, 'bike.jpg', 420, 50, 1209600, 'sports', TRUE, '2024-03-07 08:30:00', '2024-03-07 08:30:00'),
(2, 'Dollhouse', 'Handmade wooden dollhouse.', 90.00, 'dollhouse.jpg', 200, 30, 864000, 'toys', FALSE, '2024-03-08 10:00:00', '2024-03-08 10:00:00'),
(3, 'Cookware Set', '10-piece nonstick cookware.', 75.00, 'cookware.jpg', 180, 22, 216000, 'furniture', FALSE, '2024-03-09 12:45:00', '2024-03-09 12:45:00'),
(4, 'Rare Coin', 'Collector\'s item.', 600.00, 'coin.jpg', 250, 45, 2592000, 'decorative', TRUE, '2024-03-10 15:00:00', '2024-03-10 15:00:00'),
(3, 'Leather Wallet', 'Handmade leather wallet.', 40.00, 'wallet.jpg', 130, 18, 604800, 'clothing', FALSE, '2024-03-11 09:30:00', '2024-03-11 09:30:00'),
(3, 'Smartwatch', 'Tracks fitness and notifications.', 200.00, 'watch.jpg', 370, 55, 345600, 'electronics', TRUE, '2024-03-12 14:10:00', '2024-03-12 14:10:00'),
(2, 'Basketball', 'Official NBA size.', 30.00, 'basketball.jpg', 90, 10, 172800, 'sports', FALSE, '2024-03-13 16:30:00', '2024-03-13 16:30:00'),
(4, 'Bedside Table', 'Minimalist wooden design.', 120.00, 'table.jpg', 200, 27, 604800, 'furniture', FALSE, '2024-03-14 11:20:00', '2024-03-14 11:20:00'),
(3, 'Vinyl Records', 'Classic rock collection.', 150.00, 'vinyl.jpg', 240, 40, 1209600, 'decorative', FALSE, '2024-03-15 13:40:00', '2024-03-15 13:40:00'),
(1, 'Yoga Mat', 'Non-slip material.', 25.00, 'yoga.jpg', 100, 12, 259200, 'sports', FALSE, '2024-03-16 08:55:00', '2024-03-16 08:55:00'),
(1, 'Coffee Maker', 'Brews up to 10 cups.', 85.00, 'coffee.jpg', 180, 26, 864000, 'electronics', FALSE, '2024-03-17 10:15:00', '2024-03-17 10:15:00'),
(2, 'Football Jersey', 'Official team merchandise.', 70.00, 'jersey.jpg', 160, 22, 432000, 'clothing', FALSE, '2024-03-18 12:25:00', '2024-03-18 12:25:00'),
(5, 'Guitar', 'Acoustic with case.', 320.00, 'guitar.jpg', 450, 60, 1209600, 'decorative', TRUE, '2024-03-19 15:30:00', '2024-03-19 15:30:00'),
(5, 'Telescope', 'For stargazing.', 500.00, 'telescope.jpg', 600, 75, 2592000, 'electronics', TRUE, '2024-03-20 18:45:00', '2024-03-20 18:45:00');

-- Additional 30 similar items covering different price ranges, categories, and hotness statuses.

-- Insert Bids
INSERT INTO Bids (price, userId, itemId, createdAt, updatedAt) VALUES
(55.00, 2, 1, '2024-03-11 17:00:00', '2024-03-11 17:00:00'),
(305.00, 3, 2, '2024-03-12 18:15:00', '2024-03-12 18:15:00'),
(520.00, 4, 3, '2024-03-13 19:30:00', '2024-03-13 19:30:00'),
(85.00, 5, 4, '2024-03-14 20:45:00', '2024-03-14 20:45:00'),
(25.00, 1, 5, '2024-03-15 21:00:00', '2024-03-15 21:00:00');

-- Insert Chats
INSERT INTO Chats (message, userId, itemId, createdAt, updatedAt) VALUES
('Is this still available?', 3, 1, '2024-03-16 10:10:00', '2024-03-16 10:10:00'),
('Can you provide more details?', 4, 2, '2024-03-17 11:20:00', '2024-03-17 11:20:00'),
('What’s the best price you can offer?', 5, 3, '2024-03-18 12:30:00', '2024-03-18 12:30:00'),
('Can you deliver it?', 1, 4, '2024-03-19 13:40:00', '2024-03-19 13:40:00'),
('I’m interested in buying this.', 2, 5, '2024-03-20 14:50:00', '2024-03-20 14:50:00');

-- Insert Likes
INSERT INTO Likes (userId, itemId, createdAt, updatedAt) VALUES
(1, 3, '2024-03-21 15:00:00', '2024-03-21 15:00:00'),
(2, 4, '2024-03-22 16:10:00', '2024-03-22 16:10:00'),
(3, 5, '2024-03-23 17:20:00', '2024-03-23 17:20:00'),
(4, 1, '2024-03-24 18:30:00', '2024-03-24 18:30:00'),
(5, 2, '2024-03-25 19:40:00', '2024-03-25 19:40:00');

-- Insert Views
INSERT INTO Views (userId, itemId, createdAt, updatedAt) VALUES
(1, 2, '2024-03-26 10:00:00', '2024-03-26 10:00:00'),
(2, 3, '2024-03-27 11:15:00', '2024-03-27 11:15:00'),
(3, 4, '2024-03-28 12:30:00', '2024-03-28 12:30:00'),
(4, 5, '2024-03-29 13:45:00', '2024-03-29 13:45:00'),
(5, 1, '2024-03-30 14:00:00', '2024-03-30 14:00:00');

-- Insert Follows
INSERT INTO Follows (followerId, followingId, createdAt, updatedAt) VALUES
(1, 2, '2024-03-31 15:10:00', '2024-03-31 15:10:00'),
(2, 3, '2024-04-01 16:20:00', '2024-04-01 16:20:00'),
(3, 4, '2024-04-02 17:30:00', '2024-04-02 17:30:00'),
(4, 5, '2024-04-03 18:40:00', '2024-04-03 18:40:00'),
(5, 1, '2024-04-04 19:50:00', '2024-04-04 19:50:00');
