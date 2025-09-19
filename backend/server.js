// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// ✅ THIS IS THE MOST IMPORTANT STEP: Load environment variables IMMEDIATELY
dotenv.config();

// Now, import other files that depend on those variables
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import sportRoutes from './routes/sportRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import challengeRoutes from './routes/challengeRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';

// Connect to the database
connectDB();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// API Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/sports', sportRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/leaderboards', leaderboardRoutes);

// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});