import React, { useEffect, useState } from "react"
import { Header, HistoryContainer, PlansContainer, Title } from "./styles"
import BackButton from "src/components/common/BackButton"
import { DietPlanResponse } from "src/entitites/DietPlan"
import dietPlanService from "src/services/dietPlanService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import DietPlanCard from "src/components/DietPlanCard"

const HistoryPage = () => {
    const [dietPlans, setDietPlans] = useState<DietPlanResponse[]>([])
    useEffect(() => {
        const fetchDietPlans = async () => {
            const userId = await AsyncStorage.getItem('userId');
            if (userId !== null) {
                const diets = await dietPlanService.getDietPlansByUser(userId)
                setDietPlans(diets)
            }
        }
        fetchDietPlans()
    }, [])
    return (
        <HistoryContainer>
            <Header>
                <BackButton />
                <Title>History</Title>
            </Header>
            <PlansContainer>
                {dietPlans.map((plan) =>
                    <DietPlanCard key={plan.id} diets={plan} />
                )}
            </PlansContainer>
        </HistoryContainer>
    )
}

export default HistoryPage