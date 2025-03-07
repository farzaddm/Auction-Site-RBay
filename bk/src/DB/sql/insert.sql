-- Insert Users
INSERT INTO Users (name, password, email, pic, date_of_birth, job, education, location, createdAt, updatedAt) VALUES
('Alice Johnson', 'pass123', 'alice@mail.com', 'alice.jpg', '1990-05-14', 'Engineer', 'MIT', 'New York', '2024-03-01 10:00:00', '2024-03-01 10:00:00'),
('Bob Smith', 'secure456', 'bob@mail.com', 'bob.jpg', '1985-08-21', 'Designer', 'Harvard', 'San Francisco', '2024-03-02 11:15:00', '2024-03-02 11:15:00'),
('Charlie Brown', 'qwerty789', 'charlie@mail.com', 'charlie.jpg', '1995-02-11', 'Developer', 'Stanford', 'Los Angeles', '2024-03-03 09:45:00', '2024-03-03 09:45:00'),
('David White', 'davidpass', 'david@mail.com', 'david.jpg', '1988-07-30', 'Manager', 'Yale', 'Seattle', '2024-03-04 08:30:00', '2024-03-04 08:30:00'),
('Emma Davis', 'emma321', 'emma@mail.com', 'emma.jpg', '1993-12-05', 'Analyst', 'Princeton', 'Chicago', '2024-03-05 07:20:00', '2024-03-05 07:20:00');

-- Insert Items
INSERT INTO Items (userId, name, description, price, pic, duration, category, hotness, createdAt, updatedAt) VALUES
(1, 'Vintage Vase', 'A beautiful antique vase.', 49.99, 'vase.jpg', 7, 'decorative', TRUE, '2024-03-06 12:00:00', '2024-03-06 12:00:00'),
(2, 'Leather Sofa', 'A comfortable brown leather sofa.', 299.99, 'sofa.jpg', 10, 'furniture', FALSE, '2024-03-07 13:15:00', '2024-03-07 13:15:00'),
(3, 'Smart TV', 'A 55-inch 4K smart television.', 499.99, 'tv.jpg', 5, 'electronics', TRUE, '2024-03-08 14:30:00', '2024-03-08 14:30:00'),
(4, 'Winter Jacket', 'A stylish winter jacket.', 79.99, 'jacket.jpg', 14, 'clothing', FALSE, '2024-03-09 15:45:00', '2024-03-09 15:45:00'),
(5, 'Python Programming Book', 'A book on Python programming.', 19.99, 'book.jpg', 30, 'books', FALSE, '2024-03-10 16:00:00', '2024-03-10 16:00:00');

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
