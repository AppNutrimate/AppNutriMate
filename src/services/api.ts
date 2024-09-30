import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Create an Axios instance
const api = axios.create({
  baseURL: "http://" + Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':3000'),
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
