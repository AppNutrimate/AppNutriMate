import { type Meal } from "src/entitites/Meal";
import api from "./api";
import { Recipe } from "src/entitites/Recipe";

const mealService = {
  getMealByUserId: async (): Promise<Meal[]> => {
    try {
      const res = await api.get<Meal[]>(`/users/meals`);
      return res.data;
    } catch (error) {
      /* console.error(
        'Error fetching user meal by ID:',error
      ) */
      // throw error
      return [];
    }
  },
  getRecipesByMeal: async (mealId: string): Promise<Recipe[]> => {
    try {
      const res = await api.get<Meal>(`/users/meals/${mealId}`);
      return res.data.recipes;
    } catch (error) {
      console.error(
        "Error fetching meal recipes by ID:",error
      );
      throw error;
    }
  },
  addMeal: async (
    icon: string,
    name: string
  ): Promise<Meal> => {
    try {
      const res = await api.post("/users/meals", {
        icon,
        name,
      });
      return res.data.meal;
    } catch (error) {
      console.error(
        "Error adding meal:",error
      );
      throw error;
    }
  },
  removeMeal: async (userId: string, mealId: string): Promise<void> => {
    try {
      const response = await api.delete(`/users/meals/${mealId}`);
      console.log("API response:", response.data);
    } catch (error) {
      console.error(
        "Error removing meal:", error);
      throw error;
    }
  },
  addRecipeToMeal: async (mealId: string, recipeId: string): Promise<void> => {
    try {
      await api.post(`/users/meals/${mealId}/recipe`, {
        recipeId,
      });
    } catch (error) {
      console.error(
        "Error adding recipe to meal:", error);
      throw error;
    }
  },
  removeRecipeFromMeal: async (
    mealId: string,
    recipeId: string
  ): Promise<void> => {
    try {
      await api.delete(`/users/meals/${mealId}/recipe/${recipeId}`);
    } catch (error) {
      console.error(
        "Error removing recipe from meal:",  error);
      throw error;
    }
  },
};

export default mealService;
