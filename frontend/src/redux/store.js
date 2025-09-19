import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// Import other reducers here as they are created

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // user: userReducer,
    // video: videoReducer,
    // leaderboard: leaderboardReducer,
  },
});