 
// routes/leaderboardRoutes.js
import express from 'express';
const router = express.Router();
import { getLeaderboardBySport } from '../controllers/leaderboardController.js';
import { protect } from '../middleware/authMiddleware.js';

// Get the leaderboard for a specific sport by its ID
router.route('/:sportId').get(protect, getLeaderboardBySport);

export default router;