/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import {
  ButtonContainer,
  IconContainer,
  LogoIcon,
  TypeIcon,
  CallIcon,
  InputContainer,
  Input
} from './styles'
import DefaultButton from '../../components/common/DefaultButton'
import { useNavigation } from '@react-navigation/native'
import { type PropsStack } from '../../routes'
import NutrimateIcon from '@icons/nutrimate-icon.png'
import NutrimateIconName from '@icons/nutrimate-type.png'
import CallToActionIcon from '@icons/motto-text.png'
import { View } from 'react-native'
import userService from 'src/services/userService'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignIn = () => {
  const navigation = useNavigation<PropsStack>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Email and password are required.')
      return
    }

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format.')
      return
    }

    try {
      const res = await userService.login(email, password)
      if (res.success) {
        setErrorMessage('')
        const userId = res.user.id.toString()
        await AsyncStorage.setItem('userId', userId)
        navigation.navigate('Home')
      } else {
        console.log(errorMessage)
        setErrorMessage('Invalid email or password.')
      }
    } catch (error) {
      console.log(errorMessage)
      setErrorMessage('Failed to login. Please try again.')
    }
  }
  return (
    <View style={{ backgroundColor: '#43405f', flex: 1, alignItems: 'center' }}>
      <View style={{ position: 'absolute', height: '90%', zIndex: 100 }}>
        <IconContainer>
          <LogoIcon source={NutrimateIcon} />
        </IconContainer>
        <ButtonContainer>
          <TypeIcon source={NutrimateIconName} />
          <CallIcon source={CallToActionIcon} />
          <InputContainer>
            <Input
              placeholder="Email address"
              placeholderTextColor="#C0C0C1"
              value={email}
              onChangeText={setEmail}
            />
          </InputContainer>
          <InputContainer>
            <Input
              placeholder="Password"
              placeholderTextColor="#C0C0C1"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </InputContainer>
          <DefaultButton
            backgroundColor={'#7265E3'}
            text={'Login'}
            marginVertical={8}
            buttonHandle={handleLogin}
          />
        </ButtonContainer>
      </View>
    </View>
  )
}

export default SignIn
