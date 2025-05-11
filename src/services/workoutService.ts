import { Workout } from "src/entitites/Workout";
import api from "./api";

const workoutService = {
    getWorkoutsByUser: async (page: number, limit?: number): Promise<Workout[]> => {
        try {
            const res = await api.get<Workout[]>(`/workouts?page=${page}&limit=${limit ? limit : 10}`);
            return res.data;
        } catch (error) {
            return [];
        }
    },

}

export default workoutService;