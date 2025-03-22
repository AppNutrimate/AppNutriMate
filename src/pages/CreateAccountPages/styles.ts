import styled from "styled-components/native";
import * as Animatable from 'react-native-animatable';

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
  width: 260px;
  height: 260px;
`;

export const ContainerPhrases = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Phrase = styled.Text`
  font-size: 32px;
  color: #333;
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
