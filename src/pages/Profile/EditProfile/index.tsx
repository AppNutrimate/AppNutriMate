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
  TextButton,
  EditHeaderContent,
  EditTitle
} from './styles'
import { type User } from 'src/entitites/User'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userService from 'src/services/userService'
import { useNavigation } from '@react-navigation/native'
import { type PropsStack } from 'src/routes'
import ArrowBack from '@icons/arrow-back-w.png'
import { Alert, Modal, TouchableOpacity } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { ArrowBackButton, Header } from '../styles'

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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const id = await AsyncStorage.getItem('userId')
        if (id != null) {
          setUserId(id)
          const user = await userService.getUserById()
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
          email: user.email,
          phone: user.phone,
          birth: user.birth
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

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')

    const formatted = cleaned.replace(
      /^(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})$/,
      '+$1 ($2) $3 $4-$5'
    )

    return formatted
  }

  const handleDateModal = () => {
    setOpenModal(!openModal)
    setDatePickerVisibility(!isDatePickerVisible)
  }

  const formatDateToDisplay = (isoDate: string) => {
    if (!isoDate) return ''
    const datePart = isoDate.split('T')[0]
    const [year, month, day] = datePart.split('-')
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
  }

  const handleConfirmDateModal = (date: Date) => {
    const isoDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString()
    setUser((prevUser) => ({
      ...prevUser,
      birth: isoDate
    }))
    setOpenModal(!openModal)
    setDatePickerVisibility(false)
  }

  return (
    <MainContainer>
      <Header>
        <EditHeaderContent>
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <ArrowBackButton source={ArrowBack}/>
          </TouchableOpacity>
          <EditTitle>Edit Profile</EditTitle>   
        </EditHeaderContent>
      </Header>
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
          <TextInputMask
            type="cel-phone"
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '+ 55 (99) '
            }}
            value={formatPhoneNumber(user.phone)}
            onChangeText={(text) =>
              handleInputChange('phone', formatPhoneNumber(text))
            }
            keyboardType="phone-pad"
            style={{
              borderWidth: 2,
              padding: 10,
              borderColor: '#D9D9D9',
              borderRadius: 30,
              backgroundColor: '#fff',
              fontSize: 16,
              paddingLeft: 15,
              height: 40,
              width: '100%'
            }}
          />
        </FlexContainer>
        <FlexContainer>
          <InfoTitle>Birth</InfoTitle>
          <Input
            value={formatDateToDisplay(user.birth)}
            onFocus={handleDateModal}
            onChangeText={(text) => handleInputChange('birth', text)}
          />
        </FlexContainer>
        <Modal visible={openModal} transparent={true}>
          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDateModal}
            onCancel={handleDateModal}
          />
        </Modal>

        <SaveButton onPress={handleSaveChanges}>
          <TextButton>Save Changes</TextButton>
        </SaveButton>
      </ContentContainer>
    </MainContainer>
  )
}

export default EditProfile
