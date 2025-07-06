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
	payment_method VARCHAR(100) NOT NULL CHECK (payment_method IN ('cod', 'napas', 'momo')) DEFAULT 'cod'
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

-- Bảng Revenue
CREATE TABLE revenue(
	revenue_id SERIAL PRIMARY KEY,
	revenue_month INT,
	revenue_year INT,
	income DECIMAL(12,2) DEFAULT 0,
	outcome DECIMAL(12,2) DEFAULT 0
);


CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,
    expense_month INT NOT NULL,
    expense_year INT NOT NULL,
    expense_amount DECIMAL(12,2) NOT NULL
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
VALUES ('layout 60 65', 'Các kits có layout 60%-65%', 1),
       ('layout 75', 'Các kits có layout 75%', 1),
	   ('layout tkl', 'Các kits có layout TKL', 1),
	   ('layout fullsize', 'Các kits có Fullsize', 1),
	   ('clacky switches', 'Các switches clacky', 2),
	   ('tackle switches', 'Các switches tackle', 2),
	   ('linear switches', 'Các switches linear', 2),
	   ('silent switches', 'Các switches silent', 2),
	   ('cherry profile keycaps', 'Các keycaps có Cherry profile', 3),
	   ('sa profile keycaps', 'Các keycaps có SA profile', 3),
	   ('oem profile keycaps', 'Các keycaps có OEM profile', 3),
	   ('xda profile keycaps', 'Các keycaps có XDA profile', 3),
	   ('other profile keycaps', 'Các keycaps có các profile khác', 3),
	   ('artisan keycaps', 'Các keycaps artisan', 3),
	   ('accessories', 'Các phụ kiện bàn phím', 4),
	   ('mods', 'Các dụng cụ, nguyên liệu dùng để mod phím', 4),
	   ('prebuilt keyboards', 'Các bàn phím đã được pre-built', 4)
	   
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

-- Thêm các Products Images

INSERT INTO product_images (product_id, url, alt_text, display_order)
VALUES 
(1,'/images/kits/kits-akko-designer-studio-1.png','kits-akko-designer-studio-1',1),
(1,'/images/kits/kits-akko-designer-studio-2.png','kits-akko-designer-studio-2',2),
(2,'/images/kits/kits-mk750-fl-esports-1.png','kits-mk750-fl-esports-1',1),
(2,'/images/kits/kits-mk750-fl-esports-2.png','kits-mk750-fl-esports-2',2),
(3,'/images/kits/kits-mk870-1.png','kits-mk870-1',1),
(3,'/images/kits/kits-mk870-2.png','kits-mk870-2',2),
(4,'/images/kits/kits-monsgeek-m1-1.png','kits-monsgeek-m1-1',1),
(4,'/images/kits/kits-monsgeek-m1-2.png','kits-monsgeek-m1-2',2),
(4,'/images/kits/kits-monsgeek-m1-3.png','kits-monsgeek-m1-3',3),
(5,'/images/kits/kits-monsgeek-m5-1.png','kits-monsgeek-m5-1',1),
(5,'/images/kits/kits-monsgeek-m5-2.png','kits-monsgeek-m5-2',2),
(5,'/images/kits/kits-monsgeek-m5-3.png','kits-monsgeek-m5-3',3),
(6,'/images/kits/kits-weikav-d75-1.png','kits-weikav-d75-1',1),
(6,'/images/kits/kits-weikav-d75-2.png','kits-weikav-d75-2',2),
(7,'/images/kits/kits-xinmeng-a66-1.png','kits-xinmeng-a66-1',1),
(7,'/images/kits/kits-xinmeng-a66-2.png','kits-xinmeng-a66-2',2),
(8,'/images/switches/switches-akko-cream-yellow-1.png','switches-akko-cream-yellow-1',1),
(8,'/images/switches/switches-akko-cream-yellow-2.png','switches-akko-cream-yellow-2',2),
(9,'/images/switches/switches-gateron-yellow-1.png','switches-gateron-yellow-1',1),
(10,'/images/switches/switches-hmx-sunset-clacky-1.png','switches-hmx-sunset-clacky-1',1),
(10,'/images/switches/switches-hmx-sunset-clacky-2.png','switches-hmx-sunset-clacky-2',2),
(11,'/images/switches/switches-ktt-kang-white-1.png','switches-ktt-kang-white-1',1),
(11,'/images/switches/switches-ktt-kang-white-2.png','switches-ktt-kang-white-2',2),
(11,'/images/switches/switches-ktt-kang-white-3.png','switches-ktt-kang-white-3',3),
(12,'/images/switches/switches-ktt-strawberry-1.png','switches-ktt-strawberry-1',1),
(13,'/images/switches/switches-mmd-cream-1.png','switches-mmd-cream-1',1),
(13,'/images/switches/switches-mmd-cream-2.png','switches-mmd-cream-2',2),
(13,'/images/switches/switches-mmd-cream-3.png','switches-mmd-cream-3',3),
(14,'/images/switches/switches-mmd-princess-1.png','switches-mmd-princess-1',1),
(14,'/images/switches/switches-mmd-princess-2.png','switches-mmd-princess-2',2),
(15,'/images/switches/switches-outemu-silent-crystal-lime-1.png','switches-outemu-silent-crystal-lime-1',1),
(15,'/images/switches/switches-outemu-silent-crystal-lime-2.png','switches-outemu-silent-crystal-lime-2',2),
(16,'/images/switches/switches-ph-milk-tea-1.png','switches-ph-milk-tea-1',1),
(16,'/images/switches/switches-ph-milk-tea-2.png','switches-ph-milk-tea-2',2),
(16,'/images/switches/switches-ph-milk-tea-3.png','switches-ph-milk-tea-3',3),
(17,'/images/keycaps/keycaps-artisan-kurama-1.png','keycaps-artisan-kurama-1',1),
(17,'/images/keycaps/keycaps-artisan-kurama-2.png','keycaps-artisan-kurama-2',2),
(18,'/images/keycaps/keycaps-artisan-thor-hammer-1.png','keycaps-artisan-thor-hammer-1',1),
(18,'/images/keycaps/keycaps-artisan-thor-hammer-2.png','keycaps-artisan-thor-hammer-2',2),
(19,'/images/keycaps/keycaps-artisan-totoro-1.png','keycaps-artisan-totoro-1',1),
(19,'/images/keycaps/keycaps-artisan-totoro-2.png','keycaps-artisan-totoro-2',2),
(20,'/images/keycaps/keycaps-carpenter-1.png','keycaps-carpenter-1',1),
(20,'/images/keycaps/keycaps-carpenter-2.png','keycaps-carpenter-2',2),
(20,'/images/keycaps/keycaps-carpenter-3.png','keycaps-carpenter-3',3),
(20,'/images/keycaps/keycaps-carpenter-4.png','keycaps-carpenter-4',4),
(21,'/images/keycaps/keycaps-cherry-black-gold-1.png','keycaps-cherry-black-gold-1',1),
(21,'/images/keycaps/keycaps-cherry-black-gold-2.png','keycaps-cherry-black-gold-2',2),
(21,'/images/keycaps/keycaps-cherry-black-gold-3.png','keycaps-cherry-black-gold-3',3),
(21,'/images/keycaps/keycaps-cherry-black-gold-4.png','keycaps-cherry-black-gold-4',4),
(22,'/images/keycaps/keycaps-cherry-classic-fc-1.png','keycaps-cherry-classic-fc-1',1),
(22,'/images/keycaps/keycaps-cherry-classic-fc-2.png','keycaps-cherry-classic-fc-2',2),
(22,'/images/keycaps/keycaps-cherry-classic-fc-3.png','keycaps-cherry-classic-fc-3',3),
(22,'/images/keycaps/keycaps-cherry-classic-fc-4.png','keycaps-cherry-classic-fc-4',4),
(23,'/images/keycaps/keycaps-cherry-darling-1.png','keycaps-cherry-darling-1',1),
(23,'/images/keycaps/keycaps-cherry-darling-2.png','keycaps-cherry-darling-2',2),
(23,'/images/keycaps/keycaps-cherry-darling-3.png','keycaps-cherry-darling-3',3),
(23,'/images/keycaps/keycaps-cherry-darling-4.png','keycaps-cherry-darling-4',4),
(24,'/images/keycaps/keycaps-cherry-vibrato-1.png','keycaps-cherry-vibrato-1',1),
(24,'/images/keycaps/keycaps-cherry-vibrato-2.png','keycaps-cherry-vibrato-2',2),
(24,'/images/keycaps/keycaps-cherry-vibrato-3.png','keycaps-cherry-vibrato-3',3),
(24,'/images/keycaps/keycaps-cherry-vibrato-4.png','keycaps-cherry-vibrato-4',4),
(25,'/images/keycaps/keycaps-cherry-yogurt-1.png','keycaps-cherry-yogurt-1',1),
(25,'/images/keycaps/keycaps-cherry-yogurt-2.png','keycaps-cherry-yogurt-2',2),
(25,'/images/keycaps/keycaps-cherry-yogurt-3.png','keycaps-cherry-yogurt-3',3),
(25,'/images/keycaps/keycaps-cherry-yogurt-4.png','keycaps-cherry-yogurt-4',4),
(26,'/images/keycaps/keycaps-chocolate-donut-1.png','keycaps-chocolate-donut-1',1),
(26,'/images/keycaps/keycaps-chocolate-donut-2.png','keycaps-chocolate-donut-2',2),
(26,'/images/keycaps/keycaps-chocolate-donut-3.png','keycaps-chocolate-donut-3',3),
(26,'/images/keycaps/keycaps-chocolate-donut-4.png','keycaps-chocolate-donut-4',4),
(27,'/images/keycaps/keycaps-mictlan-1.png','keycaps-mictlan-1',1),
(27,'/images/keycaps/keycaps-mictlan-2.png','keycaps-mictlan-2',2),
(27,'/images/keycaps/keycaps-mictlan-3.png','keycaps-mictlan-3',3),
(27,'/images/keycaps/keycaps-mictlan-4.png','keycaps-mictlan-4',4),
(28,'/images/keycaps/keycaps-mix-retro-light-1.png','keycaps-mix-retro-light-1',1),
(28,'/images/keycaps/keycaps-mix-retro-light-2.png','keycaps-mix-retro-light-2',2),
(28,'/images/keycaps/keycaps-mix-retro-light-3.png','keycaps-mix-retro-light-3',3),
(28,'/images/keycaps/keycaps-mix-retro-light-4.png','keycaps-mix-retro-light-4',4),
(29,'/images/keycaps/keycaps-sa-chalk-1.png','keycaps-sa-chalk-1',1),
(29,'/images/keycaps/keycaps-sa-chalk-2.png','keycaps-sa-chalk-2',2),
(29,'/images/keycaps/keycaps-sa-chalk-3.png','keycaps-sa-chalk-3',3),
(29,'/images/keycaps/keycaps-sa-chalk-4.png','keycaps-sa-chalk-4',4),
(30,'/images/keycaps/keycaps-sa-strong-spirit-1.png','keycaps-sa-strong-spirit-1',1),
(30,'/images/keycaps/keycaps-sa-strong-spirit-2.png','keycaps-sa-strong-spirit-2',2),
(30,'/images/keycaps/keycaps-sa-strong-spirit-3.png','keycaps-sa-strong-spirit-3',3),
(31,'/images/keycaps/keycaps-virtual-war-black-1.png','keycaps-virtual-war-black-1',1),
(31,'/images/keycaps/keycaps-virtual-war-black-2.png','keycaps-virtual-war-black-2',2),
(31,'/images/keycaps/keycaps-virtual-war-black-3.png','keycaps-virtual-war-black-3',3),
(31,'/images/keycaps/keycaps-virtual-war-black-4.png','keycaps-virtual-war-black-4',4),
(32,'/images/keycaps/keycaps-xda-emilia-1.png','keycaps-xda-emilia-1',1),
(32,'/images/keycaps/keycaps-xda-emilia-2.png','keycaps-xda-emilia-2',2),
(32,'/images/keycaps/keycaps-xda-emilia-3.png','keycaps-xda-emilia-3',3),
(32,'/images/keycaps/keycaps-xda-emilia-4.png','keycaps-xda-emilia-4',4),
(33,'/images/accessories/accessories-aqua-cable-1.png','accessories-aqua-cable-1',1),
(34,'/images/accessories/accessories-red-cable-1.png','accessories-red-cable-1',1),
(35,'/images/accessories/accessories-led-cable-1.png','accessories-led-cable-1',1),
(35,'/images/accessories/accessories-led-cable-2.png','accessories-led-cable-2',2),
(36,'/images/accessories/accessories-cleaning-brush-1.png','accessories-cleaning-brush-1',1),
(36,'/images/accessories/accessories-cleaning-brush-2.png','accessories-cleaning-brush-2',2),
(37,'/images/accessories/accessories-bridge-75-plate-1.png','accessories-bridge-75-plate-1',1),
(38,'/images/accessories/accessories-crush-80-plate-1.png','accessories-crush-80-plate-1',1),
(39,'/images/accessories/accessories-rainy75-plate-1.png','accessories-rainy75-plate-1',1),
(40,'/images/accessories/accessories-keyboard-bag-1.png','accessories-keyboard-bag-1',1),
(40,'/images/accessories/accessories-keyboard-bag-2.png','accessories-keyboard-bag-2',2),
(40,'/images/accessories/accessories-keyboard-bag-3.png','accessories-keyboard-bag-3',3),
(41,'/images/accessories/accessories-key-puller-1.png','accessories-key-puller-1',1),
(41,'/images/accessories/accessories-key-puller-2.png','accessories-key-puller-2',2),
(41,'/images/accessories/accessories-key-puller-3.png','accessories-key-puller-3',3),
(42,'/images/accessories/accessories-prebuilt-stab-1.png','accessories-prebuilt-stab-1',1),
(42,'/images/accessories/accessories-prebuilt-stab-2.png','accessories-prebuilt-stab-2',2),
(43,'/images/mods/mods-foam-1.png','mods-foam-1',1),
(43,'/images/mods/mods-foam-2.png','mods-foam-2',2),
(44,'/images/mods/mods-lube-kelowna-1.png','mods-lube-kelowna-1',1),
(44,'/images/mods/mods-lube-kelowna-2.png','mods-lube-kelowna-2',2),
(44,'/images/mods/mods-lube-kelowna-3.png','mods-lube-kelowna-3',3),
(45,'/images/mods/mods-lube-krytox-1.png','mods-lube-krytox-1',1),
(45,'/images/mods/mods-lube-krytox-2.png','mods-lube-krytox-2',2),
(46,'/images/mods/mods-tape-3m-1.png','mods-tape-3m-1',1),
(46,'/images/mods/mods-tape-3m-2.png','mods-tape-3m-2',2),
(46,'/images/mods/mods-tape-3m-3.png','mods-tape-3m-3',3),
(47,'/images/keyboards/keyboards-jamesdonkey-a3-1.png','keyboards-jamesdonkey-a3-1',1),
(47,'/images/keyboards/keyboards-jamesdonkey-a3-2.png','keyboards-jamesdonkey-a3-2',2),
(47,'/images/keyboards/keyboards-jamesdonkey-a3-3.png','keyboards-jamesdonkey-a3-3',3),
(47,'/images/keyboards/keyboards-jamesdonkey-a3-4.png','keyboards-jamesdonkey-a3-4',4),
(48,'/images/keyboards/keyboards-lofree-flow-1.png','keyboards-lofree-flow-1',1),
(48,'/images/keyboards/keyboards-lofree-flow-2.png','keyboards-lofree-flow-2',2),
(49,'/images/keyboards/keyboards-monka-k75-1.png','keyboards-monka-k75-1',1),
(49,'/images/keyboards/keyboards-monka-k75-2.png','keyboards-monka-k75-2',2),
(49,'/images/keyboards/keyboards-monka-k75-3.png','keyboards-monka-k75-3',3),
(49,'/images/keyboards/keyboards-monka-k75-4.png','keyboards-monka-k75-4',4),
(50,'/images/keyboards/keyboards-xinmeng-m75-1.png','keyboards-xinmeng-m75-1',1),
(50,'/images/keyboards/keyboards-xinmeng-m75-2.png','keyboards-xinmeng-m75-2',2),
(51,'/images/keyboards/keyboards-yunzii-al68-1.png','keyboards-yunzii-al68-1',1),
(51,'/images/keyboards/keyboards-yunzii-al68-2.png','keyboards-yunzii-al68-2',2),
(51,'/images/keyboards/keyboards-yunzii-al68-3.png','keyboards-yunzii-al68-3',3),
(51,'/images/keyboards/keyboards-yunzii-al68-4.png','keyboards-yunzii-al68-4',4)


-- Dữ liệu dummy cho bảng revenue từ tháng 1 đến tháng 6 năm 2025
INSERT INTO revenue (revenue_month, revenue_year, income, outcome) VALUES
(1, 2025, 32000000, 12800000),
(2, 2025, 15900000, 14800000),
(3, 2025, 18000000, 14000000),
(4, 2025, 28100000, 11900000),
(5, 2025, 25600000, 18600000),
(6, 2025, 15500000, 12700000);

-- Dữ liệu dummy cho bảng expenses từ tháng 1 đến tháng 6 năm 2025
INSERT INTO expenses (expense_month, expense_year, expense_amount) VALUES
(1, 2025, 12800000),
(2, 2025, 14800000),
(3, 2025, 14000000),
(4, 2025, 11900000),
(5, 2025, 18600000),
(6, 2025, 12700000);
