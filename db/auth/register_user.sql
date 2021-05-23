INSERT INTO wlr1_users
(email, password)
VALUES($1, $2) RETURNING *;