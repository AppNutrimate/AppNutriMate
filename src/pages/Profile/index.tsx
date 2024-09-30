/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
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
import DefaultTitle from '../../components/common/DefaultTitle'
import DefaultButton from 'src/components/common/DefaultButton'
import { TouchableOpacity, Text } from 'react-native'
import userService from 'src/services/userService'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>('')
  const [userLastName, setUserLastName] = useState<string>('')
  const [userPhoto, setUserPhoto] = useState<string | null>('')
  const [userEmail, setUserEmail] = useState<string | null>('')
  const [userBirth, setUserBirth] = useState<string | null>('')
  const [userPhone, setUserPhone] = useState<string | null>('')

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let id = userId
        if (!id) {
          id = await AsyncStorage.getItem('userId')
        }
        const formatDate = (dateString: string) => {
          return new Date(dateString).toLocaleDateString('pt-BR')
        }

        if (id) {
          const user = await userService.getUserById(id)
          setUserName(user.firstName)
          setUserLastName(user.lastName)
          setUserPhoto(user.profilePhoto)
          setUserEmail(user.email)
          setUserEmail(user.email)
          setUserBirth(new Date(user.birth).toLocaleDateString('pt-BR'))
          setUserPhone(user.phone)
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error)
      }
    }
    fetchUserDetails()
  }, [])
  return (
    <Container>
      <TouchableOpacity style={{ marginTop: 70 }}>
        <ProfileImage source={userPhoto ? { uri: userPhoto } : PerfilIcon} />
      </TouchableOpacity>
      <ProfileName>{userName + ' ' + userLastName}</ProfileName>
      <ContainerShaded>
        <ContainerInfo>
          <UserDetail>
            <UserDetailTitle>First Name:</UserDetailTitle>
            <UserDetailValue>{userName}</UserDetailValue>
          </UserDetail>
          <UserDetail>
            <UserDetailTitle>Last Name:</UserDetailTitle>
            <UserDetailValue>{userLastName}</UserDetailValue>
          </UserDetail>
          <UserDetail>
            <UserDetailTitle>E-Mail:</UserDetailTitle>
            <UserDetailValue>{userEmail}</UserDetailValue>
          </UserDetail>
          <UserDetail>
            <UserDetailTitle>Phone:</UserDetailTitle>
            <UserDetailValue>{userPhone}</UserDetailValue>
          </UserDetail>
          <UserDetail>
            <UserDetailTitle>Birth Day:</UserDetailTitle>
            <UserDetailValue>{userBirth}</UserDetailValue>
          </UserDetail>
        </ContainerInfo>
        <DefaultButton
          backgroundColor={'#6161A9'}
          text={'Edit Profile'}
          marginVertical={0}
          buttonHandle={() => {}}
        />
      </ContainerShaded>
      <NavBar />
    </Container>
  )
}

export default Profile
