 
// services/mlServiceClient.js
import axios from 'axios';

// Create an Axios instance configured for the ML service
const mlApi = axios.create({
  baseURL: process.env.ML_SERVICE_URL,
  timeout: 5000, // 5 second timeout for the initial request
});

/**
 * Sends a video analysis request to the ML service.
 * @param {string} videoUrl - The public URL of the video to be analyzed.
 * @param {string} sportIdentifier - The identifier for the sport (e.g., 'squat').
 * @param {string} webhookUrl - The URL for the ML service to post results back to.
 * @returns {Promise} - An Axios promise for the request.
 */
const requestAnalysisFromMLService = async (videoUrl, sportIdentifier, webhookUrl) => {
  try {
    const response = await mlApi.post('/analyze', {
      video_url: videoUrl,
      sport: sportIdentifier,
      webhook_url: webhookUrl,
    });
    return response.data;
  } catch (error) {
    console.error('Error communicating with ML Service:', error.message);
    // This allows the controller to catch the error and handle it
    throw new Error('Could not connect to the ML analysis service.');
  }
};

export { requestAnalysisFromMLService };