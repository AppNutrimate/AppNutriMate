import { ScrollView, RefreshControl, NativeSyntheticEvent, NativeScrollEvent, View } from 'react-native';
import { Container } from './styles';
import ActivityDone from '../RecentWorkouts/ActivityDone';
import React from 'react';
import { Workout } from 'src/entitites/Workout';

interface WorkoutTimelineProps {
  workouts: Workout[];
  loading: boolean;
  loadMore: () => void;
  refresh: () => void;
  hasMore: boolean;
}

const WorkoutTimeline = ({ workouts, loading, loadMore, refresh, hasMore }: WorkoutTimelineProps) => {
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToBottom && !loading && hasMore) {
      loadMore();
    }
  };

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
          />
        }
      >
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
      </ScrollView>
    </Container>
  );
};

export default WorkoutTimeline;
