import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  margin: -10px 20px;
`;

export const TitleContainer = styled.View`
align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.darkGray};
`;

export const DotsButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.purple};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

export const DotsIcon = styled.Image`
  width: 20px;
  height: 20px;
`;