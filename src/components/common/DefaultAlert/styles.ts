import styled from "styled-components/native";

export const ModalOverlay = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
    display: flex;
    width: 80%;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const AlertHeader = styled.View`
    display: flex;
    width: 100%;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.purple};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

export const AlertGif = styled.Image`
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
`;

export const AlertText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: ${({ theme }) => theme.colors.darkGray};
`;

export const AlertSecondText = styled.Text`
    font-size: 16px;
    text-align: center;
    color: ${({ theme }) => theme.colors.darkGray};
    margin-top: 5px;
    padding: 0 20px;
`;

export const AlertButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.purple};
    padding: 10px 35px;
    border-radius: 15px;
    margin-top: 20px;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const AlertButtonText = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: bold;
`;