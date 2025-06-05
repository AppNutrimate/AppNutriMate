import styled from "styled-components/native";

export const Container = styled.View`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    margin-left: 20px;
    margin-right: 20px;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
`;

export const FlexContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
`;

export const MainContainer = styled.TouchableOpacity`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 130px;
    width: 165px;
    background-color: ${({ theme }) => theme.colors.purple};
    border-radius: 25px;
    justify-content: center;
    overflow: hidden;
`;

export const BackgroundImage = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.5;
`;

export const CircleContainer = styled.View`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.darkPurple};
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const IconCircle = styled.Image.attrs({ resizeMode: "contain" })`
    height: 30px;
    width: 30px;
`;

export const HistoryIcon = styled.Image.attrs({ resizeMode: "contain" })`
    height: 25px;
    width: 25px;
    margin-right: 5px;
`;

export const ChartIcon = styled.Image.attrs({ resizeMode: "contain" })`
    height: 100px;
    width: 100px;
    margin-bottom: 5px;
`;

export const Title = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: bold;
`;