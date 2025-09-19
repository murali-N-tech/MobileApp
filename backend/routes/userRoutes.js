// routes/userRoutes.js
import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// Route for registering a new user
router.route('/').post(registerUser);

// Route for user login
router.post('/login', authUser);

// Route to get user profile (protected)
router.route('/profile').get(protect, getUserProfile);

export default router;