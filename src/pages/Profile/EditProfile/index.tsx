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
import { Alert } from 'react-native'

const EditProfile = () => {
  const [user, setUser] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    profilePhoto: '',
    phone: '',
    birth: '',
    email: '',
    password: '',
    createdAt: '',
    updatedAt: ''
  })

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
  }, [userId])

  const handleSaveChanges = async () => {
    try {
      if (userId && user) {
        const updatedFields: Partial<User> = {
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email
        }

        console.log('Updating user:', updatedFields)
        await userService.update(updatedFields)
        console.log('User updated:', updatedFields)
        Alert.alert('User updated successfully!')
        navigation.navigate('Home')
      } else {
        console.error('User ID is null or user is undefined')
      }
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  const handleInputChange = (field: keyof User, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value
    }))
  }

  return (
    <MainContainer>
      <BackButton />
      <ContentContainer>
        <NameContainer>
          <FlexContainer style={{ width: '48%' }}>
            <InfoTitle>First Name</InfoTitle>
            <NameInput
              value={user.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
            />
          </FlexContainer>
          <FlexContainer style={{ width: '48%' }}>
            <InfoTitle>Last Name</InfoTitle>
            <NameInput
              value={user.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
            />
          </FlexContainer>
        </NameContainer>
        <FlexContainer>
          <InfoTitle>E-mail</InfoTitle>
          <Input
            value={user.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
        </FlexContainer>
        <FlexContainer>
          <InfoTitle>Phone Number</InfoTitle>
          <Input
            value={user.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
          />
        </FlexContainer>
        {/* <FlexContainer>
          <InfoTitle>Birth</InfoTitle>
          <Input
            value={user.birth}
            onChangeText={(text) => handleInputChange('birth', text)}
          />
        </FlexContainer> */}
        <SaveButton onPress={handleSaveChanges}>
          <TextButton>Save Changes</TextButton>
        </SaveButton>
      </ContentContainer>
    </MainContainer>
  )
}

export default EditProfile
