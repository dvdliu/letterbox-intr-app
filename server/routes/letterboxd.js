import express from 'express';
import { getFriendReviews, getReviewById, getMatch, getMatches } from '../controllers/letterboxd.js';

const router = express.Router();

router.get('/friend-reviews', getFriendReviews);
router.get('/match', getMatch);
router.get('/matches', getMatches);
router.get('/reviews/:id', getReviewById);

export default router;
