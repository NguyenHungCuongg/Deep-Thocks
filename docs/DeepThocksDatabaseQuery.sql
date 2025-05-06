--------------------- Tạo bảng ------------------------

-- Bảng Users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
	fullname VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15), 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Roles
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Bảng User_Role 
CREATE TABLE user_role (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Bảng Categories
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    category_description TEXT
	parent_id INT, 
    CONSTRAINT fk_parent_category
        FOREIGN KEY (parent_id)
        REFERENCES categories(category_id)
        ON DELETE SET NULL
);

-- Bảng Products
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    category_id INT REFERENCES categories(category_id) ON DELETE CASCADE,
    stock_quantity INT DEFAULT 0,
    base_price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2)
);

-- Bảng Product_Images
CREATE TABLE product_images (
    product_image_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    display_order INT
);

-- Bảng Carts
CREATE TABLE carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Cart_Items
CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES carts(cart_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    UNIQUE (cart_id, product_id)
);

-- Bảng Address
CREATE TABLE addresses (
	address_id SERIAL PRIMARY KEY,
	city VARCHAR(100) NOT NULL,
	district VARCHAR(100) NOT NULL,
	ward VARCHAR(100) NOT NULL,
	street VARCHAR(255) NOT NULL
);

-- Bảng Orders
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
	address_id INT REFERENCES addresses(address_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	shipping_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(12, 2) NOT NULL,
	status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'paid'))
);

-- Bảng Order_Items
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL
);

-- Bảng Discounts
CREATE TABLE discounts (
	discount_id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL, 
	discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount')),
    discount_value DECIMAL(10,2) NOT NULL, 
    min_order_amount DECIMAL(10,2) DEFAULT 0, 
    remain_uses INT, 
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL
);

--------------------- Thêm dữ liệu ------------------------
-- Thêm các Roles
INSERT INTO roles(role_name)
VALUES
('ADMIN'),
('CUSTOMER');

-- Thêm các Categories cha
INSERT INTO categories (category_name, category_description)
VALUES 
('Kits', 'Các loại kits'),
('Switches', 'Các loại switches'),
('Keycaps', 'Các loại keycaps'),
('Others','Các sản phẩm khác')

-- Thêm các Categories con
INSERT INTO categories (category_name, category_description, parent_id)
VALUES ('Layout 60%-65%', 'Các kits có layout 60%-65%', 1),
       ('Layout 75%', 'Các kits có layout 75%', 1),
	   ('Layout TKL', 'Các kits có layout TKL', 1),
	   ('Layout Fullsize', 'Các kits có Fullsize', 1),
	   ('Clacky Switch', 'Các switches clacky', 2),
	   ('Tackle Switch', 'Các switches tackle', 2),
	   ('Linear Switch', 'Các switches linear', 2),
	   ('Silent Switch', 'Các switches silent', 2),
	   ('Profile Cherry Keycap', 'Các keycaps có Cherry profile', 3),
	   ('Profile SA Keycap', 'Các keycaps có SA profile', 3),
	   ('Profile OEM Keycap', 'Các keycaps có OEM profile', 3),
	   ('Profile XDA Keycap', 'Các keycaps có XDA profile', 3),
	   ('Các Profile Khác', 'Các keycaps có các profile khác', 3),
	   ('Artisan Keycap', 'Các keycaps artisan', 3),
	   ('Phụ Kiện Bàn Phím', 'Các phụ kiện bàn phím', 4),
	   ('Mods', 'Các dụng cụ, nguyên liệu dùng để mod phím', 4),
	   ('Bàn Phím Prebuilt', 'Các bàn phím đã được pre-built', 4)
	   
-- Thêm các Products

INSERT INTO products (product_name,category_id,stock_quantity,base_price,sale_price)
VALUES 
	('Kit Akko Designer Studio', 5 , 200, 4000000,3800000),
	('Kit Mk750 Fl Esport', 6 , 120, 1750000,1399000),
	('Kit MK870', 7 , 370, 990000,990000),
	('Kit Monsgeek M1', 6 , 480, 1350000,1350000),
	('Kit Monsgeek M5', 8 , 520, 2200000,2100000),
	('Kit Weikav D75', 6 , 100, 1100000,990000),
	('Kit Xinmeng A66', 6 , 200, 1550000,1550000),
	('Switch Akko Cream Yellow', 10 , 3500, 7000,6500),
	('Switch Gateron Yellow', 11 , 4200, 5000,4500),
	('Switch HMX Sunset', 9 , 2200, 6500,6500),
	('Switch KTT Kang White', 11 , 4100, 4500,3500),
	('Switch KTT Strawberry', 11 , 3800, 7500,7500),
	('Switch MMD Cream', 11 , 2800, 3500,3500),
	('Switch MMD Princess', 10 , 2000, 5500,4000),
	('Switch Outemu Silent Crystal Lime', 12 , 1800, 3500,3000),
	('Switch PH Milk Tea', 11 , 2400, 8000,7800),
	('Keycap Artisan Kurama', 18 , 110, 500000,450000),
	('Keycap Artisan Thor Hammer', 18 , 120, 300000,270000),
	('Keycap Artisan Totoro', 18 , 100, 430000,400000),
	('Keycaps Carpenter', 13 , 200, 1000000,900000),
	('Keycaps Cherry Black Gold', 13 , 300, 500000,400000),
	('Keycaps Cherry Classic FC', 13 , 170, 830000,830000),
	('Keycaps Cherry Darling', 13 , 270, 800000,750000),
	('Keycaps Cherry Vibrato', 13 , 320, 850000,690000),
	('Keycaps Cherry Yogurt', 13 , 220, 1000000,850000),
	('Keycaps Chocolate Donut', 13 , 110, 699000,550000),
	('Keycaps Mictlan', 13 , 80, 450000,450000),
	('Keycaps Mix Retro Light', 13 , 240, 2660000,2200000),
	('Keycaps SA Chalk', 14 , 140, 1600000,1500000),
	('Keycaps SA Strong Spirit', 14 , 120, 1230000,1100000),
	('Keycaps Virtual Black War', 15 , 110, 800000,699000),
	('Keycaps XDA Emilia', 16 , 90, 500000,400000),
	('Aqua Cable', 19 , 200, 730000,500000),
	('Red Cable', 19 , 180, 230000,200000),
	('Led Cable', 19 , 280, 100000,100000),
	('Cleaning Brush', 19 , 100, 50000,50000),
	('Bridge 75 Plate', 19 , 40, 260000,260000),
	('Crush 80 Plate', 19 , 30, 350000,290000),
	('Rainy 75 Plate', 19 , 50, 300000,260000),
	('Keyboard Bag', 19 , 100, 200000,180000),
	('Keycap Puller', 19 , 300, 10000,10000),
	('Pre-built Stab', 19 , 300, 380000,260000),
	('Mods Foam', 20 , 500, 50000,50000),
	('Lube Kelowna', 20 , 300, 120000,120000),
	('Lube Krytox', 20 , 400, 29000,29000),
	('3M Tape', 20 , 320, 22000,22000),
	('Bàn phím Jamesdonkey A3', 21 , 320, 1200000,990000),
	('Bàn phím Lofree Flow', 21 , 210, 3200000,2750000),
	('Bàn phím Monka K75', 21 , 110, 1000000,900000),
	('Bàn phím Xinmeng M75', 21 , 180, 890000,890000),
	('Bàn phím Yunzii Al68', 21 , 120, 1700000, 1650000);