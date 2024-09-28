/* eslint-disable @typescript-eslint/semi */
import { API_URL } from '@env'
import axios from 'axios'
const api = axios.create({
  baseURL: API_URL,
  validateStatus: (status) => status >= 200 && status <= 500,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
