import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { updateReview, deleteReview } from '../controllers/reviewController.js';
const router = express.Router();
router.put('/:id', requireAuth, updateReview);
router.delete('/:id', requireAuth, deleteReview);

export default router;