import { DietPlanResponse } from "src/entitites/DietPlan";
import api from "./api";

const dietPlanService = {
    getDietPlansByUser: async (userId: string): Promise<DietPlanResponse[]> => {
        try {
            const res = await api.get(`/diets/users/${userId}`);
            return res.data;
        } catch (error) {
            console.error(
                "Error fetching Diet Plan by userId:", error
            );
            throw error;
        }
    }
}

export default dietPlanService;