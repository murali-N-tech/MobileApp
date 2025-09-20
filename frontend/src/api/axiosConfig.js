import axios from 'axios';

// We will inject the store here later to avoid circular dependencies
let store;

export const injectStore = (_store) => {
  store = _store;
};

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5001/api', // Make sure this is your correct backend IP and port
});

// This part adds the user's token to every API request
apiClient.interceptors.request.use(
  (config) => {
    // Check if the store has been injected and has the necessary state
    if (store && store.getState().auth.token) {
      const token = store.getState().auth.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;