import express from 'express';
import { createBook, getBooks, getBookById } from '../controllers/bookController.js';
import { submitReview} from '../controllers/reviewController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAuth, createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/:id/reviews', requireAuth, submitReview);

export default router;
