import { Sport } from "./Sport";

export interface Workout {
    id: string;
    name: string;
    date: string;
    durationInMin: number;
    caloriesBurned: number;
    user: {
        id: string;
    }
    sport: Sport
}