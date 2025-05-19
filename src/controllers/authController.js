import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (userCheck.rows.length > 0) return res.status(400).json({ error: 'Email in use' });

  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
    [email, hash]
  );

  const token = generateToken(result.rows[0].id);
  res.json({ token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = generateToken(user.id);
  res.json({ token });
};
