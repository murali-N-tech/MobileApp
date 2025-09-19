 
// routes/sportRoutes.js
import express from 'express';
const router = express.Router();
import { getSports, createSport } from '../controllers/sportController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// GET all sports (public)
// POST a new sport (admin only)
router.route('/').get(getSports).post(protect, admin, createSport);

export default router;