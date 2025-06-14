import React, { useEffect, useState } from 'react'
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
import BackButton from 'src/components/common/BackButton'
import DefaultAlert from 'src/components/common/DefaultAlert'
import { set } from 'date-fns'

const DiaryMealRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[] | []>([])
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(true)
  const [alertMessage, setAlertMessage] = useState('')
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
      setAlertMessage('Meal deleted successfully')
      setIsSuccess(true)
      setIsAlertVisible(true)
    } catch (error) {
      setIsSuccess(false)
      setIsAlertVisible(true)
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

    useEffect(() => {
    if (isAlertVisible && isSuccess) {
      navigation.navigate('Home');
      setTimeout(() => {
        navigation.navigate('Diary');
      }, 2000)      
    }
  }, [isAlertVisible, isSuccess]);


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
      onLongPressContainer={() => {
        console.log("receba");
      }}
      onPress={() => {
        handleNavigate(item)
      }}
    />
  )
  return (
    <Container>
      <BackButton/>
      <DefaultTitle fontSize={20} title={`${meal.name}`} />
      <SearchBar />
      <DefaultAlert
        isOpen={isAlertVisible}
        isSuccess={isSuccess}
        secondText={alertMessage}
        onClose={()=>setIsAlertVisible(false)} />
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
      
    </Container>
  )
}

export default DiaryMealRecipes
function setMeals(arg0: (prevMeals: any) => any) {
  throw new Error('Function not implemented.')
}

