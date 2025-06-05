import { Sport } from "src/entitites/Sport"
import api from "./api"

const sportService = {
    getSports: async () => {
        try {
            const res = await api.get<Sport[]>('/sports')
            return res
        } catch (error) {
            console.log(error)
        }
    },

    getSportById: async (sportId: string) => {
        try {
            const res = await api.get<Sport>(`/sports/${sportId}`)
            return res
        } catch (error) {
            console.log(error)
        }
    },
}

export default sportService