/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-useless-return */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/common/NavBar'
import { Container } from './styles'
import DefaultTitle from '../../components/common/DefaultTitle'
import SearchBar from 'src/components/common/SearchBar'
import { FlatList } from 'react-native'
import { Recipe } from 'src/entitites/Recipe'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { PropsNavigationStack, PropsStack } from 'src/routes'
import mealService from 'src/services/mealService'
import RecipeCardMeal from 'src/components/RecipeCardMeal'
import DefaultButton from 'src/components/common/DefaultButton'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DiaryMealRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[] | []>([])
  const route = useRoute<RouteProp<PropsNavigationStack, 'DiaryMealRecipes'>>()
  const { meal } = route.params

  const navigation = useNavigation<PropsStack>()

  const handleNavigate = (recipe: Recipe) => {
    navigation.navigate('RecipePage', { recipe })
  }
  const handleDeleteMeal = async () => {
    try {
      const userId = String(await AsyncStorage.getItem('userId'))
      const mealId = String(meal.id)

      if (!mealId) {
        console.error('Meal ID is required')
        return
      }

      if (!userId) {
        console.error('User ID is required')
        return
      }

      await mealService.removeMeal(userId, mealId)
      navigation.navigate('Home')
      console.log('Meal deleted successfully')
    } catch (error) {
      console.error('Error deleting meal:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mealService.getRecipesByMeal(meal.id)
        setRecipes(response ?? [])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    void fetchData()
  }, [])

  const renderItem = ({ item }: { item: Recipe }) => (
    <RecipeCardMeal
      _id={item.id}
      isLast={false}
      height={100}
      title={item.name}
      calories={item.calories}
      proteins={item.proteins}
      prepTime={item.prepTime}
      image={{ uri: item.picture }}
      mealId={meal.id}
      onPress={() => {
        handleNavigate(item)
      }}
    />
  )
  return (
    <Container>
      <DefaultTitle fontSize={20} title={`${meal.name}`} />
      <SearchBar />
      <FlatList
        data={recipes}
        keyExtractor={(item: Recipe) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
      <DefaultButton
        backgroundColor={'#bd1300'}
        text={'Delete this Meal'}
        marginVertical={100}
        buttonHandle={handleDeleteMeal}
      />
      <NavBar />
    </Container>
  )
}

export default DiaryMealRecipes
