import React, { useCallback, useState } from "react";
import { Container, Title } from "./styles";
import BackButton from "src/components/common/BackButton";
import { Weight } from "src/entitites/Weight";
import AsyncStorage from "@react-native-async-storage/async-storage";
import weightService from "src/services/weightService";
import { useFocusEffect } from "@react-navigation/native";
import { WeightChart } from "src/components/WeightChart";
import { NoDataButton } from "src/components/WeightChart/NoDataButton";

const StatusPage = () => {
    const [weights, setWeights] = useState<Weight[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    
    const fetchPerformanceData = async () => {
        try {
            const id = await AsyncStorage.getItem('userId');
            if (id != null) {
                const weights = await weightService.getWeightByUserId(id);
                setUserId(id);
                const limitedWeights = weights.slice(0, 8);
                setWeights(limitedWeights);
            }
        } catch (error) {
            console.error("Error fetching performance data:", error);
        }
    };
    
    useFocusEffect(
        useCallback(() => {
            fetchPerformanceData();
        }, [])
    );
  return (
    <Container>
      <BackButton/>
      <Title>Track Your Gains</Title>
      {weights?.length ? (
        <WeightChart userId={userId} data={weights} />
        ) : (
        <NoDataButton userId={userId}/>
        )}
        {/* TODO: Esporte quantidade treinos, esporte preferido, calorias gastas na ultima semana */}
    </Container>
  );
}
export default StatusPage;