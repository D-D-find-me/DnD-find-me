UPDATE adventurers
SET username = $2, char_class = $3, zipcode = $4, phone_num = $5, dm=$6, online = $7, pfp = $8
WHERE id = $1