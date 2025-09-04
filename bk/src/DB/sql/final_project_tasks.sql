CREATE DATABASE IF NOT EXISTS auction_site_presentation;
USE auction_site_presentation;
-- -- ______________ 1 ______________
-- User entity
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    wallet DECIMAL(8, 2) DEFAULT 0.00,
    picture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- User information extension
CREATE TABLE IF NOT EXISTS user_info (
    user_id INT PRIMARY KEY,
    job VARCHAR(50),
    education VARCHAR(50),
    location VARCHAR(100),
    birthdate DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
-- Category for items
CREATE TABLE IF NOT EXISTS categories (
    category_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
-- Item/Diagram entity
CREATE TABLE IF NOT EXISTS items (
    item_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    picture VARCHAR(255),
    number_of_views INT DEFAULT 0,
    number_of_likes INT DEFAULT 0,
    price DECIMAL(8, 2),
    duration_in_minutes INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner_id INT,
    category_id INT,
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE
    SET NULL
);
-- View tracking
CREATE TABLE IF NOT EXISTS views (
    item_id INT,
    user_id INT,
    view_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (item_id, user_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
-- Likes tracking
CREATE TABLE IF NOT EXISTS likes (
    item_id INT,
    user_id INT,
    PRIMARY KEY (item_id, user_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
-- Bids tracking
CREATE TABLE IF NOT EXISTS bids (
    bid_id INT PRIMARY KEY,
    item_id INT,
    user_id INT,
    bid_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(8, 2) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE
    SET NULL
);
-- Comments for item
CREATE TABLE IF NOT EXISTS comments (
    comment_id INT PRIMARY KEY,
    sender_id INT,
    item_id INT,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE
    SET NULL,
        FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
);
-- Delivers
CREATE TABLE IF NOT EXISTS deliver_persons (
    deliver_person_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL,
    status SMALLINT DEFAULT 0
);
-- Purchase records
CREATE TABLE IF NOT EXISTS purchases (
    purchase_id INT PRIMARY KEY,
    user_id INT,
    item_id INT,
    deliver_person_id INT,
    amount DECIMAL(8, 2) NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status SMALLINT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE
    SET NULL,
        FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE
    SET NULL,
        FOREIGN KEY (deliver_person_id) REFERENCES deliver_persons(deliver_person_id) ON DELETE
    SET NULL
);
-- Reports/Issues
CREATE TABLE IF NOT EXISTS reports (
    purchase_id INT PRIMARY KEY,
    description TEXT NOT NULL,
    report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status SMALLINT DEFAULT 0,
    FOREIGN KEY (purchase_id) REFERENCES purchases(purchase_id) ON DELETE CASCADE
);
-- Follows
CREATE TABLE IF NOT EXISTS follows (
    follower_id INT,
    following_id INT,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(user_id) ON DELETE CASCADE
);
-- -- ______________ 2 ______________
-- -- Create a new user
-- INSERT INTO users (user_id, username, email, password, wallet, picture)
-- VALUES (11, 'john_doe', 'john.doe@example.com', 'SecurePass123!', 100.00, 'https://placeimg.com/200/200/any');
-- -- Add amount to user's wallet by ID
-- UPDATE users
-- SET wallet = wallet + 50.00
-- WHERE user_id = 11;
-- -- Retrieve user information by ID
-- SELECT u.user_id, u.username, u.email, u.wallet, u.picture, u.created_at, 
--        ui.job, ui.education, ui.location, ui.birthdate
-- FROM users u
-- LEFT JOIN user_info ui ON u.user_id = ui.user_id
-- WHERE u.user_id = 11;
-- -- Retrieve list of categories
-- SELECT category_id, name
-- FROM categories;
-- -- Create a new item
-- INSERT INTO items (item_id, name, description, picture, price, duration_in_minutes, owner_id, category_id)
-- VALUES (11, 'Vintage Watch', 'A classic vintage watch in excellent condition.', 'https://placeimg.com/400/400/any', 99.99, 120, 11, 10);
-- -- Retrieve list of items by category
-- SELECT item_id, name, description, picture, number_of_views, number_of_likes, price, 
--        duration_in_minutes, created_at, updated_at, owner_id
-- FROM items
-- WHERE category_id = 10;
-- -- Like an item by a user
-- INSERT INTO likes (item_id, user_id)
-- VALUES (11, 11)
-- ON DUPLICATE KEY UPDATE item_id = item_id;
-- -- Record a view by a user
-- INSERT INTO views (item_id, user_id, view_date)
-- VALUES (11, 11, CURRENT_TIMESTAMP)
-- ON DUPLICATE KEY UPDATE view_date = CURRENT_TIMESTAMP;
-- -- Place a bid on an item
-- INSERT INTO bids (bid_id, item_id, user_id, amount)
-- VALUES (13, 10, 9, 1500.00);
-- Add a comment to an item
-- INSERT INTO comments (comment_id, sender_id, item_id, message)
-- VALUES (11, 11, 11, 'This watch looks amazing!');
-- ______________ 3 ______________
SELECT *
FROM users;
SELECT *
FROM user_info;
SELECT *
FROM categories;
SELECT *
FROM views;
SELECT *
FROM items;
SELECT *
FROM likes;
SELECT *
FROM bids;
SELECT *
FROM comments;
SELECT *
FROM deliver_persons;
SELECT *
FROM purchases;
SELECT *
FROM reports;
-- 1. show the how much items each person owns
SELECT owner_id,
    COUNT(*) AS numberOFitems
FROM items
GROUP BY owner_id;
-- 2. show info about purchase
SELECT i.item_id,
    i.name,
    u.user_id,
    wallet
FROM purchases p
    JOIN users u USING (user_id)
    JOIN items i USING (item_id)
WHERE user_id IN (
        SELECT user_id
        FROM users
        WHERE wallet > 200
    );
-- 3. show the items that never bids more than 200
SELECT *
FROM items
WHERE name IN (
        SELECT i.name
        FROM purchases
            JOIN items i USING (item_id)
        WHERE user_id NOT IN (
                SELECT user_id
                FROM bids
                    JOIN users u USING(user_id)
                WHERE amount > 200
            )
    );
-- 4. show all users with their additional information
SELECT u.user_id,
    u.username,
    u.email,
    u.wallet,
    ui.job,
    ui.education,
    ui.location
FROM users u
    LEFT JOIN user_info ui ON u.user_id = ui.user_id;
-- 5. show all items with category name and owner name
SELECT i.item_id,
    i.name AS item_name,
    i.price,
    c.name AS category_name,
    u.username AS owner_name
FROM items i
    LEFT JOIN categories c ON i.category_id = c.category_id
    LEFT JOIN users u ON i.owner_id = u.user_id;
-- 6. show the highest bid for each item
SELECT b.item_id,
    MAX(b.amount) AS highest_bid
FROM bids b
GROUP BY b.item_id;
-- 7. show top 5 users with the highest wallet balance
SELECT user_id,
    username,
    wallet
FROM users
ORDER BY wallet DESC
LIMIT 5;
-- 8. show items that have more than 200 views
SELECT item_id,
    name,
    number_of_views
FROM items
WHERE number_of_views > 200;
-- 9. show the number of items in each category
SELECT c.name AS category_name,
    COUNT(i.item_id) AS total_items
FROM categories c
    LEFT JOIN items i ON c.category_id = i.category_id
GROUP BY c.category_id,
    c.name;
-- 10. show purchase records with buyer and delivery person
SELECT p.purchase_id,
    u.username AS buyer,
    i.name AS item_name,
    d.name AS deliver_person,
    p.amount,
    p.status
FROM purchases p
    LEFT JOIN users u ON p.user_id = u.user_id
    LEFT JOIN items i ON p.item_id = i.item_id
    LEFT JOIN deliver_persons d ON p.deliver_person_id = d.deliver_person_id;
-- 11. show all likes with user and item details
SELECT l.user_id,
    u.username,
    l.item_id,
    i.name AS item_name
FROM likes l
    JOIN users u ON l.user_id = u.user_id
    JOIN items i ON l.item_id = i.item_id;
-- 12. show the top 3 items with the most likes
SELECT item_id,
    name,
    number_of_likes
FROM items
ORDER BY number_of_likes DESC
LIMIT 3;
-- 13. show all reports with purchase and buyer information
SELECT r.purchase_id,
    r.description,
    r.status,
    u.username AS buyer,
    i.name AS item_name
FROM reports r
    JOIN purchases p ON r.purchase_id = p.purchase_id
    JOIN users u ON p.user_id = u.user_id
    JOIN items i ON p.item_id = i.item_id;
-- ______________ 4 ______________
-- USERS
INSERT INTO users (
        user_id,
        username,
        email,
        password,
        wallet,
        picture,
        created_at
    )
VALUES (
        1,
        'tammywoods',
        'trujilloana@gmail.com',
        'b6Wq6Cqz@5',
        378.98,
        'https://placeimg.com/164/655/any',
        '2023-06-19 09:58:16'
    ),
    (
        2,
        'andrea18',
        'tamaramorrison@hotmail.com',
        '%7C1m#y7tc',
        210.29,
        'https://dummyimage.com/801x564',
        '2023-12-01 07:17:08'
    ),
    (
        3,
        'criley',
        'christopher91@yahoo.com',
        'hGeF0J%j)5',
        129.46,
        'https://www.lorempixel.com/254/386',
        '2024-08-30 17:20:38'
    ),
    (
        4,
        'woodtina',
        'leetara@martinez.com',
        'n^^A6TMdd(',
        255.64,
        'https://www.lorempixel.com/346/416',
        '2025-11-16 10:37:47'
    ),
    (
        5,
        'meganpeterson',
        'carlsonscott@gmail.com',
        '!qVana+d7^',
        202.47,
        'https://placekitten.com/491/986',
        '2025-08-05 19:30:21'
    ),
    (
        6,
        'emily99',
        'paul61@wheeler.com',
        'L#3qHqTue0',
        391.9,
        'https://www.lorempixel.com/997/0',
        '2025-02-07 07:22:42'
    ),
    (
        7,
        'larry70',
        'amymccarty@gmail.com',
        'w+2AmycX2X',
        151.66,
        'https://www.lorempixel.com/974/812',
        '2023-02-03 22:27:33'
    ),
    (
        8,
        'robin14',
        'darin24@williams.com',
        't$h5LesZF(',
        238.3,
        'https://dummyimage.com/18x283',
        '2024-02-26 13:32:05'
    ),
    (
        9,
        'matthew51',
        'williamsfrank@hotmail.com',
        ')5gvAMfr%A',
        291.69,
        'https://placeimg.com/703/254/any',
        '2023-06-30 05:05:38'
    ),
    (
        10,
        'tsimmons',
        'samanthasims@yahoo.com',
        '&_%1HCzOVc',
        454.06,
        'https://placeimg.com/534/341/any',
        '2023-10-26 04:13:43'
    );
-- USER INFO
INSERT INTO user_info (user_id, job, education, location, birthdate)
VALUES (
        1,
        'Mechanical engineer',
        'Bachelor',
        'North Lynntown',
        '2000-02-25'
    ),
    (
        2,
        'Production engineer',
        'Master',
        'North Tyler',
        '1981-10-27'
    ),
    (
        3,
        'Engineer, maintenance (IT)',
        'Bachelor',
        'Port Jasonberg',
        '1971-06-28'
    ),
    (
        4,
        'Engineer, civil (consulting)',
        'High School',
        'Grayside',
        '1974-09-01'
    ),
    (
        5,
        'Civil Service fast streamer',
        'Master',
        'Hernandezfurt',
        '1993-03-03'
    ),
    (
        6,
        'Scientist, research (life sciences)',
        'Bachelor',
        'Sheltonmouth',
        '1998-04-15'
    ),
    (
        7,
        'Research scientist (physical sciences)',
        'Master',
        'New Chelsea',
        '1979-04-04'
    ),
    (
        8,
        'Acupuncturist',
        'High School',
        'Janicemouth',
        '1986-04-09'
    ),
    (
        9,
        'Animal technologist',
        'High School',
        'Port Jonathan',
        '1974-12-24'
    ),
    (
        10,
        'Museum education officer',
        'Master',
        'Jenniferfort',
        '1968-11-19'
    );
-- CATEGORIES
INSERT INTO categories (category_id, name)
VALUES (1, 'Such'),
    (2, 'Become'),
    (3, 'Name'),
    (4, 'Trouble'),
    (5, 'Whole'),
    (6, 'Among'),
    (7, 'Attorney'),
    (8, 'Down'),
    (9, 'Case'),
    (10, 'Amount');
-- ITEMS
INSERT INTO items (
        item_id,
        name,
        description,
        picture,
        number_of_views,
        number_of_likes,
        price,
        duration_in_minutes,
        created_at,
        updated_at,
        owner_id,
        category_id
    )
VALUES (
        1,
        'Song.',
        'Technology song than leave he him. Maybe off question source serious wrong section. Face top individual win suddenly.',
        'https://www.lorempixel.com/795/478',
        181,
        222,
        70.08,
        173,
        '2024-04-11 17:31:27',
        '2024-04-14 17:31:27',
        8,
        9
    ),
    (
        2,
        'Sit.',
        'Medical effort assume teacher wall. Significant his himself clearly very.',
        'https://placekitten.com/489/587',
        226,
        266,
        59.49,
        150,
        '2025-10-17 14:09:33',
        '2025-11-01 14:09:33',
        4,
        9
    ),
    (
        3,
        'Medical.',
        'Man tell response purpose. Special good along letter. Another likely character allow pay picture black.',
        'https://placeimg.com/709/399/any',
        430,
        204,
        144.95,
        170,
        '2023-03-28 06:11:53',
        '2023-04-20 06:11:53',
        1,
        2
    ),
    (
        4,
        'Thing particular.',
        'Place full buy radio perform small camera treatment. True their race special million. Although hot he couple ground.',
        'https://www.lorempixel.com/154/91',
        423,
        170,
        56.34,
        93,
        '2025-01-31 16:26:33',
        '2025-02-15 16:26:33',
        1,
        10
    ),
    (
        5,
        'Too war.',
        'Then director simply those physical maybe model. Figure box international not type very indeed. Indeed choose west social.',
        'https://www.lorempixel.com/882/854',
        290,
        113,
        55.34,
        46,
        '2025-01-25 05:32:55',
        '2025-02-23 05:32:55',
        2,
        4
    ),
    (
        6,
        'Reveal bad audience.',
        'Generation concern store. Standard audience throw debate daughter. Security fall ready usually.',
        'https://dummyimage.com/476x290',
        41,
        163,
        176.27,
        135,
        '2025-02-10 11:30:48',
        '2025-02-12 11:30:48',
        9,
        8
    ),
    (
        7,
        'Live religious.',
        'Agreement decade friend which. View when player contain year.',
        'https://dummyimage.com/210x630',
        149,
        63,
        114.01,
        148,
        '2024-12-06 08:08:20',
        '2024-12-23 08:08:20',
        2,
        5
    ),
    (
        8,
        'Watch source.',
        'Drug senior fact information animal car after. Reduce car federal indicate. Opportunity fear great easy.',
        'https://placeimg.com/756/118/any',
        300,
        147,
        94.55,
        162,
        '2024-08-08 00:15:10',
        '2024-08-25 00:15:10',
        4,
        10
    ),
    (
        9,
        'Key.',
        'Daughter fall likely wear someone everybody. Painting child reflect up control instead company. Future model green place beat sense far.',
        'https://www.lorempixel.com/919/946',
        123,
        148,
        44.94,
        57,
        '2024-09-26 18:41:23',
        '2024-10-14 18:41:23',
        7,
        6
    ),
    (
        10,
        'Boy without.',
        'Participant interest seem begin marriage which myself. Evidence worker building this American either.',
        'https://www.lorempixel.com/811/910',
        133,
        243,
        23.13,
        43,
        '2023-12-06 19:00:05',
        '2023-12-27 19:00:05',
        1,
        10
    );
-- VIEWS
INSERT INTO views (item_id, user_id, view_date)
VALUES (3, 1, '2024-01-28 09:54:43'),
    (2, 9, '2024-07-03 15:26:29'),
    (7, 9, '2024-03-16 05:47:14'),
    (5, 9, '2025-11-10 18:23:02'),
    (4, 4, '2023-11-01 12:33:40'),
    (10, 7, '2025-07-13 22:29:26'),
    (10, 5, '2023-05-13 10:41:41'),
    (8, 8, '2023-02-25 01:42:28'),
    (6, 2, '2023-04-20 10:46:39'),
    (6, 10, '2024-02-12 18:13:00');
-- LIKES
INSERT INTO likes (item_id, user_id)
VALUES (2, 8),
    (10, 6),
    (4, 4),
    (1, 5),
    (2, 4),
    (6, 3),
    (6, 7),
    (1, 2),
    (3, 4),
    (1, 10);
-- BIDS
INSERT INTO bids (bid_id, item_id, user_id, bid_date, amount)
VALUES (1, 9, 10, '2024-04-19 17:44:25', 210.56),
    (2, 1, 2, '2025-04-08 23:29:27', 197.8),
    (3, 10, 10, '2024-06-12 00:01:58', 53.51),
    (4, 2, 6, '2023-07-03 14:14:58', 253.48),
    (5, 2, 1, '2025-04-03 14:44:44', 189.54),
    (6, 4, 3, '2024-01-22 21:08:48', 221.07),
    (7, 8, 4, '2023-09-12 01:45:48', 223.6),
    (8, 1, 1, '2023-04-16 18:41:23', 172.39),
    (9, 10, 2, '2024-10-06 09:59:53', 254.05),
    (10, 2, 4, '2024-03-26 00:29:55', 40.15);
-- COMMENTS
INSERT INTO comments (comment_id, sender_id, item_id, message, sent_at)
VALUES (
        1,
        5,
        6,
        'Mind off phone most improve.',
        '2025-09-12 19:22:46'
    ),
    (
        2,
        7,
        3,
        'Idea sing small factor head pick church.',
        '2025-12-18 19:14:02'
    ),
    (
        3,
        1,
        9,
        'High opportunity cause property.',
        '2024-07-04 00:14:01'
    ),
    (
        4,
        8,
        1,
        'Line indeed live reason five present art feel.',
        '2025-02-08 18:26:29'
    ),
    (
        5,
        10,
        2,
        'Thought democratic green.',
        '2024-08-30 08:16:14'
    ),
    (
        6,
        7,
        4,
        'Suffer without rather.',
        '2023-05-07 09:48:06'
    ),
    (
        7,
        5,
        6,
        'According American per yourself their record.',
        '2023-12-19 03:30:17'
    ),
    (
        8,
        8,
        10,
        'Seem explain black leave.',
        '2024-05-27 22:35:26'
    ),
    (
        9,
        3,
        4,
        'Collection instead today itself language remember.',
        '2025-03-25 06:10:15'
    ),
    (
        10,
        1,
        3,
        'Can travel know smile home southern.',
        '2024-08-28 02:58:12'
    );
-- DELIVER PERSONS
INSERT INTO deliver_persons (
        deliver_person_id,
        name,
        phone,
        vehicle_type,
        status
    )
VALUES (
        1,
        'Rebecca Gonzales',
        '906.031.2502',
        'Motorbike',
        1
    ),
    (
        2,
        'Edward Miller',
        '456.708.8697x74735',
        'Car',
        0
    ),
    (3, 'Andrew Martin', '4021639683', 'Scooter', 0),
    (4, 'Gerald Garcia', '558-754-0803', 'Bicycle', 1),
    (5, 'Daniel Warren', '344.486.4753', 'Scooter', 1),
    (6, 'Timothy Jones', '770.677.7111x312', 'Car', 1),
    (7, 'Thomas Alexander', '686-023-7324', 'Car', 0),
    (
        8,
        'Emma Graham',
        '+1-498-347-8978',
        'Bicycle',
        1
    ),
    (
        9,
        'Denise Smith',
        '+1-126-334-0886x016',
        'Bicycle',
        1
    ),
    (
        10,
        'Bailey Mclaughlin',
        '(384)331-8453x574',
        'Bicycle',
        1
    );
-- PURCHASES
INSERT INTO purchases (
        purchase_id,
        user_id,
        item_id,
        deliver_person_id,
        amount,
        purchase_date,
        status
    )
VALUES (1, 3, 4, 8, 208.5, '2025-06-23 04:47:04', 1),
    (2, 6, 10, 10, 109.55, '2023-09-24 05:35:53', 1),
    (3, 7, 7, 2, 50.69, '2023-08-02 06:27:56', 0),
    (4, 6, 3, 4, 150.39, '2023-01-25 01:50:08', 1),
    (5, 7, 10, 7, 64.2, '2025-05-09 05:54:41', 2),
    (6, 10, 7, 1, 124.55, '2025-02-23 06:09:40', 0),
    (7, 5, 3, 8, 287.41, '2024-05-24 08:25:40', 1),
    (8, 9, 10, 1, 447.74, '2024-07-24 02:16:35', 1),
    (9, 6, 5, 8, 72.44, '2025-06-28 10:26:51', 1),
    (10, 4, 9, 2, 426.85, '2025-09-13 03:38:17', 0);
-- REPORTS
INSERT INTO reports (purchase_id, description, report_date, status)
VALUES (
        1,
        'Theory choice computer yard.',
        '2023-07-30 14:49:03',
        0
    ),
    (
        2,
        'Notice receive degree run staff service government. Car material truth pattern ago other majority final.',
        '2023-12-08 20:56:17',
        1
    ),
    (
        3,
        'Produce manager well lose. Region bad case I course first. Himself arrive although risk which.',
        '2024-06-17 02:07:56',
        1
    ),
    (
        4,
        'Employee public figure ground much. Character against physical agency and difficult president at. General professional career two.',
        '2024-11-28 10:41:50',
        1
    ),
    (
        5,
        'Group computer forget would. Him important enough most save rather. Service north but west commercial may perform.',
        '2025-10-25 08:16:27',
        0
    ),
    (
        6,
        'Bag down stock computer. What to sea. Collection bad until our per leader change.',
        '2025-07-24 03:03:54',
        0
    ),
    (
        7,
        'Future scene heavy personal threat.',
        '2025-02-10 01:04:50',
        0
    ),
    (
        8,
        'Fall character door green save identify. Sound war address morning explain.',
        '2024-12-29 10:30:45',
        0
    ),
    (
        9,
        'Now energy rather lay return identify many.',
        '2023-02-02 03:08:48',
        0
    ),
    (
        10,
        'Effect quite reflect. Yet seven several might history.',
        '2024-01-25 08:18:15',
        0
    );
-- -- ______________ 5 ______________
-- 1. add a new column 'phone_number' to users table
ALTER TABLE users
ADD COLUMN phone_number VARCHAR(20);
-- 2. add a new column 'is_active' with default value to items table
ALTER TABLE items
ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
-- 3. update a user's username
UPDATE users
SET username = 'john_updated'
WHERE user_id = 10;
-- 4. delete a specific user (and cascade to related tables)
DELETE FROM users
WHERE user_id = 7;
-- 5. update an item’s price
UPDATE items
SET price = price + 10
WHERE item_id = 5;
-- 6. remove a column 
ALTER TABLE comments DROP COLUMN message;
-- 7. add a NOT NULL constraint to categories.name
ALTER TABLE categories
MODIFY COLUMN name VARCHAR(50) NOT NULL;
-- 8. add a UNIQUE constraint on deliver_persons.phone
ALTER TABLE deliver_persons
ADD CONSTRAINT unique_phone UNIQUE (phone);
-- 9. rename a column (change 'status' to 'delivery_status' in purchases)
ALTER TABLE purchases CHANGE COLUMN status delivery_status SMALLINT DEFAULT 0;
-- 10. delete all likes for item_id 1
DELETE FROM likes
WHERE item_id = 1;
-- ______________ 6 ______________
--	__________________ trigger _______________
create table if not exists logs (
    id int,
    date timestamp,
    PRIMARY KEY(id, date)
);
DROP TRIGGER IF EXISTS before_update_user;
delimiter // create trigger before_update_user before
update on users for each row begin
INSERT INTO logs (id, date)
values(OLD.user_id, NOW());
end // delimiter;
update users
set username = "mmd"
where user_id = 1;
select *
from logs;
-- 2. Trigger: When a new bid is placed, update the item's price to the highest bid
DELIMITER // CREATE TRIGGER update_item_price_after_bid
AFTER
INSERT ON bids FOR EACH ROW begin
UPDATE items
SET price = GREATEST(price, NEW.amount)
WHERE item_id = NEW.item_id;
end // DELIMITER;
insert into bids (bid_id, item_id, user_id, bid_date, amount)
VALUES (17, 2, 10, '2024-04-19 17:44:25', 215.56);
select *
from items
where item_id = 2;
-- 3. Trigger: Automatically set updated_at when an item is updated
DELIMITER // CREATE TRIGGER set_item_updated_at BEFORE
UPDATE ON items FOR EACH ROW begin
SET NEW.updated_at = CURRENT_TIMESTAMP;
end // DELIMITER;
update items
set name = "mmd item"
where item_id = 1;
select *
from items
where item_id = 1;
-- 4. Trigger: Prevent negative wallet balance
DELIMITER // CREATE TRIGGER prevent_negative_wallet BEFORE
UPDATE ON users FOR EACH ROW BEGIN IF NEW.wallet < 0 THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Wallet balance cannot be negative';
END IF;
END // DELIMITER;
update users
set wallet = -12.59
where user_id = 1;
-- 5. Trigger: Auto increment views counter when a new record is inserted in views
DELIMITER // CREATE TRIGGER increment_item_views
AFTER
INSERT ON views FOR EACH ROW begin
UPDATE items
SET number_of_views = number_of_views + 1
WHERE item_id = NEW.item_id;
end // DELIMITER;
INSERT INTO views (item_id, user_id, view_date)
VALUES (4, 1, '2024-01-28 09:54:43');
select number_of_views
from items
where item_id = 4;
-- _____________ view _______________
-- 1. View: Show items with owner and category details
CREATE VIEW v_items_detailed AS
SELECT i.item_id,
    i.name AS item_name,
    i.price,
    u.username AS owner,
    c.name AS category
FROM items i
    LEFT JOIN users u ON i.owner_id = u.user_id
    LEFT JOIN categories c ON i.category_id = c.category_id;
select *
from v_items_detailed;
-- 2. View: Show purchases with buyer and deliver person
CREATE VIEW v_purchases AS
SELECT p.purchase_id,
    u.username AS buyer,
    i.name AS item,
    d.name AS deliver_person,
    p.amount,
    p.delivery_status
FROM purchases p
    LEFT JOIN users u ON p.user_id = u.user_id
    LEFT JOIN items i ON p.item_id = i.item_id
    LEFT JOIN deliver_persons d ON p.deliver_person_id = d.deliver_person_id;
select *
from v_purchases;
-- 3. View: Show top 5 users with highest wallet balance
CREATE VIEW v_top_wallets AS
SELECT user_id,
    username,
    wallet
FROM users
ORDER BY wallet DESC
LIMIT 5;
select *
from v_top_wallets;
-- _____________ procedure ____________
-- 1.procedure
DELIMITER // CREATE PROCEDURE prefix_picture_with_star() BEGIN
DECLARE done INT DEFAULT 0;
DECLARE v_user_id INT;
DECLARE v_picture VARCHAR(255);
DECLARE user_cursor CURSOR FOR
SELECT user_id,
    picture
FROM users
WHERE picture IS NOT NULL;
DECLARE CONTINUE HANDLER FOR NOT FOUND
SET done = 1;
OPEN user_cursor;
read_loop: LOOP FETCH user_cursor INTO v_user_id,
v_picture;
IF done THEN LEAVE read_loop;
END IF;
UPDATE users
SET picture = CONCAT('*', v_picture)
WHERE user_id = v_user_id;
END LOOP;
CLOSE user_cursor;
END // DELIMITER;
CALL prefix_picture_with_star();
select picture
from users;
-- 2.procedure
delimiter // CREATE procedure calc1(p_user_id int) begin
update users
set wallet = 0
WHERE user_id = p_user_id;
END // delimiter;
call calc1(1);
select wallet
from users
where user_id = 1;
-- 3. Procedure: Add money to user's wallet
DELIMITER // CREATE PROCEDURE add_money(IN p_user_id INT, IN amount DECIMAL(8, 2)) BEGIN
UPDATE users
SET wallet = wallet + amount
WHERE user_id = p_user_id;
END // DELIMITER;
call add_money(1, 500.24);
select wallet
from users
where user_id = 1;
-- 4. Procedure: Place a bid
DELIMITER // CREATE PROCEDURE place_bid(
    IN p_item_id INT,
    IN p_user_id INT,
    IN bid_amount DECIMAL(8, 2)
) BEGIN
DECLARE v_next_id INT;
SELECT IFNULL(MAX(bid_id), 0) + 1 INTO v_next_id
FROM bids;
INSERT INTO bids (bid_id, item_id, user_id, amount)
VALUES (v_next_id, p_item_id, p_user_id, bid_amount);
END // DELIMITER;
call place_bid(2, 1, 12.02);
-- 5. Procedure: Delete a user by username
DELIMITER // CREATE PROCEDURE delete_user(IN p_username VARCHAR(50)) BEGIN
DELETE FROM users
WHERE username = p_username;
END // DELIMITER;
call delete_user("mmd");
select *
from users
where username = "mmd";
-- ____________ Function _____________ 
delimiter // CREATE FUNCTION calc(p_user_id int) RETURNS int deterministic reads sql data begin
declare total int;
SELECT SUM(amount) into total
FROM bids
WHERE user_id = p_user_id;
return IFNULL(total, 0);
END // delimiter;
select calc(2);
-- 2. Function: Get total number of items owned by a user
DELIMITER // CREATE FUNCTION get_user_item_count(p_user_id INT) RETURNS INT DETERMINISTIC BEGIN
DECLARE item_count INT;
SELECT COUNT(*) INTO item_count
FROM items
WHERE owner_id = p_user_id;
RETURN item_count;
END // DELIMITER;
select get_user_item_count(2);
-- 3. Function: Get highest bid amount for an item
DELIMITER // CREATE FUNCTION get_highest_bid(p_item_id INT) RETURNS DECIMAL(8, 2) DETERMINISTIC BEGIN
DECLARE highest DECIMAL(8, 2);
SELECT MAX(amount) INTO highest
FROM bids
WHERE item_id = p_item_id;
RETURN IFNULL(highest, 0);
END // DELIMITER;
select get_highest_bid(2);
-- 4. Function: Get user's full profile 
DELIMITER // CREATE FUNCTION get_user_profile(p_user_id INT) RETURNS VARCHAR(200) DETERMINISTIC BEGIN
DECLARE result VARCHAR(200);
SELECT CONCAT(username, ' (', email, ')') INTO result
FROM users
WHERE user_id = p_user_id;
RETURN result;
END // DELIMITER;
select get_user_profile(2);