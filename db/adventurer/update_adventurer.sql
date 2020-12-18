UPDATE adventurers
SET username = $2, online = $3, pfp = $4
WHERE id = $1
