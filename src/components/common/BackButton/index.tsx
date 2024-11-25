import React from 'react'
import { Container, Icon } from './styles'
import ArrowBack from '@icons/arrow-back-w.png'
import { PropsStack } from 'src/routes'
import { useNavigation } from '@react-navigation/native'

const BackButton = () => {
  const navigation = useNavigation<PropsStack>()
  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <Container onPress={handleBack}>
      <Icon source={ArrowBack} />
    </Container>
  )
}

export default BackButton
