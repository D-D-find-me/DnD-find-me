SELECT a.username, a.id, p.* FROM posts p
JOIN adventurers a ON a.id = p.adv_id
WHERE p.id = $1;