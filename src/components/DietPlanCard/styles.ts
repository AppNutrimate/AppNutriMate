import styled from "styled-components/native";

export const Card = styled.TouchableOpacity`
    width: 100%;
    padding: 20px;
    background-color: rgb(237, 227, 255);
    border-radius: 24px;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.12);
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.darkPurple};
`;

export const ProfessionalInfo = styled.View`
    margin-bottom: 12px;
`;

export const Name = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.darkGray};
`;

export const Registration = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.darkGray};
    font-style: italic;
    margin-top: 2px;
`;

export const MealsInfo = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.purple};
    font-weight: bold;
`;
