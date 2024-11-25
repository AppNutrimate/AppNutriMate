/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-no-comment-textnodes */
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
import { type PropsStack, type PropsNavigationStack } from 'src/routes'
import { TextInputMask } from 'react-native-masked-text'

type SetPhonePageRouteProp = RouteProp<PropsNavigationStack, 'SetPhonePage'>

const SetPhonePage = () => {
  const route = useRoute<SetPhonePageRouteProp>()
  const navigation = useNavigation<PropsStack>()
  const { userId } = route.params
  const [phone, setPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSetPhone = async () => {
    if (!phone) {
      setErrorMessage('This field is required!')
      return
    }
    const updatedField = {
      phone
    }
    try {
      const res = await userService.update(updatedField)
      console.log('Phone setted:', res)
      navigation.navigate('SetBirthDatePage', { userId })
    } catch (error) {
      setErrorMessage('Failed to set phone. Please try again.')
    }
  }
  return (
    <>
      <Container>
        <DefaultTitle fontSize={28} title="Present Yourself" />
        <Subtitle>Enter your phone to continue</Subtitle>
        {errorMessage !== '' ? (
          <Subtitle style={{ paddingTop: 10, color: 'red' }}>
            {errorMessage}
          </Subtitle>
        ) : null}
        <TitleInput>Phone:</TitleInput>
        <InputContainer>
          <TextInputMask
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            placeholder="+55 (__) _____-____"
            placeholderTextColor="#C0C0C1"
            value={phone}
            onChangeText={setPhone}
            style={{ flex: 1, fontSize: 16, color: '#000' }}
          />
        </InputContainer>
      </Container>
      <DefaultButton
        backgroundColor={'#6161A9'}
        text={'Next'}
        marginVertical={0}
        buttonHandle={handleSetPhone}
      />
    </>
  )
}

export default SetPhonePage
