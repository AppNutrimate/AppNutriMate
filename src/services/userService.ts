/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { jwtDecode } from 'jwt-decode'
import api from './api'
import { type User } from 'src/entitites/User'
import AsyncStorage from '@react-native-async-storage/async-storage'

const userService = {
  register: async (
    firstName: string,
    lastName: string,
    phone: string,
    birth: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await api.post<User>('/users', {
        firstName,
        lastName,
        phone,
        birth,
        email,
        password
      })
      return res.data
    } catch (error: any) {
      console.error(
        'Error registering user:',
        error.response?.data || error.message
      )
      throw error
    }
  },

  update: async (userId: string, updatedFields: Partial<User>) => {
    try {
      const res = await api.patch<User>(`/users/${userId}`, updatedFields)
      return res.data
    } catch (error: any) {
      console.log(error.response)
      console.error(
        'Error updating user:',
        error.response?.data || error.message
      )
      throw error
    }
  },
  getUserById: async (userId: string): Promise<User> => {
    try {
      const res = await api.get<User>(`/users/${userId}`)
      return res.data
    } catch (error: any) {
      console.error(
        'Error fetching user by ID:',
        error.response?.data || error.message
      )
      throw error
    }
  },

  list: async (): Promise<User[]> => {
    try {
      const res = await api.get<User[]>('/users')
      return res.data
    } catch (error: any) {
      console.error(
        'Error fetching users:',
        error.response?.data || error.message
      )
      throw error
    }
  },

  login: async (email: string, password: string) => {
    try {
      const res = await api.post('auth/login', { email, password })

      const token = res.data.access_token
      const jwtDecoded = jwtDecode(token)
      await AsyncStorage.setItem('jwt', token)
      await AsyncStorage.setItem('userId', jwtDecoded.sub as string)

      return res.data
    } catch (error: any) {
      console.error('Error logging in:', error.response?.data || error.message)
      throw error
    }
  }
}

export default userService
