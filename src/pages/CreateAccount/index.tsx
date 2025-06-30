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
import { useNavigation } from '@react-navigation/native'
import { type PropsNavigationStack } from 'src/routes'
import { type NativeStackNavigationProp } from '@react-navigation/native-stack'
import { type User } from 'src/entitites/User'
type CreateAccountScreenNavigationProp = NativeStackNavigationProp<
  PropsNavigationStack,
  'CreateAccount'
>
const CreateAccount = () => {
  const navigation = useNavigation<CreateAccountScreenNavigationProp>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setErrorMessage('All fields are required!')
      return
    }

    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format!')
      return
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must be at least 6 characters long and contain letter and number!'
      )
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!')
      return
    }

    try {
      const usersResponse = await userService.list()
      const users: User[] = usersResponse
      const emailExists = users.some((user: User) => user.email === email)

      if (emailExists) {
        setErrorMessage('Email already exists!')
        return
      }

      const res = await userService.register(
        email,
        email,
        '5585987654321',
        "1997-08-04",
        email,
        password,
        ""
      )
      console.log('Register Response:', res)

      const userId = res.user?.id
      if (userId) {
        navigation.navigate('SetNamePage', { userId })
      } else {
        setErrorMessage('Failed to retrieve user ID. Please try again.')
      }
    } catch (error) {
      console.error('Signup error:', error)
      setErrorMessage('Failed to create account. Please try again.')
    }
  }

  return (
    <>
      <Container>
        <DefaultTitle fontSize={28} title="Create Account" />
        <Subtitle>Enter your details to continue</Subtitle>
        {errorMessage !== '' ? (
          <Subtitle
            style={{
              marginRight: 15,
              paddingLeft: 15,
              paddingTop: 10,
              color: 'red'
            }}
          >
            {errorMessage}
          </Subtitle>
        ) : null}
        <TitleInput>E-mail Address:</TitleInput>
        <InputContainer>
          <Input
            placeholder="Insert your email address..."
            placeholderTextColor="#C0C0C1"
            value={email}
            onChangeText={setEmail}
          />
        </InputContainer>
        <TitleInput>Password:</TitleInput>
        <InputContainer>
          <Input
            placeholder="Insert your password..."
            placeholderTextColor="#C0C0C1"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </InputContainer>
        <TitleInput>Confirm Password:</TitleInput>
        <InputContainer>
          <Input
            placeholder="Insert your password again..."
            placeholderTextColor="#C0C0C1"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </InputContainer>
      </Container>
      <DefaultButton
        backgroundColor={'#4a2382'}
        text={'Sign Up'}
        marginVertical={0}
        buttonHandle={handleSignUp}
      />
    </>
  )
}

export default CreateAccount
