/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
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
import { Pressable, View, Text, FlatList } from 'react-native'
import AddMealModal from 'src/components/StandardModal'
import { type Meal } from 'src/entitites/Meal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import mealService from 'src/services/mealService'
import MealList from 'src/components/MealList'

const RecipePage = () => {
  const route = useRoute<RouteProp<PropsNavigationStack, 'RecipePage'>>()
  const { recipe } = route.params
  const [modalOpen, setModalOpen] = useState(false)
  const [meals, setMeals] = useState<Meal[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [loadingMeals, setLoadingMeals] = useState(false)

  const fetchData = async () => {
    try {
      let id = userId
      if (!id) {
        id = await AsyncStorage.getItem('userId')
        setUserId(id)
      }
      if (id) {
        const response = await mealService.getMealByUserId(id)
        setMeals(response ?? [])
      } else {
        console.error('User ID not found')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (modalOpen) {
      setLoadingMeals(true)
      fetchData().finally(() => setLoadingMeals(false))
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
          <MacroTitle>{recipe.timePrepare}min</MacroTitle>
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
