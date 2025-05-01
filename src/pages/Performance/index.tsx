import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect, useState } from "react";
import { Weight } from 'src/entitites/Weight';
import weightService from 'src/services/weightService';
import { Container, Title } from './style';
import { useFocusEffect } from '@react-navigation/native';
import BackButton from 'src/components/common/BackButton';
import DefaultButton from 'src/components/common/DefaultButton';
import ActivityCards from 'src/components/ActivityCards';
import ActivityTimeline from 'src/components/ActivityTimeline';

const Performance = () => {
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
            <BackButton />
            <Title>Dashboard</Title>
            {/* {weights?.length ? (
                <WeightChart userId={userId} data={weights} />
            ) : (
                <NoDataButton userId={userId}/>
            )} */}
            <ActivityCards/>
            <DefaultButton
                backgroundColor={'#b8e903'}
                text={'+ Add Your Workout'}
                marginVertical={20}
                buttonHandle={()=>{
                    console.log('oi')
                }}
            />
            <ActivityTimeline/>
        </Container>
    );
}

export default Performance;
