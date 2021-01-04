
CREATE TABLE adventurers (
    id SERIAL PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    password VARCHAR(60) NOT NULL,
    char_class VARCHAR(40) NOT NULL,
    zipcode VARCHAR(5) NOT NULL,
    dm BOOLEAN NOT NULL,
    online BOOLEAN NOT NULL,
    pfp TEXT NOT NULL
    phone_num VARCHAR(20) NOT NULL,
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    content TEXT NOT NULL,
    zipcode INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    adv_id INT REFERENCES adventurers(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    commentor_id INT REFERENCES adventurers(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    post_id INT REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    latitude FLOAT(20),
    longitude FLOAT(20)
)

ALTER TABLE posts ALTER COLUMN title TYPE VARCHAR(400);