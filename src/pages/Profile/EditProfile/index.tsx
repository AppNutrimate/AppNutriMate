import React, { useEffect, useState } from 'react'
import { Container, Input } from './styles'
import { type User } from 'src/entitites/User'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userService from 'src/services/userService'
import { useNavigation } from '@react-navigation/native'
import { type PropsStack } from 'src/routes'

const EditProfile = () => {
  const [user, setUser] = useState<User>()
  const [userId, setUserId] = useState<string | null>(null)
  const navigation = useNavigation<PropsStack>()
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const id = await AsyncStorage.getItem('userId')
        if (id != null) {
          setUserId(id)
          const user = await userService.getUserById(id)
          user.birth = new Date(user.birth).toLocaleDateString('pt-BR')
          setUser(user)
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error)
        navigation.navigate('Login')
      }
    }

    if (userId == null) {
      void fetchUserDetails()
    }
  }, [])
  return (
    <Container>
      <Input value={user?.firstName} />
      <Input value={user?.lastName} />
      <Input value={user?.email} />
      <Input value={user?.phone} />
      <Input value={user?.birth} />
    </Container>
  )
}

export default EditProfile
