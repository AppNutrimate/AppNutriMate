import React, { useEffect, useState } from 'react'
import {
  BarLimit,
  Container,
  ContainerAllMacros,
  ContentMacros,
  ContainerTimeAndCalories,
  ContentTimeAndCalories,
  CoverPhoto,
  DescriptionText,
  MacroIcon,
  MacroTitle,
  Title,
  MiniMacroIcon,
  StyledMacroTitle,
  StyledMacroUnit,
  AddButton,
  AddButtonText,
  ContainerButtons,
  ShareButton,
  ShareButtonIcon,
  AnimatedContainer
} from './styles'
import { type PropsNavigationStack } from 'src/routes'
import { type RouteProp, useRoute } from '@react-navigation/native'
import CaloriesIcon from '@icons/fire-p.png'
import ProteinIcon from '@icons/protein-p-icon.png'
import TimeIcon from '@icons/time-p.png'
import FatIcon from '@icons/fat-icon-p.png'
import ShareIcon from '@icons/share-icon-w.png'
import { Text, FlatList, StatusBar } from 'react-native'
import AddMealModal from 'src/components/StandardModal'
import { type Meal } from 'src/entitites/Meal'
import mealService from 'src/services/mealService'
import MealList from 'src/components/MealList'
import BackButton from 'src/components/common/BackButton'
import CarbsIcon from '@icons/carbs-icon-p.png'
import { SlideInDown, SlideOutDown } from 'react-native-reanimated'

const RecipePage = () => {
  const route = useRoute<RouteProp<PropsNavigationStack, 'RecipePage'>>()
  const { recipe } = route.params
  const [modalOpen, setModalOpen] = useState(false)
  const [meals, setMeals] = useState<Meal[]>([])

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
      fetchData()
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
      <BackButton />
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
      <CoverPhoto source={{ uri: recipe.picture }} />
      <AnimatedContainer
        entering={SlideInDown.springify().damping(16)}
        exiting={SlideOutDown.duration(500)}>
        <Title>{recipe.name}</Title>
        <ContainerTimeAndCalories>
          <ContentTimeAndCalories>
            <MacroIcon source={CaloriesIcon} />
            <MacroTitle>{recipe.calories}kcal</MacroTitle>
          </ContentTimeAndCalories>
          <ContentTimeAndCalories>
            <MacroIcon source={TimeIcon} />
            <MacroTitle>{recipe.prepTime}min</MacroTitle>
          </ContentTimeAndCalories>
        </ContainerTimeAndCalories>
        <BarLimit></BarLimit>
        <ContainerAllMacros>
          <ContentMacros>
            <MiniMacroIcon source={ProteinIcon} />
            <StyledMacroUnit>{recipe.proteins}g</StyledMacroUnit>
            <StyledMacroTitle>Proteins</StyledMacroTitle>          
          </ContentMacros>
          <ContentMacros>
            <MiniMacroIcon source={CarbsIcon} />
            <StyledMacroUnit>{recipe.carbos}g</StyledMacroUnit>
            <StyledMacroTitle>Carbs</StyledMacroTitle>          
          </ContentMacros>
          <ContentMacros>
            <MiniMacroIcon source={FatIcon} />
            <StyledMacroUnit>{recipe.fat}g</StyledMacroUnit>
            <StyledMacroTitle>Fat</StyledMacroTitle>          
          </ContentMacros>
        </ContainerAllMacros>
          <DescriptionText>{recipe.description}</DescriptionText>
        <ContainerButtons>
          <ShareButton>
            <ShareButtonIcon source={ShareIcon}/>
          </ShareButton>
          <AddButton onPress={handleModal}>
            <AddButtonText>Cooking Recipe</AddButtonText>
          </AddButton>
        </ContainerButtons>
      </AnimatedContainer>
    </Container>
  )
}

export default RecipePage
