UPDATE posts
SET content = $2, title = $3
WHERE id = $1;
<<<<<<< HEAD
SELECT * FROM posts ORDER BY post_id;
=======
SELECT * FROM posts ORDER BY id;
>>>>>>> c52dfe0e1abb6e53295d1b7e14f30b3ededef048
