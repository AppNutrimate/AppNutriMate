import { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, NativeSyntheticEvent, NativeScrollEvent, View } from 'react-native';
import { Container } from './styles';
import ActivityDone from '../RecentWorkouts/ActivityDone';
import React from 'react';
import workoutService from 'src/services/workoutService';
import { Workout } from 'src/entitites/Workout';

const WorkoutTimeline = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const res = await workoutService.getWorkoutsByUser(page, 10);
      if (res.length === 0) {
        setHasMore(false);
      } else {
        setWorkouts((prev) => {
          const newWorkouts = res.filter((w) => !prev.some((p) => p.id === w.id));
          return [...prev, ...newWorkouts];
        });
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [page]);

  const onRefresh = () => {
    setPage((prev) => prev + 1);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToBottom && !loading && hasMore) {
      setPage((prev) => prev + 1);
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
            onRefresh={onRefresh}
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
