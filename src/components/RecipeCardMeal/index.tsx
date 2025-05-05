import React, { useState, type ReactNode } from 'react'
import CaloriesIcon from '@icons/fire-p.png'
import ProteinIcon from '@icons/muscle-p.png'
import TimeIcon from '@icons/time-p.png'
import {
  type ImageSourcePropType,
  TouchableOpacity,
  View,
  Text,
  Alert
} from 'react-native'
import {
  Card,
  Container,
  ContainerMacro,
  MacroIcon,
  MacroNumber,
  MealPhoto,
  MenuItem,
  MenuText,
  ModalContent,
  ModalOverlay,
  TitleCard
} from './styles'
import mealService from 'src/services/mealService'
import { useNavigation } from '@react-navigation/native'
import { type PropsStack } from 'src/routes'

export interface RecipeCardProps {
  _id: string
  isLast: boolean
  height: number
  children: ReactNode
  title: string
  calories: string
  proteins: string
  prepTime: string
  image: ImageSourcePropType
  mealId: string
  onPress?: () => void
  onLongPressContainer?: () => void
}

const RecipeCardMeal = (props: Partial<RecipeCardProps>) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const navigation = useNavigation<PropsStack>()
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const handleDeleteRecipeFromMeal = async () => {
    if (!props.mealId || !props.mealId) {
      Alert.alert('Erro', 'Informações da refeição ou receita estão ausentes')
      return
    }
    try {
      await mealService.removeRecipeFromMeal(
        props.mealId ?? '',
        props._id ?? ''
      )
      Alert.alert('Sucesso', 'Receita removida com sucesso')
      setIsModalVisible(false)
      navigation.navigate('Diary')
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover a receita')
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.85}
    onPress={() => {
      if(isModalVisible)
      setIsModalVisible(false);
      else
      props.onPress?.()
    }}
      onLongPress={toggleModal}
      >
      <Container isLast={props.isLast}>
        <Card height={props.height}>
          <MealPhoto source={props.image} />
          <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <TitleCard numberOfLines={1} ellipsizeMode="tail">{props.title}</TitleCard>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <ContainerMacro>
                <MacroIcon source={ProteinIcon} />
                <MacroNumber>{props.proteins}g</MacroNumber>
              </ContainerMacro>
              <ContainerMacro>
                <MacroIcon source={CaloriesIcon} />
                <MacroNumber>{props.calories}</MacroNumber>
              </ContainerMacro>
              <ContainerMacro>
                <MacroIcon source={TimeIcon} />
                <MacroNumber>{props.prepTime}m</MacroNumber>
              </ContainerMacro>
            </View>
          </View>
          <View style={{ marginTop: 5, marginLeft: 45, position: 'relative' }}>
            {isModalVisible && (
                <>
                  <ModalOverlay onPress={()=> setIsModalVisible(false)} />
                  <ModalContent
                    style={{
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.55,
                      shadowRadius: 4.65,
                      elevation: 5,
                    }}
                  >
                    <MenuItem onPress={handleDeleteRecipeFromMeal}>
                      <MenuText>Excluir</MenuText>
                    </MenuItem>
                  </ModalContent>
              </>
            )}
          </View>
        </Card>
      </Container>
    </TouchableOpacity>
  )
}

export default RecipeCardMeal
