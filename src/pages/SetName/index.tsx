import React, { useState } from 'react'
import {
  Container,
  Input,
  InputContainer,
  Subtitle,
  TitleInput
} from './styles'
import DefaultTitle from 'src/components/common/DefaultTitle'
import DefaultButton from 'src/components/common/DefaultButton'
import userService from 'src/services/userService'
import {
  type RouteProp,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { type PropsNavigationStack } from 'src/routes'
import { type NativeStackNavigationProp } from '@react-navigation/native-stack'

type SetNamePageRouteProp = RouteProp<PropsNavigationStack, 'SetNamePage'>
type NavigationProp = NativeStackNavigationProp<
  PropsNavigationStack,
  'SetNamePage'
>

const SetNamePage = () => {
  const route = useRoute<SetNamePageRouteProp>()
  const navigation = useNavigation<NavigationProp>()
  const { userId } = route.params
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSetName = async () => {
    if (!firstName || !lastName) {
      setErrorMessage('All fields are required!')
      return
    }
    const updatedFields = {
      firstName,
      lastName
    }
    try {
      console.log(userId)
      console.log(updatedFields)
      const res = await userService.update(updatedFields)
      console.log('Name setted:', { res })
      navigation.navigate('SetPhonePage', { userId })
    } catch (error) {
      setErrorMessage('Failed to create account. Please try again.')
    }
  }
  return (
    <>
      <Container>
        <DefaultTitle fontSize={28} title="Present Yourself" />
        <Subtitle>Enter your name to continue</Subtitle>
        {errorMessage !== '' ? (
          <Subtitle style={{ paddingTop: 10, color: 'red' }}>
            {errorMessage}
          </Subtitle>
        ) : null}
        <TitleInput>First Name:</TitleInput>
        <InputContainer>
          <Input
            placeholder="Insert your first name..."
            placeholderTextColor="#C0C0C1"
            value={firstName}
            onChangeText={setFirstName}
          />
        </InputContainer>
        <TitleInput>Last Name:</TitleInput>
        <InputContainer>
          <Input
            placeholder="Insert your last name..."
            placeholderTextColor="#C0C0C1"
            value={lastName}
            onChangeText={setLastName}
          />
        </InputContainer>
      </Container>
      <DefaultButton
        backgroundColor={'#4a2382'}
        text={'Next'}
        marginVertical={0}
        buttonHandle={handleSetName}
      />
    </>
  )
}

export default SetNamePage
