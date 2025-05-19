import express from 'express';
import { createBook, getBooks, getBookById } from '../controllers/bookController.js';
import { submitReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAuth, createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/:id/reviews', requireAuth, submitReview);
router.put('/reviews/:id', requireAuth, updateReview);
router.delete('/reviews/:id', requireAuth, deleteReview);

export default router;
