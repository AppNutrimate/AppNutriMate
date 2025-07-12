import styled from "styled-components/native";

export const Container = styled.View`
    display: flex;
    width: 100%;
    margin: 15px;
    padding: 15px 15px;
    flex-direction: column;
    border: 2px solid ${({ theme }) => theme.colors.darkPurple};
    background-color: ${({ theme }) => theme.colors.cream};
    border-radius: 16px;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: ${({ theme }) => theme.colors.darkPurple};
    font-weight: bold;
`;

export const ProfessionalName = styled.Text`
    font-size: 18px;
    font-style: italic;
    color: ${({ theme }) => theme.colors.darkGray};
    margin-top: 5px;
`;

export const MealsQuantity = styled.Text`
    font-size: 18px;
    color: ${({ theme }) => theme.colors.green};
    margin-top: 5px;
`;