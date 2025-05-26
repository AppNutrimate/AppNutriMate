import React, { useEffect, useState } from "react";
import BackButton from "src/components/common/BackButton";
import { Container, Header, PageTitle } from "./styles";
import Divider from "src/components/common/Divider";
import WorkoutTimeline from "src/components/WorkoutTimeline";
import CaloriesChart from "src/components/CaloriesChart";
import { Workout } from "src/entitites/Workout";
import workoutService from "src/services/workoutService";

const HealthSquad = () => {
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

    const loadMore = () => {
      if (!loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    const refresh = () => {
      setPage(1);
      setWorkouts([]);
      setHasMore(true);
    };
    
    return (
        <Container>
            <Header>
                <BackButton/>
                <PageTitle>HealthSquad</PageTitle>
            </Header>
            <CaloriesChart
                workouts={workouts}
            />
            <Divider/>
            <WorkoutTimeline
                workouts={workouts} 
                loading={loading} 
                loadMore={loadMore} 
                refresh={refresh} 
                hasMore={hasMore}
            />            
        </Container>
    );
}

export default HealthSquad;