import axios from 'axios';
import { getToken } from '../utils/storage';

const apiClient = axios.create({
  baseURL: 'http://192.168.0.174:5001/api', // e.g., 'http://localhost:5000/api' or your production URL
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (email, password) => {
  return apiClient.post('/users/login', { email, password });
};

export const register = (userData) => {
  return apiClient.post('/users/register', userData);
};

export const getSports = () => {
  return apiClient.get('/sports');
};

// Add other API functions as you build out features
// For example:
// export const getChallenges = (sportId) => apiClient.get(`/challenges/sport/${sportId}`);
// export const uploadVideo = (data) => apiClient.post('/videos/upload', data);

export default apiClient;