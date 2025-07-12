import React from "react"
import { DietPlanResponse } from "src/entitites/DietPlan"
import { Container, MealsQuantity, ProfessionalName, Title } from "./styles"
import { formatDateMonthAndYear } from "src/utils/formatDate"

interface DietPlanCardProps {
    diets: DietPlanResponse
}

const DietPlanCard = ({ diets }: DietPlanCardProps) => {
    return (
        <Container>
            <Title>Plano Alimentar {formatDateMonthAndYear(diets.availableAt?.toString() ?? "")}</Title>
            <ProfessionalName>
                {diets.professional.firstName} {diets.professional.lastName} / {diets.professional.registration}
            </ProfessionalName>
            <MealsQuantity>{diets.meals.length} Refeições</MealsQuantity>
        </Container>
    )
}

export default DietPlanCard