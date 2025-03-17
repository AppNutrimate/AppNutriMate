/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { API_URL } from '@env'

const baseURL = __DEV__ ? API_URL : 'localhost:3000'
const api = axios.create({
  baseURL,
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
