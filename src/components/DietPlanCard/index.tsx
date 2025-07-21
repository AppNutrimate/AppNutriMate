import React from "react"
import { DietPlanResponse } from "src/entitites/DietPlan"
import { Card, ExpiredContainer, ExpiredText, FooterCard, Header, MealsInfo, Name, ProfessionalInfo, Registration, Title } from "./styles"
import { formatDateMonthAndYear } from "src/utils/formatDate"
import { View } from "react-native-animatable"
import { getDate } from "date-fns"

interface DietPlanCardProps {
    diets: DietPlanResponse
}

const DietPlanCard = ({ diets }: DietPlanCardProps) => {
    return (
        <Card activeOpacity={0.8}>
            <Header>
                <Title>
                    Plano Alimentar {formatDateMonthAndYear(diets.availableAt?.toString() ?? "")}
                </Title>
            </Header>
            <ProfessionalInfo>
                <Name>{diets.professional.firstName} {diets.professional.lastName}</Name>
                <Registration>CRN: {diets.professional.registration.slice(0, 5)}</Registration>
            </ProfessionalInfo>
            <FooterCard>
                <MealsInfo>{diets.meals.length} refeições planejadas</MealsInfo>
                {diets.availableAt && new Date(diets.availableAt) < new Date() && (
                    <ExpiredContainer>
                        <ExpiredText>Expirado</ExpiredText>
                    </ExpiredContainer>
                )}
            </FooterCard>
        </Card >
    )
}

export default DietPlanCard