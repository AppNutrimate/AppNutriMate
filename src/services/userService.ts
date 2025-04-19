import { jwtDecode } from 'jwt-decode'
import api from './api'
import { type User } from 'src/entitites/User'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface RegisterResponse {
  message: string;
  user: User;
}

const userService = {
  register: async (
    firstName: string,
    lastName: string,
    phone: string,
    birth: string,
    email: string,
    password: string,
    height: number,
    profilePhoto: string
  ) => {
    try {
      const res = await api.post<RegisterResponse>('/users', {
        firstName,
        lastName,
        phone,
        birth,
        email,
        password,
        height,
        profilePhoto
      })
      return res.data
    } catch (error: any) {
      if (error?.response?.status === 409) {
        throw new Error('Email já cadastrado')
      } else {
        console.error('Error registering user:', error)
        throw error
      }
    }
  },

  update: async (updatedFields: Partial<User>) => {
    const token = await AsyncStorage.getItem('jwt')
    const userId = await AsyncStorage.getItem('userId')
    try {
      const res = await api.patch<User>(`/users/${userId}`, updatedFields, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  },
  getUserById: async (): Promise<User> => {
    try {
      const res = await api.get<User>(`/users/user`)
      return res.data
    } catch (error) {
      console.error('Error fetching user by ID:', error)
      throw error
    }
  },

  list: async (): Promise<User[]> => {
    try {
      const res = await api.get<User[]>('/users')
      return res.data
    } catch (error) {
      console.error('Error fetching users:', error)
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
    } catch (error) {
      console.error('Error logging in:', error)
      throw error
    }
  }
}

export default userService
