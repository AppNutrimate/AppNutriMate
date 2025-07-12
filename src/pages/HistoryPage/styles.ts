import styled from "styled-components/native";

export const HistoryContainer = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
  margin-top: 110px;
  margin-left: 30px;  
`

export const PlansContainer = styled.View`
    display: flex;
    flex-direction: column;
    margin: 20px;
    margin-top: 10px;
    align-items: center;
`;