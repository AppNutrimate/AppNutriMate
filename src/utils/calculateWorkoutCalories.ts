import AsyncStorage from '@react-native-async-storage/async-storage'
import { Sport } from 'src/entitites/Sport'
import { CreateWorkoutDTO, Workout } from 'src/entitites/Workout'
import sportService from 'src/services/sportService'
import weightService from 'src/services/weightService'

export const calculateWorkoutCalories = async (workout: CreateWorkoutDTO, sportId: string): Promise<number> => {
    try {
        const userId = await AsyncStorage.getItem('userId')
        const sport = await sportService.getSportById(sportId)
        if (!userId) {
            throw new Error('User ID not found in AsyncStorage')
        }
        if (!sport) {
            throw new Error('Sport not found')
        }

        const weight = await weightService.getWeightByUserId(userId)
        if (!weight || weight.length === 0) {
            throw new Error('Peso do usuário não encontrado ou inválido')
        }

        const userWeight = weight[0].value
        const MET = sport.data.met
        const durationInHours = workout.durationInMin / 60

        const caloriesBurned = MET * Number(userWeight) * durationInHours

        if (isNaN(caloriesBurned)) {
            throw new Error('Cálculo de calorias inválido')
        }
        return Math.round(caloriesBurned)
    } catch (error) {
        console.error('Erro ao calcular calorias:', error)
        return 0
    }
}
