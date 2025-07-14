import styled from "styled-components/native";

export const HistoryContainer = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.purple};
  width: 100%;
  height: 15%;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  margin-top: 35px;  
`

export const PlansContainer = styled.View`
    display: flex;
    flex-direction: column;
    margin: 20px;
    margin-top: 40px;
    align-items: center;
`;