import React, { useEffect, useState } from "react";
import { Container, DotsButton, DotsIcon, Title, TitleContainer } from "./styles";
import Dots from "@icons/dots-w.png";
import { ScrollView, View } from "react-native";
import ActivityDone from "./ActivityDone";
import workoutService from "src/services/workoutService";
import { Workout } from "src/entitites/Workout";

const activitySimulator = [
  {
    id: 1,
    name: "Running",
    duration: "30min",
    date: "June 1 - 06:00 AM",
    burnedCalories: 300,
  },
  {
    id: 2,
    name: "Cycling",
    duration: "60min",
    date: "June 1 - 07:00 AM",
    burnedCalories: 500,
  },
  {
    id: 3,
    name: "Swimming",
    duration: "45min",
    date: "June 1 - 08:00 AM",
    burnedCalories: 400,
  },
]

const ActivityTimeline = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workouts = await workoutService.getWorkoutsByUser();
        setWorkouts(workouts);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
  }
    fetchWorkouts();
  }, [])

  return (
    <Container>
        <TitleContainer>
            <Title>Latest Workouts</Title>
            <DotsButton>
                <DotsIcon source={Dots} />
            </DotsButton>
        </TitleContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          {workouts.map((activity) => (
            <ActivityDone
            key={activity.id}
            name={activity.name}
            durationInMin={activity.durationInMin}
            date={activity.date}
            burnedCalories={activity.caloriesBurned.toString()}
            />
          ))}
        </ScrollView>
    </Container>
  );
}

export default ActivityTimeline;