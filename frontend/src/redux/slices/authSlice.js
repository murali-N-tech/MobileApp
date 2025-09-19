import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action) => {
      state.userToken = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.userToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    authError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setLoading, loginSuccess, logoutSuccess, authError } = authSlice.actions;

export default authSlice.reducer;