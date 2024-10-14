import React, { useEffect, useState } from 'react'
import NavBar from '../../components/common/NavBar'
import {
  Container,
  ContainerInfo,
  ContainerShaded,
  ProfileImage,
  ProfileName,
  UserDetail,
  UserDetailTitle,
  UserDetailValue
} from './styles'
import PerfilIcon from '@icons/perfil.png'
import DefaultButton from 'src/components/common/DefaultButton'
import { TouchableOpacity } from 'react-native'
import userService from 'src/services/userService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { type User } from 'src/entitites/User'
import { useNavigation } from '@react-navigation/native'
import { type PropsStack } from 'src/routes'

const Profile = () => {
  const navigation = useNavigation<PropsStack>()
  const [userId, setUserId] = useState<string | null>(null)
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const id = await AsyncStorage.getItem('userId')
        if (id != null) {
          setUserId(id)
          const user = await userService.getUserById()
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
      <TouchableOpacity style={{ marginTop: 70 }}>
        <ProfileImage
          source={user != null ? { uri: user.profilePhoto } : PerfilIcon}
        />
      </TouchableOpacity>
      <ProfileName>{user?.firstName + ' ' + user?.lastName}</ProfileName>
      <ContainerShaded>
        <ContainerInfo>
          <UserDetail>
            <UserDetailTitle>First Name:</UserDetailTitle>
            <UserDetailValue>{user?.firstName}</UserDetailValue>
          </UserDetail>
          <UserDetail>
            <UserDetailTitle>Last Name:</UserDetailTitle>
            <UserDetailValue>{user?.lastName}</UserDetailValue>
          </UserDetail>
          <UserDetail>
            <UserDetailTitle>E-Mail:</UserDetailTitle>
            <UserDetailValue>{user?.email}</UserDetailValue>
          </UserDetail>
          <UserDetail>
            <UserDetailTitle>Phone:</UserDetailTitle>
            <UserDetailValue>{user?.phone}</UserDetailValue>
          </UserDetail>
          <UserDetail>
            <UserDetailTitle>Birth Day:</UserDetailTitle>
            <UserDetailValue>{user?.birth}</UserDetailValue>
          </UserDetail>
        </ContainerInfo>
        <DefaultButton
          backgroundColor={'#6161A9'}
          text={'Edit Profile'}
          marginVertical={0}
          buttonHandle={() => {
            navigation.navigate('EditProfile')
          }}
        />
      </ContainerShaded>
      <NavBar />
    </Container>
  )
}

export default Profile
