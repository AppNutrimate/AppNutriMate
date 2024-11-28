import React, { useEffect, useState } from "react";
import {
  ActionButton,
  ActionButtonText,
  ButtonContainer,
  CenterSubTitle,
  CenterTitle,
  Container,
  FormContainer,
  IndicatorContainer,
  ModalInput,
  ModalLabel,
  Section,
  SideSubTitle,
  SideTitle,
} from "./styles";
import DefaultTitle from "../../components/common/DefaultTitle";
import SearchBar from "src/components/common/SearchBar";
import { FlatList } from "react-native";
import MealCard from "src/components/MealCard";
import mealService from "src/services/mealService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { type Meal } from "src/entitites/Meal";
import DefaultButton from "src/components/common/DefaultButton";
import AddMealModal from "src/components/StandardModal";

const Diary = ({ navigation }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState<string | null>("0");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = userId
        if (!id) {
          id = await AsyncStorage.getItem('userId')
          setUserId(id)
        }
        if (id) {
          const response = await mealService.getMealByUserId()
          setMeals(response ?? [])
          const mealsWithRecipes = response.filter(
            (meal) => meal.recipes.length > 0
          )
          const totalCalories = mealsWithRecipes.reduce(
            (acc, meal) =>
              acc +
              meal.recipes
                .map((recipe) => recipe.calories)
                .reduce(
                  (acc, recipe) => acc + parseFloat(recipe.toString()),
                  0
                ),
            0
          )
          setCalories(totalCalories.toString())
        } else {
          setCalories('0')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [userId])

  const renderItem = ({ item, index }: { item: Meal; index: number }) => (
    <MealCard
      isLast={index === meals.length - 1}
      height={100}
      name={item.name}
      icon={{ uri: item.icon }}
      onPressContainer={() => {
        navigation.navigate('DiaryMealRecipes', { meal: item })
      }}
      onPressAdd={() => {
        navigation.navigate('recipes', {screen: "Recipes"});
      }}
    />
  )

  const handleAddMeal = async () => {
    try {
      if (!mealName) {
        console.error('Meal name is required')
        return
      }
      const createdMeal = await mealService.addMeal(
        'https://cdn-icons-png.flaticon.com/512/3595/3595881.png',
        mealName
      )
      console.log('Meal created:', createdMeal)
      setMeals((prevMeals) => [...prevMeals, createdMeal])
      setMealName('')
      setModalOpen(false)
    } catch (error) {
      console.error('Error creating meal:', error)
    }
  }

  return (
    <Container>
      <DefaultTitle fontSize={20} title="Diary" />
      <SearchBar />
      <IndicatorContainer>
        <Section>
          <SideTitle>1250</SideTitle>
          <SideSubTitle>Eaten</SideSubTitle>
        </Section>
        <Section>
          <CenterTitle>{calories}</CenterTitle>
          <CenterSubTitle>Total Calories</CenterSubTitle>
        </Section>
        <Section>
          <SideTitle>550</SideTitle>
          <SideSubTitle>Remaining</SideSubTitle>
        </Section>
      </IndicatorContainer>
      <DefaultButton
        backgroundColor={'#6161A9'}
        text={'Add New Meal'}
        marginVertical={20}
        buttonHandle={() => {
          setModalOpen(true)
        }}
      />
      <AddMealModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
      >
        <FormContainer>
          <ModalLabel>Meal Name:</ModalLabel>
          <ModalInput
            placeholder="Enter meal name..."
            value={mealName}
            onChangeText={(text) => setMealName(text)}
          />
        </FormContainer>
        <ButtonContainer>
          <ActionButton
            onPress={() => {
              handleAddMeal()
            }}
          >
            <ActionButtonText>Create Meal</ActionButtonText>
          </ActionButton>
        </ButtonContainer>
      </AddMealModal>
      <FlatList
        data={meals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      
    </Container>
  )
}

export default Diary
