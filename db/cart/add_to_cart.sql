-- Our query here takes a cart_id and a product_id and inserts
-- them into the junction table to establish a connection between
-- a product and a cart. It also defaults the quantity to 1.
-- Afterwards it sends back all of the items that have been
-- added to this cart.
INSERT INTO wlr1_product_cart_junction
(cart_id, product_id, quantity)
VALUES
($1, $2, 1);
SELECT * FROM wlr1_product_cart_junction pc
JOIN wlr1_products p ON pc.product_id = p.product_id
WHERE pc.cart_id = $1
ORDER BY pc.product_id;