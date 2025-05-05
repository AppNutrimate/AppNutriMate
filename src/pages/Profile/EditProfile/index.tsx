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
import { TouchableOpacity } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { ArrowBackButton, Header } from '../styles'
import DefaultAlert from 'src/components/common/DefaultAlert'

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
    height: 0,
    createdAt: '',
    updatedAt: ''
  })

  const [userId, setUserId] = useState<string | null>(null)
  const navigation = useNavigation<PropsStack>()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isAlertSuccess, setIsAlertSuccess] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

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
          firstName: user.firstName?.trim(),
          lastName: user.lastName?.trim(),
          email: user.email?.trim(),
          height: Number(user.height),
          phone: user.phone,
          birth: user.birth
        }
        const isAnyFieldEmpty = Object.values(updatedFields).some(
          (value) => !value || value.toString().trim() === ''
        );
  
        if (isAnyFieldEmpty) {
          setAlertMessage('Por favor, preencha todos os campos.')
          setIsAlertSuccess(false)
          setIsAlertOpen(true)
          return;
        }
        await userService.update(updatedFields)
        setIsAlertSuccess(true)
        setIsAlertOpen(true)
        setTimeout(() => {
          setIsAlertOpen(false)
          navigation.goBack()
          navigation.navigate('Home')
        }, 3000)
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
      <DefaultAlert
        isOpen={isAlertOpen}
        isSuccess={isAlertSuccess}
        secondText={alertMessage}
        onClose={() => {
          setAlertMessage('');
          setIsAlertOpen(false);
        }}
      />
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
          <InfoTitle>Height</InfoTitle>
          <Input
            value={String(user.height)}
            onChangeText={(text) => handleInputChange('height', text)}
            keyboardType="numeric"
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
          <TouchableOpacity onPress={()=>handleDateModal()}>
            <Input
              value={formatDateToDisplay(user.birth)}
              onChangeText={(text) => handleInputChange('birth', text)}
              pointerEvents='none'
              editable={false}
            />
          </TouchableOpacity>
        </FlexContainer>
          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDateModal}
            onCancel={handleDateModal}
          />
        <SaveButton onPress={handleSaveChanges}>
          <TextButton>Save Changes</TextButton>
        </SaveButton>
      </ContentContainer>
    </MainContainer>
  )
}

export default EditProfile
