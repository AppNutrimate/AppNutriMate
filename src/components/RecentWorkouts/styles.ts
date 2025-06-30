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
  margin-bottom: 10px;
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

export const ActivityContainer = styled.View`
  margin-top: 15px;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  background-color:rgb(237, 227, 255);
  border-radius: 24px;
`;

export const ActivityTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.black};
  margin-left: 10px;
  margin-bottom: 10px;
`;

export const ActivityTextContainer = styled.View`
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  gap: 12px;
`;

export const ActivityText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.darkGray};
  margin-left: 5px;
`;

export const ActivityDateContainer = styled.View`
  background-color: ${(props) => props.theme.colors.purple};
  border-radius: 24px;
  padding: 8px 10px;
  align-items: center;
  width: 115px;
  flex-shrink: 0;
`;

export const ActivityDateText = styled.Text`
  font-size: 12px;
  color: white;
`;

export const TitleAndDotsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
`;

export const DropdownContainer = styled.View`
  position: absolute;
  top: 30px;
  right: 0;
  width: 100px;
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  z-index: 999;
`;

export const ActivityIconsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 25px;
  margin-right: -15px;
  width: 45%;
  padding: 0 10px;
  align-self: center;
  flex: 1;
`;

export const ActivityDurationCaloriesContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ActivityIconContainer = styled.View`
  background-color: ${(props) => props.theme.colors.purple};
  border-radius: 24px;
  padding: 8px 0px;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

export const ActivityIcon = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: 20px;
  height: 20px;
`;

export const ActivityDurationCaloriesText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: bold;
  margin-top: 5px;
`;

export const Dropdown = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 0 5px;
`;

export const Option = styled.TouchableOpacity`
  padding: 8px;
`;

export const OptionText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.darkPurple};
  font-weight: 600;
`;