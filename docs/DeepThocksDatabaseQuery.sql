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