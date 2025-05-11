import React, { useEffect, useState } from "react";
import { Container, DotsButton, DotsIcon, Title, TitleContainer } from "./styles";
import Dots from "@icons/dots-w.png";
import { RefreshControl, ScrollView, View } from "react-native";
import ActivityDone from "./ActivityDone";
import workoutService from "src/services/workoutService";
import { Workout } from "src/entitites/Workout";


const ActivityTimeline = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWorkouts = async () => {
    try {
      const workouts = await workoutService.getWorkoutsByUser();
      setWorkouts(workouts.slice(0, 5));
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  }

  const onRefresh = async () => {
    setLoading(true);
    await fetchWorkouts();
    setLoading(false);
  }

  useEffect(() => {
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
            />
          }
        >
          {workouts.map((activity) => (
            <ActivityDone
              key={activity.id}
              name={activity.name}
              durationInMin={activity.durationInMin}
              date={activity.date}
              caloriesBurned={activity.caloriesBurned}
              sport={activity.sport}
            />
          ))}
        </ScrollView>
    </Container>
  );
}

export default ActivityTimeline;