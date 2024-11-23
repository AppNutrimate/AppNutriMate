import { Platform } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import styled from 'styled-components/native'

export const InputContainer = styled.View`
  display:flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 51px;
  border: 2px solid ${({ theme }) => theme.colors.darkPurple};
  ${Platform.select({
    ios: `
      shadow-color: rgba(0, 0, 0, 0.25);
      shadow-offset: { width: 0, height: 4 };
      shadow-opacity: 0.25;
      shadow-radius: 4px;
    `,
    android: `
      elevation: 7;
    `,
  })}
  background-color: #FFFFFFE6;
  border-radius: 50px;
  margin: 10px auto;
  padding-left: 10px;
`
export const Subtitle = styled.Text`
  margin-top: -30px;
  margin-bottom: 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.darkGray};
  text-align: center;
`
export const TitleInput = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkGray};
  padding-left: 3px;
  text-align: left;
`

export const Input = styled.TextInput`
  flex: 1;
  width: 90%;
  padding-left: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.darkGray};
`
export const InputMask = styled(TextInputMask)`
  flex: 1;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.darkPurple};
`

export const Background = styled.ImageBackground`
  flex: 1;
`

export const IconContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 5px;
`

export const LogoIcon = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 120px;
`

export const TypeIcon = styled.Image.attrs({
  resizeMode: 'contain'
})`
  margin-top: 50px;
  width: 300px;
`

export const CallIcon = styled.Image.attrs({
  resizeMode: 'contain'
})`
  margin-top: 8px;
  width: 400px;
  margin-bottom: 20px;
`

export const LoginButton = styled.TouchableOpacity`
  background-color: rgba(65, 55, 154, 0.8);
  width: 100%;
  height: 51px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  ${Platform.select({
    ios: `
      shadow-color: rgba(0, 0, 0, 0.25);
      shadow-offset: { width: 0, height: 4 };
      shadow-opacity: 0.25;
      shadow-radius: 4px;
    `,
    android: `
      elevation: 7;
    `,
  })}
`

export const FormHeaderContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 10px;
`

export const FormHeaderTitle = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: #ffffff;
`

export const SignInContainer = styled.View`
  display: flex;
  justify-content: center;
  background-color: rgba(114, 101, 227, 0.9);;
  height: 400px;
  width: 100%;
  align-items: center;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
`

export const ButtonContainer = styled.View`
  flex:1;
  width: 85%;
`
