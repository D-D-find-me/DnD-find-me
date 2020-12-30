SELECT a.username, a.id, a.pfp, p.*, c.* FROM comments c
JOIN posts p ON p.id = c.post_id
JOIN adventurers a ON a.id = c.commentor_id
WHERE c.post_id = $1
ORDER BY c.created_at ASC;