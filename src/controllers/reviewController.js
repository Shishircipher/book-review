import { pool } from '../config/db.js';

export const submitReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { id: bookId } = req.params;
  const userId = req.user.id;

  const existing = await pool.query(
    'SELECT * FROM reviews WHERE user_id = $1 AND book_id = $2',
    [userId, bookId]
  );
  if (existing.rows.length > 0)
    return res.status(400).json({ error: 'Already reviewed' });

  const result = await pool.query(
    'INSERT INTO reviews (user_id, book_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, bookId, rating, comment]
  );
  res.status(201).json(result.rows[0]);
};

export const updateReview = async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.user.id;

  const result = await pool.query(
    'UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
    [rating, comment, req.params.id, userId]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Review not found or not authorized' });
  }

  res.status(200).json(result.rows[0]);
//   res.json(result.rows[0]);
};

export const deleteReview = async (req, res) => {
  const result = await pool.query(
    'DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING *',
    [req.params.id, req.user.id]
  );
  res.json({ message: 'Deleted' });
};
