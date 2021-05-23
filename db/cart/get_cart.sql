-- This gets the cart_id of the active cart for a given user
-- back from the database. We do this so we can save the user's
-- cart to their session.
SELECT cart_id FROM wlr1_carts
WHERE user_id = $1 AND active = TRUE;