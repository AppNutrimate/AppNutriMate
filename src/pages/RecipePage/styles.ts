import Animated from 'react-native-reanimated';
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const CoverPhoto = styled.Image.attrs({
  resizeMode: 'cover'
})`
  width: 100%;
  height: 50%;
`
export const ContainerText = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
export const AnimatedContainer = styled(Animated.View)`
  position: absolute;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  top: 47%;
  width: 100%;
  height: 100%;
`;

export const Title = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  padding-left: 10%;
  padding-top: 15px;
`
export const ContainerTimeAndCalories = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  padding-left: 10%;
  padding-right: 10%;
`
export const ContentTimeAndCalories = styled.View`
  flex-direction: row;
  justify-content: align-items;
  align-items: center;
`
export const ContainerAllMacros = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.darkGray};
  background-color: ${({ theme }) => theme.colors.cream};
  margin-left: 5%;
  margin-right: 5%;
  padding: 10px;
  border-radius: 50px;
`
export const ContentMacros = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const MacroIcon = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 30px;
  height: 30px;
`
export const MiniMacroIcon = styled(MacroIcon)`
  width: 24px;
  height: 24px;
`
export const MacroTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkGray};
  padding-left: 3px;
`
export const StyledMacroUnit = styled(MacroTitle)`
  font-weight: 600;
  color: black;
  font-size: 15px;
`
export const StyledMacroTitle = styled(MacroTitle)`
  font-size: 15px;
  font-weight: regular;
  padding-left: 2px;
`
export const BarLimit = styled.View`
  width: 80%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;
`
export const ContainerDropDown = styled.View`
  margin-bottom: 5px;
  margin-left: 5%;
  margin-right: 5%;
  background-color: #d9d9d9;
  border-radius: 8px;
  padding: 0;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.3;
  shadow-radius: 3px;  
`;

export const pickerSelectStyles = {
  inputIOS: {
    fontSize: 17,
    padding: 16,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    backgroundColor: '#d9d9d9',
  },
  inputAndroid: {
    fontSize: 17,
    padding: 16,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    backgroundColor: '#d9d9d9',
  },
};

export const ArrowDown = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.purple};
  position: absolute;
  right: 10px;
  top: 15px;
`;

export const DescriptionText = styled.Text`
  padding: 14px 30px;
  font-size: 18px;
  text-align: center-left;
  color: ${({ theme }) => theme.colors.darkGray};
`
export const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 10%;
  margin-left: 15%;
  margin-right: 15%;
  align-items: center;
  justify-content: center;
  align-self: center;
  gap: 20px;
`
export const AddButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.darkPurple};
  border-radius: 50px;
  width: 70%;
  height: 50px;
  justify-content: center;
  align-items: center;
  shadow-elevation: 5px;
  shadow-color: black;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
`
export const AddButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
`

export const ShareButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.darkPurple};
  border-radius: 10px;
  width: 50px; 
  height: 50px;
  justify-content: center;
  align-items: center;
  shadow-color: black;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 5;
`;

export const ShareButtonIcon = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 50px;
  height: 50px;
`