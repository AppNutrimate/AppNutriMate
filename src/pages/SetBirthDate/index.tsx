/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react'
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
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { TextInputMask } from 'react-native-masked-text'
import { Container, InputContainer, Subtitle, TitleInput } from './styles'

type SetBirthDatePageRouteProp = RouteProp<
  PropsNavigationStack,
  'SetBirthDatePage'
>
type NavigationProp = NativeStackNavigationProp<
  PropsNavigationStack,
  'SetBirthDatePage'
>

const SetBirthDatePage = () => {
  const route = useRoute<SetBirthDatePageRouteProp>()
  const navigation = useNavigation<NavigationProp>()
  const { userId } = route.params
  const [birth, setBirth] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSetBirthDate = async () => {
    if (!birth) {
      setErrorMessage('This field is required!')
      return
    }
    const updatedField = {
      birth: moment(birth, 'DD/MM/YYYY').toISOString()
    }
    try {
      const res = await userService.update(userId, updatedField)
      console.log('Birth date set:', { res })
      navigation.navigate('SignIn')
    } catch (error) {
      setErrorMessage('Failed to set birth date. Please try again.')
    }
  }

  const handleConfirm = (date: Date) => {
    setBirth(moment(date).format('DD/MM/YYYY'))
    setDatePickerVisibility(false)
  }

  return (
    <>
      <Container>
        <DefaultTitle fontSize={28} title="Enter Your Birth Date" />
        <Subtitle>Enter your birth date to continue</Subtitle>
        {errorMessage !== '' ? (
          <Subtitle
            style={{
              paddingTop: 10,
              color: 'red'
            }}
          >
            {errorMessage}
          </Subtitle>
        ) : null}
        <TitleInput>Birth Date:</TitleInput>
        <InputContainer>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#C0C0C1"
            value={birth}
            onChangeText={setBirth}
            onFocus={() => setDatePickerVisibility(true)}
            style={{ flex: 1, fontSize: 16, color: '#000' }}
          />
        </InputContainer>
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </Container>
      <DefaultButton
        backgroundColor={'#6161A9'}
        text={'Next'}
        marginVertical={0}
        buttonHandle={handleSetBirthDate}
      />
    </>
  )
}

export default SetBirthDatePage
