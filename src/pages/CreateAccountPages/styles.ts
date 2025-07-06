import styled from "styled-components/native";
import * as Animatable from 'react-native-animatable';

interface FormInputProps {
  isFocused: boolean;
}

export const MainContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 40px 24px;
  justify-content: center;
  align-items: center;
`;

export const AnimatedSlideContainer = Animatable.createAnimatableComponent(styled.View`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
  `);

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  margin-top: -120px;
  width: 700px;
  height: 700px;
`;

export const ContainerPhrases = styled.View`
  margin-top: -180px;
  align-items: center;
  justify-content: center;
`;

export const Phrase = styled.Text`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  font-weight: bold;
  line-height: 32px;
`;

export const CallToAction = styled.Text`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #ffffff;
`;

export const SkipButton = Animatable.createAnimatableComponent(styled.TouchableOpacity`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.purple};
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.3;
  shadow-radius: 2px;  
`);

export const SkipAllButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const SkipAllText = styled.Text`
  color: #333;
  font-size: 16px;
`;

export const FormLabel = styled.Text`
  font-size: 28px;
  color: #333;
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 8px;
`;

export const FormInput = styled.TextInput<FormInputProps>`
  width: 100%;
  height: 50px;
  background-color:rgba(245, 245, 245, 0.71);
  border-radius: 7px;
  padding: 0 16px;
  font-size: 18px;
  color: #333;
  margin-bottom: 24px;
  border-width: ${({ isFocused }) => (isFocused ? '2px' : '1px')};
  border-color: ${({ isFocused, theme }) => (isFocused ? theme.colors.purple : '#ccc')};
`;

export const ErrorMessageContainer = styled.View`
  width: 100%;
  align-items: flex-end;
  height: 24px;
  margin-top: -16px;
`;
export const ErrorMessage = styled.Text`
  font-size: 16px;
  color: red;
`;

export const ContainerButtons = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const PrevButton = styled.TouchableOpacity`
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const NextButton = styled.TouchableOpacity`
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const LArrowIcon = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 36px;
  height: 36px;
`;

export const RArrowIcon = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 36px;
  height: 36px;
  transform: rotate(180deg);
`;

export const TextButton = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
`;