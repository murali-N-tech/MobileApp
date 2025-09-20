import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'authToken';

// Saves the auth token to secure storage
export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.log('Error saving the auth token', error);
  }
};

// Gets the auth token from secure storage
export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.log('Error getting the auth token', error);
  }
};

// Removes the auth token from secure storage
export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.log('Error removing the auth token', error);
  }
};