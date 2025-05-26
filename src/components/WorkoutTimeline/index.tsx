import { View } from 'react-native';
import { Container } from './styles';
import ActivityDone from '../RecentWorkouts/ActivityDone';
import React from 'react';
import { Workout } from 'src/entitites/Workout';

interface WorkoutTimelineProps {
  workouts: Workout[];
}

const WorkoutTimeline = ({ workouts }: WorkoutTimelineProps) => {
  return (
    <Container>
        {workouts.map((workout) => (
          <ActivityDone
            key={workout.id}
            name={workout.name}
            durationInMin={workout.durationInMin}
            date={workout.date}
            caloriesBurned={workout.caloriesBurned}
            sport={workout.sport}
          />
        ))}
        <View style={{ height: 20 }} />
    </Container>
  );
};

export default WorkoutTimeline;
