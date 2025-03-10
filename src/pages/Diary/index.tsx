import React, { useCallback, useEffect, useState } from "react";
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
  PresetImage,
  PresetImageCard,
  PresetImagesContainer,
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
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
type RootStackParamList = {
  DiaryMealRecipes: { meal: Meal };
  recipes: { screen: string };
};

const Diary = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState<string | null>("0");
  const [modalOpen, setModalOpen] = useState(false);
  const [mealImage, setMealImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const imagesPresets = [
    "https://cdn-icons-png.flaticon.com/512/3595/3595881.png",
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQgvMuIM2CKAJVlHsoH6n2LKE4VV9KFLQmEz99z1dmMKfCNMrj4",
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgyDFCvv1fqXLk2GV_evKRTvyeTn4tUhewn6Ik8JzGVwOux12U",
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSZ8rk0SBRi8h-LTDUD7TcaJc9xWYeGnZlMYg74WypMdgL-IU5N",
    "https://cdn-icons-png.flaticon.com/512/1784/1784216.png",
    "https://cdn-icons-png.flaticon.com/512/10541/10541174.png"
  ]

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const id = await AsyncStorage.getItem('userId');
          const response = await mealService.getMealByUserId();
          setMeals(response ?? []);
          if (!id) return;
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
        } catch (error) {
          console.error('Error fetching meals:', error);
        }
      };
  
      fetchData();
    }, [])
  );

  
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
        mealImage ?? '',
        mealName
      )
      console.log('Meal created:', createdMeal)
      setMeals((prevMeals) => [...prevMeals, createdMeal])
      handleCloseModal()
    } catch (error) {
      console.error('Error creating meal:', error)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setMealImage(null)
    setSelectedImage(null)
    setMealName('')
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
          handleCloseModal()
        }}
      >
        <FormContainer>
          <ModalLabel>Meal Name:</ModalLabel>
          <ModalInput
            placeholder="Enter meal name..."
            value={mealName}
            onChangeText={(text) => setMealName(text)}
          />
        <PresetImagesContainer>
          {imagesPresets.map((image) => {
            const isSelected = selectedImage === image;

            return (
              <PresetImageCard 
                key={image} 
                onPress={() => {
                  setMealImage(image);
                  setSelectedImage(image);
                }}
                style={{
                  borderWidth: isSelected ? 4 : 2
                }}
              >
                <PresetImage source={{ uri: image }} />
              </PresetImageCard>
            );
          })}
        </PresetImagesContainer>

        </FormContainer>
        <ButtonContainer>
          <ActionButton
            onPress={() => {
              handleAddMeal()
              handleCloseModal()
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
