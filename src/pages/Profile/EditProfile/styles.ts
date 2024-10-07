import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`
export const Input = styled.TextInput`
  width: 80%;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
  margin-top: 20px;
  padding: 10px;
  border-radius: 30px;
  margin-bottom: 20px;
  background-color: #fff;
  font-size: 16px;
`
