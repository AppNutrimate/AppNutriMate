import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.purple};
  width: 100%;
  height: 15%;
  justify-content: center;
  align-items: center;
`

export const PageTitle = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
`;
