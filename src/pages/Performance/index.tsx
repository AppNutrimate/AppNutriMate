import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Weight } from 'src/entitites/Weight';
import weightService from 'src/services/weightService';
import { Container, Title } from './style';
import DefaultTitle from 'src/components/common/DefaultTitle';

const Performance = () => {
    const [weights, setWeights] = useState<Weight[] | null>(null);
    
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
        </Container>
    );
}

export default Performance;
