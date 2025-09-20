import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken, removeToken, getToken } from '../../utils/storage';
import * as api from '../../api';

// Initial state of the authentication slice
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Create an async thunk for logging out
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
  await removeToken(); // Perform the async side effect here
  dispatch(logoutSuccess()); // Then dispatch the synchronous action to update the state
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // This is now a pure reducer with no side effects
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const {
  setLoading,
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutSuccess, // We keep this to be dispatched by the thunk
} = authSlice.actions;

export default authSlice.reducer;