import styled from "styled-components/native";

export const ChartContainer = styled.View`
    align-items: center;
    margin: 20px;
    background-color: #4a2382;
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

export const NoDataContainer = styled.TouchableOpacity`
    flex-direction: row;
    margin: 20px;
    background-color: #4a2382;
    padding: 20px;
    border-radius: 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    `;

export const NoDataText = styled.Text`
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    align-self: center;
`;

export const TooltipContainer = styled.View`
  position: absolute;
  background-color: #fff;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 6px;
  border-width: 1px;
  border-color: #ccc;
  z-index: 10;
`;

export const TooltipText = styled.Text`
  font-size: 12px;
  color: #333;
  font-weight: bold;
`;

export const FormContainer = styled.View`
  margin-top: -10px;
`

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`

export const ModalLabel = styled.Text`
  font-size: 24px;
  margin-bottom: 8px;
  font-weight: bold;
  margin-left: 5px;
`

export const ModalInput = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: #ccc;
  padding: 8px;
  border-radius: 8px;
  font-size: 18px;
  margin-bottom: -5px;
`

export const ActionButton = styled.Pressable`
  flex: 1;
  background-color: #4a2382;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin-top: 5px;
`

export const ActionButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`

export const ErrorMessageContainer = styled.View`
  height: 30px;
`;

export const ErrorMessage = styled.Text`
  color: red;
  font-size: 14px;
  padding-top: 15px;
`;