 
// controllers/challengeController.js
import asyncHandler from 'express-async-handler';
import Challenge from '../models/Challenge.js';

// @desc    Create a new challenge
// @route   POST /api/challenges
// @access  Private/Admin
const createChallenge = asyncHandler(async (req, res) => {
  const { title, description, sport, metric, startDate, endDate } = req.body;

  const challenge = new Challenge({
    title,
    description,
    sport,
    metric,
    startDate,
    endDate,
    createdBy: req.user._id,
  });

  const createdChallenge = await challenge.save();
  res.status(201).json(createdChallenge);
});

// @desc    Get all active challenges
// @route   GET /api/challenges
// @access  Private
const getActiveChallenges = asyncHandler(async (req, res) => {
  const challenges = await Challenge.find({ endDate: { $gte: new Date() } })
    .populate('sport', 'name')
    .populate('createdBy', 'name');
  res.json(challenges);
});

// @desc    Get details for a single challenge
// @route   GET /api/challenges/:id
// @access  Private
const getChallengeById = asyncHandler(async (req, res) => {
    const challenge = await Challenge.findById(req.params.id)
      .populate('sport', 'name')
      .populate('participants.user', 'name');
    
    if (challenge) {
        res.json(challenge);
    } else {
        res.status(404);
        throw new Error('Challenge not found');
    }
});


export { createChallenge, getActiveChallenges, getChallengeById };