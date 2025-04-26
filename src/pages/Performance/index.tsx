import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from "react";
import { Weight } from 'src/entitites/Weight';
import weightService from 'src/services/weightService';
import { Container, Title } from './style';
import { WeightChart } from 'src/components/WeightChart';
import { NoDataButton } from 'src/components/WeightChart/NoDataButton';

const Performance = () => {
    const [weights, setWeights] = useState<Weight[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id != null) {
                    const weights = await weightService.getWeightByUserId(id);
                    setUserId(id);
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
            {weights?.length ? (
                <WeightChart userId={userId} data={weights} />
            ) : (
                <NoDataButton />
            )}

        </Container>
    );
}

export default Performance;
