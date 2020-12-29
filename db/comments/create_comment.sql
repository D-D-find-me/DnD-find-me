INSERT INTO comments (body, commentor_id, post_id, created_at)
VALUES ($1, $2, $3, CURRENT_TIMESTAMP);