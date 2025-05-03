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
    order_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
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

