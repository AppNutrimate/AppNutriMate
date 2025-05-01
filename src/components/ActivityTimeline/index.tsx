import React from "react";
import { Container, DotsButton, DotsIcon, Title, TitleContainer } from "./styles";
import Dots from "@icons/dots-w.png";
import { View } from "react-native";

const activitySimulator = [
  {
    id: 1,
    name: "Running",
    duration: "30 min",
    date: "June 1, 2025 - 06:00 AM",
    burnedCalories: 300,
  },
  {
    id: 2,
    name: "Cycling",
    duration: "60 min",
    date: "June 1, 2025 - 07:00 AM",
    burnedCalories: 500,
  },
  {
    id: 3,
    name: "Swimming",
    duration: "45 min",
    date: "June 1, 2025 - 08:00 AM",
    burnedCalories: 400,
  },
]

const ActivityTimeline = () => {
  return (
    <Container>
        <TitleContainer>
            <Title>Recent Workouts</Title>
            <DotsButton>
                <DotsIcon source={Dots} />
            </DotsButton>
        </TitleContainer>
        {activitySimulator.map((activity) => (
          <View key={activity.id} style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#f0f0f0", marginVertical: 5, borderRadius: 5 }}>
            <Title>{activity.name}</Title>
            <Title>{activity.duration}</Title>
            <Title>{activity.date}</Title>
          </View>
        ))}
    </Container>
  );
}

export default ActivityTimeline;