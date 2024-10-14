import React, { useEffect, useState } from 'react'
import {
  MainContainer,
  FlexContainer,
  InfoTitle,
  Input,
  NameContainer,
  NameInput,
  ContentContainer,
  SaveButton,
  TextButton
} from './styles'
import { type User } from 'src/entitites/User'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userService from 'src/services/userService'
import { useNavigation } from '@react-navigation/native'
import { type PropsStack } from 'src/routes'
import BackButton from 'src/components/common/BackButton'

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

  const handleInputChange = () => {}

  const handleSaveChanges = async () => {
    try {
      if (userId !== null && user !== undefined) {
        await userService.update(userId, user)
        console.log('User updated:', user.firstName)
      } else {
        console.error('User ID is null')
      }
      navigation.goBack()
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }
  return (
    <MainContainer>
      <BackButton />
      <ContentContainer>
        <NameContainer>
          <FlexContainer style={{ width: '48%' }}>
            <InfoTitle>First Name</InfoTitle>
            <NameInput value={user?.firstName} />
          </FlexContainer>
          <FlexContainer style={{ width: '48%' }}>
            <InfoTitle>Last Name</InfoTitle>
            <NameInput value={user?.lastName} />
          </FlexContainer>
        </NameContainer>
        <FlexContainer>
          <InfoTitle>E-mail</InfoTitle>
          <Input value={user?.email} />
        </FlexContainer>
        <FlexContainer>
          <InfoTitle>Phone Number</InfoTitle>
          <Input value={user?.phone} />
        </FlexContainer>
        <FlexContainer>
          <InfoTitle>Birth</InfoTitle>
          <Input value={user?.birth} />
        </FlexContainer>
        <SaveButton onPress={handleSaveChanges}>
          <TextButton>Save Changes</TextButton>
        </SaveButton>
      </ContentContainer>
    </MainContainer>
  )
}

export default EditProfile
