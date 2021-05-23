-- This query simply sends back all the information in the
-- cart junction table where the cart_id matches the one we passed in. 
-- For this information to be usefulwe actually join the product 
-- table so we can get all of the
-- product information about each product in the junction table.
SELECT * FROM wlr1_product_cart_junction pc
JOIN wlr1_products p ON pc.product_id = p.product_id
WHERE pc.cart_id = $1
ORDER BY pc.product_id;