// import { pool } from '../config/db';
import { pool } from '../config/db.js'

export const createBook = async (req, res) => {
  const { title, author, genre } = req.body;
   // Check if book already exists (by title and author)
   const existing = await pool.query(
    'SELECT * FROM books WHERE LOWER(title) = LOWER($1) AND LOWER(author) = LOWER($2)',
    [title, author]
  );

  if (existing.rows.length > 0) {
    return res.status(409).json({ error: 'Book already exists' });
  }
  // if not exists then insert new book
  const result = await pool.query(
    'INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *',
    [title, author, genre]
  );
  res.status(201).json(result.rows[0]);
};

export const getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const offset = (page - 1) * limit;
  const filters = [];
  const values = [];

  if (author) {
    filters.push(`LOWER(author) LIKE $${values.length + 1}`);
    values.push(`%${author.toLowerCase()}%`);
  }

  if (genre) {
    filters.push(`genre = $${values.length + 1}`);
    values.push(genre);
  }

  let query = 'SELECT * FROM books';
  if (filters.length > 0) query += ' WHERE ' + filters.join(' AND ');
  query += ` ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;

  const result = await pool.query(query, values);
  res.json(result.rows);
};

export const getBookById = async (req, res) => {
  const bookRes = await pool.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
  const book = bookRes.rows[0];
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const reviewRes = await pool.query('SELECT * FROM reviews WHERE book_id = $1', [req.params.id]);
  const reviews = reviewRes.rows;

  const avgRating =
    reviews.length === 0
      ? null
      : reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  res.json({ book, avgRating, reviews });
};


export const searchBooks = async (req, res) => {
    const { q } = req.query;
    const result = await pool.query(
      'SELECT * FROM books WHERE LOWER(title) LIKE $1 OR LOWER(author) LIKE $2',
      [`%${q.toLowerCase()}%`, `%${q.toLowerCase()}%`]
    );
    res.json(result.rows);
  };
  