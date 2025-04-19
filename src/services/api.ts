/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { API_URL } from '@env'

const api = axios.create({
  baseURL:
    'http://' +
    Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':3000'),
  // API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('jwt')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

export default api
