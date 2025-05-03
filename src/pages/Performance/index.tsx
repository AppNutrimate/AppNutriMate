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
    
    return (
        <Container>
            <BackButton />
            <Title>Dashboard</Title>
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
