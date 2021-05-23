-- Here we've set up 4 tables, 1 for users, 1 for products
-- 1 for a cart and 1 junction table establish the relationship between
-- a cart and a product so we can "put items into a cart". Setting up
-- our tables like this will allow us to mark a cart inactive when someone
-- checks out instead of deleting the table. This will allow us to preserve
-- order history if that is something we care about.
-- Look through these tables to see how we've structured things and then start
-- looking at our ../server/index.js to start following the dataflow.

DROP TABLE IF EXISTS wlr1_product_cart_junction;
DROP TABLE IF EXISTS wlr1_carts;
DROP TABLE IF EXISTS wlr1_products;
DROP TABLE IF EXISTS wlr1_users;

CREATE TABLE wlr1_users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(100),
  password VARCHAR(2000)
);

CREATE TABLE wlr1_products (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(100),
  product_description VARCHAR(1000),
  product_image VARCHAR(2000)
);

CREATE TABLE wlr1_carts (
  cart_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES wlr1_users(user_id),
  active BOOLEAN
);

CREATE TABLE wlr1_product_cart_junction (
  product_cart_id SERIAL PRIMARY KEY,
  cart_id INT REFERENCES wlr1_carts(cart_id),
  product_id INT REFERENCES wlr1_products(product_id),
  quantity INT
);

INSERT INTO wlr1_products
(product_name, product_description, product_image)
VALUES
('book', 'it is a book', 'book.png'),
('game', 'it is a game', 'game.png'),
('Star Wars', 'it is a star war', 'starwars.png');