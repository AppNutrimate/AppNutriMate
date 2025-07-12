import React, { useEffect, useState } from "react"
import { HistoryContainer, PlansContainer, Title } from "./styles"
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
            <BackButton />
            <Title>History</Title>
            <PlansContainer>
                {dietPlans.map((plan) =>
                    <DietPlanCard diets={plan} />
                )}
            </PlansContainer>
        </HistoryContainer>
    )
}

export default HistoryPage