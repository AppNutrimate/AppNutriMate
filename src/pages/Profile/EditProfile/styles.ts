import styled from 'styled-components/native'

export const MainContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`
export const NameContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  gap: 10px;
`

export const FlexContainer = styled.View`
  flex-direction: column;
  width: 80%;
  margin-bottom: 20px;
`

export const NameInput = styled.TextInput`
  width: 100%;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
  padding: 10px;
  border-radius: 30px;
  background-color: #fff;
  font-size: 16px;
  padding-left: 15px;
`

export const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
  padding: 10px;
  border-radius: 30px;
  background-color: #fff;
  font-size: 16px;
  padding-left: 15px;
`

export const InfoTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  align-self: flex-start;
  padding-left: 10px;
`
export const SaveButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.darkPurple};
  min-height: 50px;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  border-radius: 25px;
`
export const EditHeaderContent = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  width: 90%;
  margin-top: 60px;
`

export const EditTitle = styled.Text`
  flex: 1;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.background};
`

export const TextButton = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.background};
  margin: 10px 20px;
`
