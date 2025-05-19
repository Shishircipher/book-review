CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  -- username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  book_id INTEGER REFERENCES books(id),
  rating INTEGER,
  comment TEXT
);

ALTER TABLE reviews
ALTER COLUMN rating TYPE REAL;