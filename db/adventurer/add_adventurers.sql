-- Register:
INSERT INTO adventurers (username, password, phone_num, char_class, zipcode, dm, online, pfp)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;