import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'user_auth_token';

export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    console.log('Token saved successfully');
  } catch (error) {
    console.error('Error saving the auth token', error);
  }
};

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting the auth token', error);
    return null;
  }
};

export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    console.log('Token deleted successfully');
  } catch (error) {
    console.error('Error deleting the auth token', error);
  }
};