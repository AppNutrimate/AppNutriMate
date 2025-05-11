export interface Workout {
    id: string;
    name: string;
    date: string;
    durationInMin: number;
    caloriesBurned: number;
    user: {
        id: string;
    }
    sport: {
        id: string;
    }
}