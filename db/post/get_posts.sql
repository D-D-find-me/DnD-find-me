SELECT p.*, a.username FROM posts p
JOIN adventurers a ON a.id = p.adv_id
ORDER BY p.id DESC;
