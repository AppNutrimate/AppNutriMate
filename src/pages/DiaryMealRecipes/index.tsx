/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import NavBar from "../../components/common/NavBar";
import { Container } from "./styles";
import DefaultTitle from "../../components/common/DefaultTitle";
import SearchBar from "src/components/common/SearchBar";
import RecipeCard, { type RecipeCardProps } from "src/components/RecipeCard";
import { FlatList } from "react-native";
import { Recipe } from "src/entitites/Recipe";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { PropsNavigationStack, PropsStack } from "src/routes";
import mealService from "src/services/mealService";
import RecipeCardMeal from "src/components/RecipeCardMeal";

const DiaryMealRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[] | []>([]);
  const route = useRoute<RouteProp<PropsNavigationStack, "DiaryMealRecipes">>();
  const { meal } = route.params;

  const navigation = useNavigation<PropsStack>();

  const handleNavigate = (recipe: Recipe) => {
    navigation.navigate("RecipePage", { recipe });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mealService.getRecipesByMeal(meal.id);
        setRecipes(response ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    void fetchData();
  }, []);

  const renderItem = ({ item }: { item: Recipe }) => (
    <RecipeCardMeal
      _id={item.id}
      isLast={false}
      height={100}
      title={item.name}
      calories={item.calories}
      proteins={item.proteins}
      timePrepare={item.timePrepare}
      image={{ uri: item.picture }}
      mealId={meal.id}
      onPress={() => {
        handleNavigate(item);
      }}
    />
  );
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
      <NavBar />
    </Container>
  );
};

export default DiaryMealRecipes;
