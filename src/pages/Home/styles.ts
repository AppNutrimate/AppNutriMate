import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Greeting = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20%;
  padding: 0 20px;
`

export const Welcome = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.darkGray};
`

export const GreetingUser = styled.Text`
  font-weight: bold;
  font-size: 33px;
`

export const NutritionTip = styled.View`
  padding: 0 20px;
  margin-top: 40px;
`

export const NutritionTipTitle = styled.Text`
  font-weight: bold;
  font-size: 24px;
`

export const NutritionTipContent = styled.Text`
  font-weight: medium;
  font-size: 18px;
  color: ${(props) => props.theme.colors.darkGray};
  line-height: 25px;
  padding-top: 10px;
`
export const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  border-color: ${(props) => props.theme.colors.purple};
  border-width: 3px;
`