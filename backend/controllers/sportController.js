 
// controllers/sportController.js
import asyncHandler from 'express-async-handler';
import Sport from '../models/Sport.js';

// @desc    Fetch all sports
// @route   GET /api/sports
// @access  Public
const getSports = asyncHandler(async (req, res) => {
  const sports = await Sport.find({});
  res.json(sports);
});

// @desc    Create a sport
// @route   POST /api/sports
// @access  Private/Admin
const createSport = asyncHandler(async (req, res) => {
    const { name, description, mlIdentifier } = req.body;

    const sport = new Sport({
        name,
        description,
        mlIdentifier
    });

    const createdSport = await sport.save();
    res.status(201).json(createdSport);
});

export { getSports, createSport };