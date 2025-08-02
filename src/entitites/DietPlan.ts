import type { Meal } from "./Meal"
import { Professional, ProfessionalLow } from "./Professional"
import type { User } from "./User"

export interface DietPlan {
    id: string
    availableAt: string
    isVisible: boolean
    professional: Professional
    user: User
    meals: Meal[]
    createdAt: string
    updatedAt: string
}

export interface DietPlanResponse {
    id: string;
    professional: ProfessionalLow
    availableAt?: string | null;
    isVisible: boolean;
    meals: Meal[];
}