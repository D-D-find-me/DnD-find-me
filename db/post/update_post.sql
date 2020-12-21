UPDATE posts
SET content = $2, title = $3, zipcode = $4
WHERE id = $1;

SELECT * FROM posts ORDER BY id;

