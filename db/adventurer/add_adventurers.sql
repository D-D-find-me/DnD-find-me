-- Register:
INSERT INTO adventurers (username, password, phone_num, class, zipcode, dm, online, pfp)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
