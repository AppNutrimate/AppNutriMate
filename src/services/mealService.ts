/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Meal } from "src/entitites/Meal";
import api from "./api";
import { Recipe } from "src/entitites/Recipe";

const mealService = {
  getMealByUserId: async (userId: string): Promise<Meal[]> => {
    try {
      const res = await api.get<Meal[]>(`/users/meals`);
      return res.data;
    } catch (error: any) {
      /* console.error(
        'Error fetching user meal by ID:',
        error.response?.data || error.message
      ) */
      // throw error
      return [];
    }
  },
  getRecipesByMeal: async (mealId: string): Promise<Recipe[]> => {
    try {
      const res = await api.get<Meal>(`/users/meals/${mealId}`);
      return res.data.recipes;
    } catch (error: any) {
      console.error(
        "Error fetching meal recipes by ID:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  addMeal: async (
    icon: string,
    name: string,
    userId: string
  ): Promise<Meal> => {
    try {
      const res = await api.post<any>("/users/meals", {
        icon,
        name,
      });
      return res.data.meal;
    } catch (error: any) {
      console.error(
        "Error adding meal:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  removeMeal: async (userId: string, mealId: string): Promise<void> => {
    try {
      const response = await api.delete(`/users/meals/${mealId}`);
      console.log("API response:", response.data);
    } catch (error: any) {
      console.error(
        "Error removing meal:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  addRecipeToMeal: async (mealId: string, recipeId: string): Promise<void> => {
    try {
      await api.post(`/users/meals/${mealId}/recipe`, {
        recipeId,
      });
    } catch (error: any) {
      console.error(
        "Error adding recipe to meal:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  removeRecipeFromMeal: async (
    mealId: string,
    recipeId: string
  ): Promise<void> => {
    try {
      await api.delete(`/users/meals/${mealId}/recipe/${recipeId}`);
    } catch (error: any) {
      console.error(
        "Error removing recipe from meal:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default mealService;
