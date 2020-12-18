UPDATE posts
SET content = $2, title = $3
WHERE post_id = $1;
SELECT * FROM posts ORDER BY post_id;