 
// routes/videoRoutes.js
import express from 'express';
const router = express.Router();
import {
  requestAnalysis,
  handleAnalysisWebhook,
  getVideoHistory
} from '../controllers/videoController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getVideoHistory);
router.route('/request-analysis').post(protect, requestAnalysis);
router.route('/analysis-webhook/:id').post(handleAnalysisWebhook);

export default router;