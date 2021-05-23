-- This query deletes an item out of the junction table where
-- the cart_id and the product_id match the values we pass in.
-- Afterwards it sends back the updated product information for the
-- given cart.
DELETE FROM wlr1_product_cart_junction
WHERE cart_id = $1 AND product_id = $2;
SELECT * FROM wlr1_product_cart_junction pc
JOIN wlr1_products p ON pc.product_id = p.product_id
WHERE pc.cart_id = $1
ORDER BY pc.product_id;