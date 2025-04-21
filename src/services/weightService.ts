import { Weight } from "src/entitites/Weight";
import api from "./api";

const weightService = {
    getWeightByUserId: async (userId: string): Promise<Weight[]> => {
        try {
            const res = await api.get<Weight[]>(`/users/${userId}/weights`);
            return res.data;
        } catch (error) {
            return [];
        }
    },

    addWeight: async (userId: string, weight: Weight): Promise<Weight> => {
        try {
            const res = await api.post<Weight>(`/users/${userId}/weights`, weight);
            return res.data;
        } catch (error) {
            throw new Error("Failed to add weight");
        }
    },

    updateWeight: async (userId: string, weightId: string, value: number): Promise<Weight> => {
        try {
            const res = await api.put<Weight>(`/users/${userId}/weights/${weightId}`, value);
            return res.data;
        } catch (error) {
            throw new Error("Failed to update weight");
        }
    },

    removeWeight: async (userId: string, weightId: string): Promise<void> => {
        try {
            await api.delete(`/users/${userId}/weights/${weightId}`);
        } catch (error) {
            throw new Error("Failed to remove weight");
        }
    }
}

export default weightService;