import React from "react";
import { Container, DotsButton, DotsIcon, Title, TitleContainer } from "./styles";
import Dots from "@icons/dots-w.png";
import { ScrollView, View } from "react-native";
import ActivityDone from "./ActivityDone";

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
  return (
    <Container>
        <TitleContainer>
            <Title>Latest Workouts</Title>
            <DotsButton>
                <DotsIcon source={Dots} />
            </DotsButton>
        </TitleContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          {activitySimulator.map((activity) => (
            <ActivityDone
            key={activity.id.toString()}
            name={activity.name}
            duration={activity.duration}
            date={activity.date}
            burnedCalories={activity.burnedCalories.toString()}
            />
          ))}
        </ScrollView>
    </Container>
  );
}

export default ActivityTimeline;