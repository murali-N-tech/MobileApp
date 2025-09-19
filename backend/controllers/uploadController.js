// controllers/uploadController.js
import asyncHandler from 'express-async-handler';
import imagekit from '../config/imagekitConfig.js';

// @desc    Get authentication parameters for ImageKit client-side upload
// @route   GET /api/uploads/imagekit-auth
// @access  Private
const getImageKitAuth = asyncHandler(async (req, res) => {
  // ImageKit's SDK securely generates a token and signature for the client-side upload.
  // The token is valid for 1 hour (3600 seconds) by default.
  const authParams = imagekit.getAuthenticationParameters();
  
  res.status(200).json(authParams);
});

export { getImageKitAuth };