import { Workout } from "src/entitites/Workout";
import api from "./api";
import { CreateWorkoutDTO } from "src/entitites/Workout";

const workoutService = {
    getWorkoutsByUser: async (page: number, limit?: number): Promise<Workout[]> => {
        try {
            const res = await api.get<Workout[]>(`/workouts?page=${page}&limit=${limit ? limit : 10}`);
            return res.data;
        } catch (error) {
            console.error("Erro ao listar treinos:", error);
            return [];
        }
    },

    addWorkout: async (workout: CreateWorkoutDTO) => {
        try {
            const res = await api.post<Workout>("/workouts", workout);
            return res.data;
        } catch (error) {
            console.error("Erro ao adicionar treino:", error);
            throw new Error("Failed to add workout");
        }
    }
}

export default workoutService;