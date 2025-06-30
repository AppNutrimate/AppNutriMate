import React, { useCallback, useState } from 'react'
import {
  ArrowBackButton,
  BarLimit,
  Container,
  ContainerInfo,
  ContainerShaded,
  ContainerTitle,
  EditIcon,
  Header,
  HeaderContent,
  ProfileImage,
  ProfileName,
  ProfileTitle,
  SectionTitle,
  UserDetail,
  UserDetailTitle,
  UserDetailValue
} from './styles'
import PerfilIcon from '@icons/perfil.png'
import PencilIcon from '@icons/pencil-edit-w.png'
import ArrowBack from '@icons/arrow-back-w.png'
import DefaultButton from 'src/components/common/DefaultButton'
import { TouchableOpacity } from 'react-native'
import userService from 'src/services/userService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { type User } from 'src/entitites/User'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { type PropsStack } from 'src/routes'
import weightService from 'src/services/weightService'
import { Weight } from 'src/entitites/Weight'

const Profile = () => {
  const navigation = useNavigation<PropsStack>()
  const [userId, setUserId] = useState<string | null>(null)
  const [user, setUser] = useState<User>()
  const [weight, setWeight] = useState<Weight | null>(null)

  useFocusEffect(
    useCallback(() => {
      const fetchUserDetails = async () => {
        try {
          const id = await AsyncStorage.getItem('userId')
          if (id != null) {
            setUserId(id)
            const user = await userService.getUserById()
            user.birth = new Date(user.birth).toLocaleDateString('pt-BR')
            setUser(user)

            const weight = await weightService.getWeightByUserId(id)

            if (weight) {
              setWeight(weight[0])
            } else {
              console.log('Failed to fetch weight data')
              setWeight(null)
            }
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
  )

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('userId')
    navigation.navigate('Login')
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <TouchableOpacity onPress={
            () => {
              navigation.goBack()
            }
          }>
            <ArrowBackButton source={ArrowBack} />
          </TouchableOpacity>
          <ProfileTitle>Profile</ProfileTitle>
          <TouchableOpacity onPress={
            () => {
              navigation.navigate('EditProfile')
            }
          }>
            <EditIcon source={PencilIcon} />
          </TouchableOpacity>
        </HeaderContent>
      </Header>
      <TouchableOpacity style={{ marginTop: 70 }}>
        <ProfileImage
          source={user?.profilePhoto ? { uri: user.profilePhoto } : PerfilIcon}
        />
      </TouchableOpacity>
      <ProfileName>{user?.firstName + ' ' + user?.lastName}</ProfileName>
      <ContainerShaded>
        <ContainerInfo>
          <ContainerTitle>
            <SectionTitle>Main Information</SectionTitle>
          </ContainerTitle>
          <BarLimit>
          </BarLimit>
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
          <UserDetail>
            <UserDetailTitle>Height</UserDetailTitle>
            <UserDetailValue>{user?.height}cm</UserDetailValue>
          </UserDetail>
          <UserDetail>
            <UserDetailTitle>Weight:</UserDetailTitle>
            <UserDetailValue>{weight?.value.toString().slice(0, -2)}kg</UserDetailValue>
          </UserDetail>
        </ContainerInfo>
      </ContainerShaded>
      <DefaultButton
        backgroundColor={'#4a2382'}
        text={'Sign Out'}
        marginVertical={0}
        buttonHandle={handleSignOut}
      />
    </Container>
  )
}

export default Profile
