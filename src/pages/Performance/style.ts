import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
  margin-top: 100px;
  margin-left: 20px;  
`