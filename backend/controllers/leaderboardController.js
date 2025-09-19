 
// controllers/leaderboardController.js
import asyncHandler from 'express-async-handler';
import Video from '../models/Video.js';
import mongoose from 'mongoose';

// @desc    Get leaderboard for a specific sport
// @route   GET /api/leaderboards/:sportId
// @access  Private
const getLeaderboardBySport = asyncHandler(async (req, res) => {
  const { sportId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(sportId)) {
    res.status(400);
    throw new Error('Invalid Sport ID');
  }

  // Use MongoDB Aggregation Pipeline to generate the leaderboard
  const leaderboard = await Video.aggregate([
    // Step 1: Match videos that are complete and belong to the specific sport
    {
      $match: {
        sport: new mongoose.Types.ObjectId(sportId),
        analysisStatus: 'Complete',
        'results.score': { $exists: true, $ne: null } // Ensure score exists
      }
    },
    // Step 2: Sort by score descending to find the best score for each user
    {
      $sort: { 'results.score': -1 }
    },
    // Step 3: Group by user to get only their single best score
    {
      $group: {
        _id: '$user',
        highScore: { $first: '$results.score' },
        videoUrl: { $first: '$videoUrl' },
        dateAchieved: { $first: '$createdAt' }
      }
    },
    // Step 4: Sort the grouped results again to create the final ranking
    {
      $sort: { highScore: -1 }
    },
    // Step 5: Limit to the top 100 players
    {
      $limit: 100
    },
    // Step 6: Join with the User collection to get user details
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'userDetails'
      }
    },
    // Step 7: Reshape the output data
    {
      $project: {
        _id: 0,
        userId: '$_id',
        userName: { $arrayElemAt: ['$userDetails.name', 0] },
        highScore: '$highScore',
        dateAchieved: '$dateAchieved'
      }
    }
  ]);

  res.json(leaderboard);
});

export { getLeaderboardBySport };