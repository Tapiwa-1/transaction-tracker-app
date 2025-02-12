// src/auth/authStorage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store the token
const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error storing token', error);
  }
};

// Function to retrieve the token
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token; // If the token exists, it will return it
  } catch (error) {
    console.error('Error getting token', error);
    return null; // If no token is found, return null
  }
};

// Function to remove the token
const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing token', error);
  }
};

// Export the functions so they can be used elsewhere
export default { storeToken, getToken, removeToken };