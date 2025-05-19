import express from 'express';
import dotenv from 'dotenv';
//import cors from 'cors';
// import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/searchRoutes.js';

const app = express();
// Middleware
//app.use(cors());
app.use(express.json());
// app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);        // /signup, /login
app.use('/api/books', bookRoutes);       // CRUD + reviews (protected)
app.use('/api/reviews', reviewRoutes);   // Update/Delete reviews

// Root
app.get('/', (req, res) => {
  res.send(' Book Review API is running...');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
