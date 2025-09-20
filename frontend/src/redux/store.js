import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { injectStore } from '../api/axiosConfig'; // Import the injector

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

injectStore(store); // Inject the store right after it's created

export default store;