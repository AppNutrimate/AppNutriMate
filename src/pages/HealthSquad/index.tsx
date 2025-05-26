import React, { useEffect, useState } from "react";
import BackButton from "src/components/common/BackButton";
import { Container, Header, PageTitle } from "./styles";
import Divider from "src/components/common/Divider";
import WorkoutTimeline from "src/components/WorkoutTimeline";
import CaloriesChart from "src/components/CaloriesChart";
import { Workout } from "src/entitites/Workout";
import workoutService from "src/services/workoutService";
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl, ScrollView } from "react-native";

const HealthSquad = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchWorkouts = async (pageToFetch = 1, isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const res = await workoutService.getWorkoutsByUser(pageToFetch, 10);

      if (isRefresh) {
        setWorkouts(res);
        setPage(1);
        setHasMore(res.length === 10);
      } else {
        setWorkouts((prev) => {
          const newWorkouts = res.filter((w) => !prev.some((p) => p.id === w.id));
          return [...prev, ...newWorkouts];
        });
        setHasMore(res.length === 10);
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts(page);
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const refresh = () => {
    setPage(1);
    fetchWorkouts(1, true);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToBottom && !loading && hasMore) {
      loadMore();
    }
  };

  return (
    <Container>
      <Header>
        <BackButton />
        <PageTitle>HealthSquad</PageTitle>
      </Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <CaloriesChart workouts={workouts} />
        <Divider />
        <WorkoutTimeline
          workouts={workouts}
        />
      </ScrollView>
    </Container>
  );
};

export default HealthSquad;
