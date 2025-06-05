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

    addWeight: async (userId: string, weight: number, measuredAt: Date) => {
        const formattedDate = new Date(measuredAt).toISOString();
        try {
            const res = await api.post<any>(`/users/${userId}/weights`, {
                value: weight,
                measuredAt: formattedDate,
            });
            return res.data;
        } catch (error) {
            throw new Error("Failed to add weight");
        }
    },

    updateWeight: async (userId: string, weightId: string, value: number, measuredAt: Date): Promise<Weight> => {
        const formattedDate = new Date(measuredAt).toISOString();
        try {
            const res = await api.patch<Weight>(`/users/${userId}/weights/${weightId}`, {
                value: value,
                measuredAt: formattedDate
            });
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