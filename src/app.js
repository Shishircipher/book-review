import express from 'express';
import dotenv from 'dotenv';
//import cors from 'cors';
// import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js'

const app = express();
// Middleware
//app.use(cors());
app.use(express.json());
// app.use(morgan('dev'));

// Routes
app.use('/auth', authRoutes);        // /signup, /login
// CRUD + reviews (protected)
app.use('/books', bookRoutes);       
app.use('/reviews', reviewRoutes);
app.use('/search', searchRoutes);  

// Root
app.get('/', (req, res) => {
  res.send('Book Review API is running...');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
