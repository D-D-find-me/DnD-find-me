UPDATE locations
SET latitude = $2, longitude = $3
WHERE id = $1;