import React, { useEffect, useState } from 'react'
import NavBar from '../../components/common/NavBar'
import {
  Container,
  ContainerAllMacros,
  ContainerDescription,
  ContainerMacros,
  CoverPhoto,
  DescriptionText,
  MacroIcon,
  MacroTitle,
  Title,
  VideoButton,
  VideoButtonText
} from './styles'
import { type PropsNavigationStack } from 'src/routes'
import { type RouteProp, useRoute } from '@react-navigation/native'
import CaloriesIcon from '@icons/fire-p.png'
import ProteinIcon from '@icons/muscle-p.png'
import TimeIcon from '@icons/time-p.png'
import FatIcon from '@icons/fat-solid-p.png'
import { Text, FlatList } from 'react-native'
import AddMealModal from 'src/components/StandardModal'
import { type Meal } from 'src/entitites/Meal'
import mealService from 'src/services/mealService'
import MealList from 'src/components/MealList'

const RecipePage = () => {
  const route = useRoute<RouteProp<PropsNavigationStack, 'RecipePage'>>()
  const { recipe } = route.params
  const [modalOpen, setModalOpen] = useState(false)
  const [meals, setMeals] = useState<Meal[]>([])
  //const [loadingMeals, setLoadingMeals] = useState(false)

  const fetchData = async () => {
    try {
      const response = await mealService.getMealByUserId()
      setMeals(response ?? [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (modalOpen) {
      //setLoadingMeals(true)
      fetchData()
      //.finally(() => setLoadingMeals(false))
    }
  }, [modalOpen])

  const handleModal = () => {
    setModalOpen(!modalOpen)
  }

  const handleAddMealToRecipe = async (mealId: string) => {
    try {
      await mealService.addRecipeToMeal(mealId, recipe.id)
    } catch (error) {
      console.error('Error adding recipe to meal:', error)
    }
  }

  const renderItem = ({ item, index }: { item: Meal; index: number }) => (
    <MealList
      isLast={index === meals.length - 1}
      height={60}
      name={item.name}
      icon={{ uri: item.icon }}
      onPressAdd={() => {
        handleAddMealToRecipe(meals[index].id)
        setModalOpen(false)
      }}
    />
  )
  return (
    <Container>
      <CoverPhoto source={{ uri: recipe.picture }} />
      <Title>{recipe.name}</Title>
      <ContainerAllMacros>
        <ContainerMacros>
          <MacroIcon source={CaloriesIcon} />
          <MacroTitle>{recipe.calories} kcal</MacroTitle>
        </ContainerMacros>
        <ContainerMacros>
          <MacroIcon source={ProteinIcon} />
          <MacroTitle>{recipe.proteins}g</MacroTitle>
        </ContainerMacros>
        <ContainerMacros>
          <MacroIcon source={FatIcon} />
          <MacroTitle>{recipe.fat}g</MacroTitle>
        </ContainerMacros>
        <ContainerMacros>
          <MacroIcon source={TimeIcon} />
          <MacroTitle>{recipe.prepTime}min</MacroTitle>
        </ContainerMacros>
      </ContainerAllMacros>
      <ContainerDescription>
        <DescriptionText>{recipe.description}</DescriptionText>
        <VideoButton onPress={handleModal}>
          <VideoButtonText>Add To a Meal</VideoButtonText>
        </VideoButton>
        <AddMealModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false)
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#777777',
              textAlign: 'center',
              marginVertical: 20
            }}
          >
            Set this Recipe to a Meal
          </Text>
          <FlatList
            data={meals}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </AddMealModal>
      </ContainerDescription>
      <NavBar />
    </Container>
  )
}

export default RecipePage
