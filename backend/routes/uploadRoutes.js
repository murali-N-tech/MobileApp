// routes/uploadRoutes.js
import express from 'express';
const router = express.Router();
import { getImageKitAuth } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';

// This is the only endpoint needed for the client to get permission to upload a file.
router.route('/imagekit-auth').get(protect, getImageKitAuth);

// This is the crucial line that was likely missing or incorrect.
export default router;