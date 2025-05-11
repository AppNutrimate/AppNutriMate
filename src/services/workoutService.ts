import { Workout } from "src/entitites/Workout";
import api from "./api";

const workoutService = {
    getWorkoutsByUser: async (): Promise<Workout[]> => {
        try {
            const res = await api.get<Workout[]>(`/workouts`);
            return res.data;
        } catch (error) {
            return [];
        }
    },

}

export default workoutService;