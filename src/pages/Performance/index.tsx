import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from "react";
import { Weight } from 'src/entitites/Weight';
import weightService from 'src/services/weightService';
import { Container, Title } from './style';
import { WeightChart } from 'src/components/WeightChart';

const Performance = () => {
    const [weights, setWeights] = useState<Weight[]>([]);
    
    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id != null) {
                    const weights = await weightService.getWeightByUserId(id);
                    setWeights(weights);
                }
            } catch (error) {
                console.error("Error fetching performance data:", error);
            }
        };
        fetchPerformanceData();
    }, []);

    return (
        <Container>
            <Title>Dashboard</Title>
            <WeightChart data={weights} />
        </Container>
    );
}

export default Performance;
