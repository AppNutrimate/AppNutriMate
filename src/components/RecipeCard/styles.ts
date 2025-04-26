import styled from 'styled-components/native'
import { type RecipeCardProps } from '.'
import Animated from 'react-native-reanimated'

export const Container = styled.View<Partial<RecipeCardProps>>`
  align-items: center;
  justify-content: center;
  margin: 0 20px
    ${(props) => {
    return props.isLast ?? false ? 60 + 20 : 20
  }}px
    20px;
`
export const Card = styled.View<Partial<RecipeCardProps>>`
  display: flex;
  flex-direction: row;
  height: ${(props) => props.height}px;
  width: 95%;
  border-color: ${({ theme }) => theme.colors.lightGray};
  border-width: 2px;
  border-radius: 20px;
`
export const MealPhoto = styled.Image.attrs({
  resizeMode: 'cover'
})`
  width: 120px;
  height: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`

export const TitleCard = styled.Text`
  padding-top: 15px;
  padding-left: 10px;
  color: ${({ theme }) => theme.colors.darkGray};
  font-weight: bold;
  font-size: 16px;
`
export const ContainerMacro = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  flex-direction: row;
  padding-left: 10px;
  gap: 2px;
`

export const MacroIcon = styled.Image.attrs({ resizeMode: 'contain' })`
  height: 20px;
  width: 20px;
`
export const MacroNumber = styled.Text``
