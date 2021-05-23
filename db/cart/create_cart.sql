-- This inserts the user_id of a user into the carts
-- table to establish a connection between a user and a cart,
-- it will also set this new cart to "Active" by default. When
-- a user checks out their cart will be marked inactive and they
-- will be given a new one.
INSERT INTO wlr1_carts
(user_id, active)
VALUES
($1, TRUE) RETURNING cart_id;