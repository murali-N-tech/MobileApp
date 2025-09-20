import apiClient from './axiosConfig';

export const login = (email, password) => {
  return apiClient.post('/users/login', { email, password });
};

export const register = (userData) => {
  return apiClient.post('/users/register', userData);
};

export const getUserProfile = () => {
  return apiClient.get('/users/profile');
};

export const getSports = () => {
  return apiClient.get('/sports');
};