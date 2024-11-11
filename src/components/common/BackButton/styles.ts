import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.purple};
  border-radius: 7px;
  margin-top: 50px;
  margin-left: 30px;
`
export const Icon = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 25px;
  height: 25px;
`
