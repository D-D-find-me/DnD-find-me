-- Login:
SELECT * FROM adventurers
WHERE username = $1 OR phone_num = $2;