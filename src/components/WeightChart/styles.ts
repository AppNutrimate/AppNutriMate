import { symbol } from "prop-types";
import styled from "styled-components/native";

export const ChartContainer = styled.View`
    align-items: center;
    margin: 20px;
    background-color: #6161a9;
    padding: 20px;
    border-radius: 16px;
    justify-content: center;
    align-content: center;
`;

export const ChartHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const ChartTitle = styled.Text`
    color: #fff;
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: left;
    align-self: flex-start;
`;

export const AddWeightButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 15px;
    align-self: center;
    border: 3px solid #fff;
    width: 30px;
    height: 30px;
`;

export const TextButton = styled.Text`
  color: ${({ theme }) => theme.colors.darkPurple};
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  line-height: 22px;
`;