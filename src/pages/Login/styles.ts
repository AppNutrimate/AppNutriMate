import styled from 'styled-components/native'

export const Background = styled.ImageBackground`
  flex: 1;
`

export const IconContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 80px;
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

export const ButtonContainer = styled.View`
  flex: 1;
  align-items: center;
`
