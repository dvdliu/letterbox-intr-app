import express from 'express';
import { getFriendReviews, getReviewById } from '../controllers/letterboxd.js';

const router = express.Router();

router.get('/friend-reviews', getFriendReviews);
router.get('/reviews/:id', getReviewById);

export default router;
