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

    getWorkoutById: async (id: string): Promise<Workout | null> => {
        try {
            const res = await api.get<Workout>(`/workouts/${id}`);
            return res.data;
        } catch (error) {
            console.error("Erro ao buscar treino:", error);
            return null;
        }
    },

    deleteWorkout: async (id: string): Promise<void> => {
        try {
            await api.delete(`/workouts/${id}`);
        } catch (error) {
            console.error("Erro ao deletar treino:", error);
            throw new Error("Failed to delete workout");
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