 
// routes/challengeRoutes.js
import express from 'express';
const router = express.Router();
import {
  createChallenge,
  getActiveChallenges,
  getChallengeById
} from '../controllers/challengeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/')
  .post(protect, admin, createChallenge) // Only admins can create challenges
  .get(protect, getActiveChallenges);

router.route('/:id').get(protect, getChallengeById);

export default router;