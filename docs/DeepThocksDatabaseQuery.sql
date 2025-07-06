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
    category_description TEXT,
    parent_id INT, 
    CONSTRAINT fk_parent_category
        FOREIGN KEY (parent_id)
        REFERENCES categories(category_id)
        ON DELETE SET NULL
);

-- Bảng Products
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) UNIQUE NOT NULL,
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
    display_order INT,
    UNIQUE (product_id, url)
);

-- Bảng Carts
CREATE TABLE carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Cart_Items
CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES carts(cart_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    UNIQUE (cart_id, product_id)
);

-- Bảng Addresses
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
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    shipping_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'paid')) DEFAULT 'pending',
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
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL
);

-- Bảng Revenue
CREATE TABLE revenue (
    revenue_id SERIAL PRIMARY KEY,
    revenue_month INT,
    revenue_year INT,
    income DECIMAL(12,2) DEFAULT 0,
    outcome DECIMAL(12,2) DEFAULT 0,
    UNIQUE (revenue_month, revenue_year)
);

-- Bảng Expenses
CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,
    expense_month INT NOT NULL,
    expense_year INT NOT NULL,
    expense_amount DECIMAL(12,2) NOT NULL,
    UNIQUE (expense_month, expense_year)
);

--------------------- Thêm dữ liệu ------------------------

-- Thêm các Roles
INSERT INTO roles (role_name) VALUES
    ('ADMIN'),
    ('CUSTOMER')
ON CONFLICT (role_name) DO NOTHING;

-- Thêm các Users
INSERT INTO users (fullname, username, password_hash, email, phone, created_at) VALUES
    ('Nguyễn Hùng Cường', 'admin', '$2a$10$cvngT9bVOhnmzpwjpEzn6.SXbhf/MD1m5Y00aSOZggZtS8pP4BVHq', 'cuonghungnguyentop@gmail.com', '0987547235', CURRENT_TIMESTAMP),
    ('Test User', 'testuser', '$2a$10$cvngT9bVOhnmzpwjpEzn6.SXbhf/MD1m5Y00aSOZggZtS8pP4BVHq', 'testuser@deepthocks.com', '0987654321', CURRENT_TIMESTAMP)
ON CONFLICT (username) DO NOTHING;

-- Thêm User_role
INSERT INTO user_role (user_id, role_id) VALUES
    ((SELECT user_id FROM users WHERE username = 'admin'), (SELECT role_id FROM roles WHERE role_name = 'ADMIN')),
    ((SELECT user_id FROM users WHERE username = 'testuser'), (SELECT role_id FROM roles WHERE role_name = 'CUSTOMER'))
ON CONFLICT (user_id, role_id) DO NOTHING;

-- Thêm các Categories cha
INSERT INTO categories (category_name, category_description) VALUES 
    ('Kits', 'Các loại kits'),
    ('Switches', 'Các loại switches'),
    ('Keycaps', 'Các loại keycaps'),
    ('Others', 'Các sản phẩm khác')
ON CONFLICT (category_name) DO NOTHING;

-- Thêm các Categories con
INSERT INTO categories (category_name, category_description, parent_id) VALUES
    ('layout 60 65', 'Các kits có layout 60%-65%', (SELECT category_id FROM categories WHERE category_name = 'Kits')),
    ('layout 75', 'Các kits có layout 75%', (SELECT category_id FROM categories WHERE category_name = 'Kits')),
    ('layout tkl', 'Các kits có layout TKL', (SELECT category_id FROM categories WHERE category_name = 'Kits')),
    ('layout fullsize', 'Các kits có Fullsize', (SELECT category_id FROM categories WHERE category_name = 'Kits')),
    ('clacky switches', 'Các switches clacky', (SELECT category_id FROM categories WHERE category_name = 'Switches')),
    ('tackle switches', 'Các switches tackle', (SELECT category_id FROM categories WHERE category_name = 'Switches')),
    ('linear switches', 'Các switches linear', (SELECT category_id FROM categories WHERE category_name = 'Switches')),
    ('silent switches', 'Các switches silent', (SELECT category_id FROM categories WHERE category_name = 'Switches')),
    ('cherry profile keycaps', 'Các keycaps có Cherry profile', (SELECT category_id FROM categories WHERE category_name = 'Keycaps')),
    ('sa profile keycaps', 'Các keycaps có SA profile', (SELECT category_id FROM categories WHERE category_name = 'Keycaps')),
    ('oem profile keycaps', 'Các keycaps có OEM profile', (SELECT category_id FROM categories WHERE category_name = 'Keycaps')),
    ('xda profile keycaps', 'Các keycaps có XDA profile', (SELECT category_id FROM categories WHERE category_name = 'Keycaps')),
    ('other profile keycaps', 'Các keycaps có các profile khác', (SELECT category_id FROM categories WHERE category_name = 'Keycaps')),
    ('artisan keycaps', 'Các keycaps artisan', (SELECT category_id FROM categories WHERE category_name = 'Keycaps')),
    ('accessories', 'Các phụ kiện bàn phím', (SELECT category_id FROM categories WHERE category_name = 'Others')),
    ('mods', 'Các dụng cụ, nguyên liệu dùng để mod phím', (SELECT category_id FROM categories WHERE category_name = 'Others')),
    ('prebuilt keyboards', 'Các bàn phím đã được pre-built', (SELECT category_id FROM categories WHERE category_name = 'Others'))
ON CONFLICT (category_name) DO NOTHING;

-- Thêm các Products
INSERT INTO products (product_name, category_id, stock_quantity, base_price, sale_price) VALUES 
    ('Kit Akko Designer Studio', (SELECT category_id FROM categories WHERE category_name = 'layout 60 65'), 200, 4000000, 3800000),
    ('Kit Mk750 Fl Esport', (SELECT category_id FROM categories WHERE category_name = 'layout 75'), 120, 1750000, 1399000),
    ('Kit MK870', (SELECT category_id FROM categories WHERE category_name = 'layout tkl'), 370, 990000, 990000),
    ('Kit Monsgeek M1', (SELECT category_id FROM categories WHERE category_name = 'layout 75'), 480, 1350000, 1350000),
    ('Kit Monsgeek M5', (SELECT category_id FROM categories WHERE category_name = 'layout fullsize'), 520, 2200000, 2100000),
    ('Kit Weikav D75', (SELECT category_id FROM categories WHERE category_name = 'layout 75'), 100, 1100000, 990000),
    ('Kit Xinmeng A66', (SELECT category_id FROM categories WHERE category_name = 'layout 75'), 200, 1550000, 1550000),
    ('Switch Akko Cream Yellow', (SELECT category_id FROM categories WHERE category_name = 'tackle switches'), 3500, 7000, 6500),
    ('Switch Gateron Yellow', (SELECT category_id FROM categories WHERE category_name = 'linear switches'), 4200, 5000, 4500),
    ('Switch HMX Sunset', (SELECT category_id FROM categories WHERE category_name = 'clacky switches'), 2200, 6500, 6500),
    ('Switch KTT Kang White', (SELECT category_id FROM categories WHERE category_name = 'linear switches'), 4100, 4500, 3500),
    ('Switch KTT Strawberry', (SELECT category_id FROM categories WHERE category_name = 'linear switches'), 3800, 7500, 7500),
    ('Switch MMD Cream', (SELECT category_id FROM categories WHERE category_name = 'linear switches'), 2800, 3500, 3500),
    ('Switch MMD Princess', (SELECT category_id FROM categories WHERE category_name = 'tackle switches'), 2000, 5500, 4000),
    ('Switch Outemu Silent Crystal Lime', (SELECT category_id FROM categories WHERE category_name = 'silent switches'), 1800, 3500, 3000),
    ('Switch PH Milk Tea', (SELECT category_id FROM categories WHERE category_name = 'linear switches'), 2400, 8000, 7800),
    ('Keycap Artisan Kurama', (SELECT category_id FROM categories WHERE category_name = 'artisan keycaps'), 110, 500000, 450000),
    ('Keycap Artisan Thor Hammer', (SELECT category_id FROM categories WHERE category_name = 'artisan keycaps'), 120, 300000, 270000),
    ('Keycap Artisan Totoro', (SELECT category_id FROM categories WHERE category_name = 'artisan keycaps'), 100, 430000, 400000),
    ('Keycaps Carpenter', (SELECT category_id FROM categories WHERE category_name = 'cherry profile keycaps'), 200, 1000000, 900000),
    ('Keycaps Cherry Black Gold', (SELECT category_id FROM categories WHERE category_name = 'cherry profile keycaps'), 300, 500000, 400000),
    ('Keycaps Cherry Classic FC', (SELECT category_id FROM categories WHERE category_name = 'cherry profile keycaps'), 170, 830000, 830000),
    ('Keycaps Cherry Darling', (SELECT category_id FROM categories WHERE category_name = 'cherry profile keycaps'), 270, 800000, 750000),
    ('Keycaps Cherry Vibrato', (SELECT category_id FROM categories WHERE category_name = 'cherry profile keycaps'), 320, 850000, 690000),
    ('Keycaps Cherry Yogurt', (SELECT category_id FROM categories WHERE category_name = 'cherry profile keycaps'), 220, 1000000, 850000),
    ('Keycaps Chocolate Donut', (SELECT category_id FROM categories WHERE category_name = 'cherry profile keycaps'), 110, 699000, 550000),
    ('Keycaps Mictlan', (SELECT category_id FROM categories WHERE category_name = 'cherry profile keycaps'), 80, 450000, 450000),
    ('Keycaps Mix Retro Light', (SELECT category_id FROM categories WHERE category_name = 'cherry profile keycaps'), 240, 2660000, 2200000),
    ('Keycaps SA Chalk', (SELECT category_id FROM categories WHERE category_name = 'sa profile keycaps'), 140, 1600000, 1500000),
    ('Keycaps SA Strong Spirit', (SELECT category_id FROM categories WHERE category_name = 'sa profile keycaps'), 120, 1230000, 1100000),
    ('Keycaps Virtual Black War', (SELECT category_id FROM categories WHERE category_name = 'oem profile keycaps'), 110, 800000, 699000),
    ('Keycaps XDA Emilia', (SELECT category_id FROM categories WHERE category_name = 'xda profile keycaps'), 90, 500000, 400000),
    ('Aqua Cable', (SELECT category_id FROM categories WHERE category_name = 'accessories'), 200, 730000, 500000),
    ('Red Cable', (SELECT category_id FROM categories WHERE category_name = 'accessories'), 180, 230000, 200000),
    ('Led Cable', (SELECT category_id FROM categories WHERE category_name = 'accessories'), 280, 100000, 100000),
    ('Cleaning Brush', (SELECT category_id FROM categories WHERE category_name = 'accessories'), 100, 50000, 50000),
    ('Bridge 75 Plate', (SELECT category_id FROM categories WHERE category_name = 'accessories'), 40, 260000, 260000),
    ('Crush 80 Plate', (SELECT category_id FROM categories WHERE category_name = 'accessories'), 30, 350000, 290000),
    ('Rainy 75 Plate', (SELECT category_id FROM categories WHERE category_name = 'accessories'), 50, 300000, 260000),
    ('Keyboard Bag', (SELECT category_id FROM categories WHERE category_name = 'accessories'), 100, 200000, 180000),
    ('Keycap Puller', (SELECT category_id FROM categories WHERE category_name = 'accessories'), 300, 10000, 10000),
    ('Pre-built Stab', (SELECT category_id FROM categories WHERE category_name = 'accessories'), 300, 380000, 260000),
    ('Mods Foam', (SELECT category_id FROM categories WHERE category_name = 'mods'), 500, 50000, 50000),
    ('Lube Kelowna', (SELECT category_id FROM categories WHERE category_name = 'mods'), 300, 120000, 120000),
    ('Lube Krytox', (SELECT category_id FROM categories WHERE category_name = 'mods'), 400, 29000, 29000),
    ('3M Tape', (SELECT category_id FROM categories WHERE category_name = 'mods'), 320, 22000, 22000),
    ('Bàn phím Jamesdonkey A3', (SELECT category_id FROM categories WHERE category_name = 'prebuilt keyboards'), 320, 1200000, 990000),
    ('Bàn phím Lofree Flow', (SELECT category_id FROM categories WHERE category_name = 'prebuilt keyboards'), 210, 3200000, 2750000),
    ('Bàn phím Monka K75', (SELECT category_id FROM categories WHERE category_name = 'prebuilt keyboards'), 110, 1000000, 900000),
    ('Bàn phím Xinmeng M75', (SELECT category_id FROM categories WHERE category_name = 'prebuilt keyboards'), 180, 890000, 890000),
    ('Bàn phím Yunzii Al68', (SELECT category_id FROM categories WHERE category_name = 'prebuilt keyboards'), 120, 1700000, 1650000)
ON CONFLICT (product_name) DO NOTHING;

-- Thêm các Product Images
INSERT INTO product_images (product_id, url, alt_text, display_order) VALUES 
    ((SELECT product_id FROM products WHERE product_name = 'Kit Akko Designer Studio'), '/images/kits/kits-akko-designer-studio-1.png', 'kits-akko-designer-studio-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Kit Akko Designer Studio'), '/images/kits/kits-akko-designer-studio-2.png', 'kits-akko-designer-studio-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Kit Mk750 Fl Esport'), '/images/kits/kits-mk750-fl-esports-1.png', 'kits-mk750-fl-esports-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Kit Mk750 Fl Esport'), '/images/kits/kits-mk750-fl-esports-2.png', 'kits-mk750-fl-esports-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Kit MK870'), '/images/kits/kits-mk870-1.png', 'kits-mk870-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Kit MK870'), '/images/kits/kits-mk870-2.png', 'kits-mk870-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Kit Monsgeek M1'), '/images/kits/kits-monsgeek-m1-1.png', 'kits-monsgeek-m1-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Kit Monsgeek M1'), '/images/kits/kits-monsgeek-m1-2.png', 'kits-monsgeek-m1-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Kit Monsgeek M1'), '/images/kits/kits-monsgeek-m1-3.png', 'kits-monsgeek-m1-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Kit Monsgeek M5'), '/images/kits/kits-monsgeek-m5-1.png', 'kits-monsgeek-m5-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Kit Monsgeek M5'), '/images/kits/kits-monsgeek-m5-2.png', 'kits-monsgeek-m5-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Kit Monsgeek M5'), '/images/kits/kits-monsgeek-m5-3.png', 'kits-monsgeek-m5-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Kit Weikav D75'), '/images/kits/kits-weikav-d75-1.png', 'kits-weikav-d75-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Kit Weikav D75'), '/images/kits/kits-weikav-d75-2.png', 'kits-weikav-d75-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Kit Xinmeng A66'), '/images/kits/kits-xinmeng-a66-1.png', 'kits-xinmeng-a66-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Kit Xinmeng A66'), '/images/kits/kits-xinmeng-a66-2.png', 'kits-xinmeng-a66-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Switch Akko Cream Yellow'), '/images/switches/switches-akko-cream-yellow-1.png', 'switches-akko-cream-yellow-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Switch Akko Cream Yellow'), '/images/switches/switches-akko-cream-yellow-2.png', 'switches-akko-cream-yellow-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Switch Gateron Yellow'), '/images/switches/switches-gateron-yellow-1.png', 'switches-gateron-yellow-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Switch HMX Sunset'), '/images/switches/switches-hmx-sunset-clacky-1.png', 'switches-hmx-sunset-clacky-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Switch HMX Sunset'), '/images/switches/switches-hmx-sunset-clacky-2.png', 'switches-hmx-sunset-clacky-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Switch KTT Kang White'), '/images/switches/switches-ktt-kang-white-1.png', 'switches-ktt-kang-white-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Switch KTT Kang White'), '/images/switches/switches-ktt-kang-white-2.png', 'switches-ktt-kang-white-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Switch KTT Kang White'), '/images/switches/switches-ktt-kang-white-3.png', 'switches-ktt-kang-white-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Switch KTT Strawberry'), '/images/switches/switches-ktt-strawberry-1.png', 'switches-ktt-strawberry-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Switch MMD Cream'), '/images/switches/switches-mmd-cream-1.png', 'switches-mmd-cream-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Switch MMD Cream'), '/images/switches/switches-mmd-cream-2.png', 'switches-mmd-cream-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Switch MMD Cream'), '/images/switches/switches-mmd-cream-3.png', 'switches-mmd-cream-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Switch MMD Princess'), '/images/switches/switches-mmd-princess-1.png', 'switches-mmd-princess-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Switch MMD Princess'), '/images/switches/switches-mmd-princess-2.png', 'switches-mmd-princess-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Switch Outemu Silent Crystal Lime'), '/images/switches/switches-outemu-silent-crystal-lime-1.png', 'switches-outemu-silent-crystal-lime-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Switch Outemu Silent Crystal Lime'), '/images/switches/switches-outemu-silent-crystal-lime-2.png', 'switches-outemu-silent-crystal-lime-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Switch PH Milk Tea'), '/images/switches/switches-ph-milk-tea-1.png', 'switches-ph-milk-tea-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Switch PH Milk Tea'), '/images/switches/switches-ph-milk-tea-2.png', 'switches-ph-milk-tea-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Switch PH Milk Tea'), '/images/switches/switches-ph-milk-tea-3.png', 'switches-ph-milk-tea-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycap Artisan Kurama'), '/images/keycaps/keycaps-artisan-kurama-1.png', 'keycaps-artisan-kurama-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycap Artisan Kurama'), '/images/keycaps/keycaps-artisan-kurama-2.png', 'keycaps-artisan-kurama-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycap Artisan Thor Hammer'), '/images/keycaps/keycaps-artisan-thor-hammer-1.png', 'keycaps-artisan-thor-hammer-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycap Artisan Thor Hammer'), '/images/keycaps/keycaps-artisan-thor-hammer-2.png', 'keycaps-artisan-thor-hammer-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycap Artisan Totoro'), '/images/keycaps/keycaps-artisan-totoro-1.png', 'keycaps-artisan-totoro-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycap Artisan Totoro'), '/images/keycaps/keycaps-artisan-totoro-2.png', 'keycaps-artisan-totoro-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Carpenter'), '/images/keycaps/keycaps-carpenter-1.png', 'keycaps-carpenter-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Carpenter'), '/images/keycaps/keycaps-carpenter-2.png', 'keycaps-carpenter-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Carpenter'), '/images/keycaps/keycaps-carpenter-3.png', 'keycaps-carpenter-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Carpenter'), '/images/keycaps/keycaps-carpenter-4.png', 'keycaps-carpenter-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Black Gold'), '/images/keycaps/keycaps-cherry-black-gold-1.png', 'keycaps-cherry-black-gold-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Black Gold'), '/images/keycaps/keycaps-cherry-black-gold-2.png', 'keycaps-cherry-black-gold-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Black Gold'), '/images/keycaps/keycaps-cherry-black-gold-3.png', 'keycaps-cherry-black-gold-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Black Gold'), '/images/keycaps/keycaps-cherry-black-gold-4.png', 'keycaps-cherry-black-gold-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Classic FC'), '/images/keycaps/keycaps-cherry-classic-fc-1.png', 'keycaps-cherry-classic-fc-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Classic FC'), '/images/keycaps/keycaps-cherry-classic-fc-2.png', 'keycaps-cherry-classic-fc-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Classic FC'), '/images/keycaps/keycaps-cherry-classic-fc-3.png', 'keycaps-cherry-classic-fc-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Classic FC'), '/images/keycaps/keycaps-cherry-classic-fc-4.png', 'keycaps-cherry-classic-fc-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Darling'), '/images/keycaps/keycaps-cherry-darling-1.png', 'keycaps-cherry-darling-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Darling'), '/images/keycaps/keycaps-cherry-darling-2.png', 'keycaps-cherry-darling-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Darling'), '/images/keycaps/keycaps-cherry-darling-3.png', 'keycaps-cherry-darling-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Darling'), '/images/keycaps/keycaps-cherry-darling-4.png', 'keycaps-cherry-darling-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Vibrato'), '/images/keycaps/keycaps-cherry-vibrato-1.png', 'keycaps-cherry-vibrato-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Vibrato'), '/images/keycaps/keycaps-cherry-vibrato-2.png', 'keycaps-cherry-vibrato-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Vibrato'), '/images/keycaps/keycaps-cherry-vibrato-3.png', 'keycaps-cherry-vibrato-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Vibrato'), '/images/keycaps/keycaps-cherry-vibrato-4.png', 'keycaps-cherry-vibrato-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Yogurt'), '/images/keycaps/keycaps-cherry-yogurt-1.png', 'keycaps-cherry-yogurt-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Yogurt'), '/images/keycaps/keycaps-cherry-yogurt-2.png', 'keycaps-cherry-yogurt-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Yogurt'), '/images/keycaps/keycaps-cherry-yogurt-3.png', 'keycaps-cherry-yogurt-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Cherry Yogurt'), '/images/keycaps/keycaps-cherry-yogurt-4.png', 'keycaps-cherry-yogurt-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Chocolate Donut'), '/images/keycaps/keycaps-chocolate-donut-1.png', 'keycaps-chocolate-donut-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Chocolate Donut'), '/images/keycaps/keycaps-chocolate-donut-2.png', 'keycaps-chocolate-donut-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Chocolate Donut'), '/images/keycaps/keycaps-chocolate-donut-3.png', 'keycaps-chocolate-donut-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Chocolate Donut'), '/images/keycaps/keycaps-chocolate-donut-4.png', 'keycaps-chocolate-donut-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Mictlan'), '/images/keycaps/keycaps-mictlan-1.png', 'keycaps-mictlan-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Mictlan'), '/images/keycaps/keycaps-mictlan-2.png', 'keycaps-mictlan-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Mictlan'), '/images/keycaps/keycaps-mictlan-3.png', 'keycaps-mictlan-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Mictlan'), '/images/keycaps/keycaps-mictlan-4.png', 'keycaps-mictlan-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Mix Retro Light'), '/images/keycaps/keycaps-mix-retro-light-1.png', 'keycaps-mix-retro-light-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Mix Retro Light'), '/images/keycaps/keycaps-mix-retro-light-2.png', 'keycaps-mix-retro-light-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Mix Retro Light'), '/images/keycaps/keycaps-mix-retro-light-3.png', 'keycaps-mix-retro-light-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Mix Retro Light'), '/images/keycaps/keycaps-mix-retro-light-4.png', 'keycaps-mix-retro-light-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps SA Chalk'), '/images/keycaps/keycaps-sa-chalk-1.png', 'keycaps-sa-chalk-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps SA Chalk'), '/images/keycaps/keycaps-sa-chalk-2.png', 'keycaps-sa-chalk-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps SA Chalk'), '/images/keycaps/keycaps-sa-chalk-3.png', 'keycaps-sa-chalk-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps SA Chalk'), '/images/keycaps/keycaps-sa-chalk-4.png', 'keycaps-sa-chalk-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps SA Strong Spirit'), '/images/keycaps/keycaps-sa-strong-spirit-1.png', 'keycaps-sa-strong-spirit-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps SA Strong Spirit'), '/images/keycaps/keycaps-sa-strong-spirit-2.png', 'keycaps-sa-strong-spirit-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps SA Strong Spirit'), '/images/keycaps/keycaps-sa-strong-spirit-3.png', 'keycaps-sa-strong-spirit-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Virtual Black War'), '/images/keycaps/keycaps-virtual-war-black-1.png', 'keycaps-virtual-war-black-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Virtual Black War'), '/images/keycaps/keycaps-virtual-war-black-2.png', 'keycaps-virtual-war-black-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Virtual Black War'), '/images/keycaps/keycaps-virtual-war-black-3.png', 'keycaps-virtual-war-black-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps Virtual Black War'), '/images/keycaps/keycaps-virtual-war-black-4.png', 'keycaps-virtual-war-black-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps XDA Emilia'), '/images/keycaps/keycaps-xda-emilia-1.png', 'keycaps-xda-emilia-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps XDA Emilia'), '/images/keycaps/keycaps-xda-emilia-2.png', 'keycaps-xda-emilia-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps XDA Emilia'), '/images/keycaps/keycaps-xda-emilia-3.png', 'keycaps-xda-emilia-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycaps XDA Emilia'), '/images/keycaps/keycaps-xda-emilia-4.png', 'keycaps-xda-emilia-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Aqua Cable'), '/images/accessories/accessories-aqua-cable-1.png', 'accessories-aqua-cable-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Red Cable'), '/images/accessories/accessories-red-cable-1.png', 'accessories-red-cable-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Led Cable'), '/images/accessories/accessories-led-cable-1.png', 'accessories-led-cable-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Led Cable'), '/images/accessories/accessories-led-cable-2.png', 'accessories-led-cable-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Cleaning Brush'), '/images/accessories/accessories-cleaning-brush-1.png', 'accessories-cleaning-brush-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Cleaning Brush'), '/images/accessories/accessories-cleaning-brush-2.png', 'accessories-cleaning-brush-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Bridge 75 Plate'), '/images/accessories/accessories-bridge-75-plate-1.png', 'accessories-bridge-75-plate-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Crush 80 Plate'), '/images/accessories/accessories-crush-80-plate-1.png', 'accessories-crush-80-plate-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Rainy 75 Plate'), '/images/accessories/accessories-rainy75-plate-1.png', 'accessories-rainy75-plate-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keyboard Bag'), '/images/accessories/accessories-keyboard-bag-1.png', 'accessories-keyboard-bag-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keyboard Bag'), '/images/accessories/accessories-keyboard-bag-2.png', 'accessories-keyboard-bag-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keyboard Bag'), '/images/accessories/accessories-keyboard-bag-3.png', 'accessories-keyboard-bag-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Keycap Puller'), '/images/accessories/accessories-key-puller-1.png', 'accessories-key-puller-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Keycap Puller'), '/images/accessories/accessories-key-puller-2.png', 'accessories-key-puller-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Keycap Puller'), '/images/accessories/accessories-key-puller-3.png', 'accessories-key-puller-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Pre-built Stab'), '/images/accessories/accessories-prebuilt-stab-1.png', 'accessories-prebuilt-stab-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Pre-built Stab'), '/images/accessories/accessories-prebuilt-stab-2.png', 'accessories-prebuilt-stab-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Mods Foam'), '/images/mods/mods-foam-1.png', 'mods-foam-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Mods Foam'), '/images/mods/mods-foam-2.png', 'mods-foam-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Lube Kelowna'), '/images/mods/mods-lube-kelowna-1.png', 'mods-lube-kelowna-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Lube Kelowna'), '/images/mods/mods-lube-kelowna-2.png', 'mods-lube-kelowna-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Lube Kelowna'), '/images/mods/mods-lube-kelowna-3.png', 'mods-lube-kelowna-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Lube Krytox'), '/images/mods/mods-lube-krytox-1.png', 'mods-lube-krytox-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Lube Krytox'), '/images/mods/mods-lube-krytox-2.png', 'mods-lube-krytox-2', 2),
    ((SELECT product_id FROM products WHERE product_name = '3M Tape'), '/images/mods/mods-tape-3m-1.png', 'mods-tape-3m-1', 1),
    ((SELECT product_id FROM products WHERE product_name = '3M Tape'), '/images/mods/mods-tape-3m-2.png', 'mods-tape-3m-2', 2),
    ((SELECT product_id FROM products WHERE product_name = '3M Tape'), '/images/mods/mods-tape-3m-3.png', 'mods-tape-3m-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Jamesdonkey A3'), '/images/keyboards/keyboards-jamesdonkey-a3-1.png', 'keyboards-jamesdonkey-a3-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Jamesdonkey A3'), '/images/keyboards/keyboards-jamesdonkey-a3-2.png', 'keyboards-jamesdonkey-a3-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Jamesdonkey A3'), '/images/keyboards/keyboards-jamesdonkey-a3-3.png', 'keyboards-jamesdonkey-a3-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Jamesdonkey A3'), '/images/keyboards/keyboards-jamesdonkey-a3-4.png', 'keyboards-jamesdonkey-a3-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Lofree Flow'), '/images/keyboards/keyboards-lofree-flow-1.png', 'keyboards-lofree-flow-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Lofree Flow'), '/images/keyboards/keyboards-lofree-flow-2.png', 'keyboards-lofree-flow-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Monka K75'), '/images/keyboards/keyboards-monka-k75-1.png', 'keyboards-monka-k75-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Monka K75'), '/images/keyboards/keyboards-monka-k75-2.png', 'keyboards-monka-k75-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Monka K75'), '/images/keyboards/keyboards-monka-k75-3.png', 'keyboards-monka-k75-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Monka K75'), '/images/keyboards/keyboards-monka-k75-4.png', 'keyboards-monka-k75-4', 4),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Xinmeng M75'), '/images/keyboards/keyboards-xinmeng-m75-1.png', 'keyboards-xinmeng-m75-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Xinmeng M75'), '/images/keyboards/keyboards-xinmeng-m75-2.png', 'keyboards-xinmeng-m75-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Yunzii Al68'), '/images/keyboards/keyboards-yunzii-al68-1.png', 'keyboards-yunzii-al68-1', 1),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Yunzii Al68'), '/images/keyboards/keyboards-yunzii-al68-2.png', 'keyboards-yunzii-al68-2', 2),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Yunzii Al68'), '/images/keyboards/keyboards-yunzii-al68-3.png', 'keyboards-yunzii-al68-3', 3),
    ((SELECT product_id FROM products WHERE product_name = 'Bàn phím Yunzii Al68'), '/images/keyboards/keyboards-yunzii-al68-4.png', 'keyboards-yunzii-al68-4', 4)
ON CONFLICT (product_id, url) DO NOTHING;

-- Thêm Addresses
INSERT INTO addresses (city, district, ward, street) VALUES
    ('Hà Nội', 'Cầu Giấy', 'Dịch Vọng', 'Xuân Thủy')
ON CONFLICT DO NOTHING;

-- Thêm Carts
INSERT INTO carts (user_id, created_at) VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser'), CURRENT_TIMESTAMP)
ON CONFLICT (user_id) DO NOTHING;

-- Thêm Cart_Items
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
    ((SELECT cart_id FROM carts WHERE user_id = (SELECT user_id FROM users WHERE username = 'testuser')), 
     (SELECT product_id FROM products WHERE product_name = 'Kit Akko Designer Studio'), 1)
ON CONFLICT (cart_id, product_id) DO NOTHING;

-- Thêm Discounts
INSERT INTO discounts (code, discount_type, discount_value, min_order_amount, remain_uses, start_date, end_date) VALUES
    ('SALE10', 'percentage', 10.00, 1000000, 100, '2025-07-01 00:00:00', '2025-12-31 23:59:59')
ON CONFLICT (code) DO NOTHING;

-- Thêm Revenue
INSERT INTO revenue (revenue_month, revenue_year, income, outcome) VALUES
    (1, 2025, 32000000, 12800000),
    (2, 2025, 15900000, 14800000),
    (3, 2025, 18000000, 14000000),
    (4, 2025, 28100000, 11900000),
    (5, 2025, 25600000, 18600000),
    (6, 2025, 15500000, 12700000)
ON CONFLICT (revenue_month, revenue_year) DO NOTHING;

-- Thêm Expenses
INSERT INTO expenses (expense_month, expense_year, expense_amount) VALUES
    (1, 2025, 12800000),
    (2, 2025, 14800000),
    (3, 2025, 14000000),
    (4, 2025, 11900000),
    (5, 2025, 18600000),
    (6, 2025, 12700000)
ON CONFLICT (expense_month, expense_year) DO NOTHING;