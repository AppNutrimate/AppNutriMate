import api from './api'
import { type Recipe } from 'src/entitites/Recipe'

const recipeService = {
  getRecipes: async () => {
    try {
      const res = await api.get<Recipe[]>('/recipes')
      return res
    } catch (error) {
      console.log(error)
    }
  },
  getRecipesByMealId: async (mealId: string) => {
    try {
      const res = await api.get(`/users/meals/recipes/${mealId}`)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
}
export default recipeService
