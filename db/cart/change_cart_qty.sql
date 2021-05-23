-- Here we want to update a given product in a given cart
-- to have a new quantity. Afterwards we send back the updated
-- cart information.

UPDATE wlr1_product_cart_junction
SET quantity = $3
WHERE cart_id = $1 AND product_id = $2;
SELECT * FROM wlr1_product_cart_junction pc
JOIN wlr1_products p ON pc.product_id = p.product_id
WHERE pc.cart_id = $1
ORDER BY pc.product_id;