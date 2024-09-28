import styled from 'styled-components/native'
import { type RecipeCardProps } from '.'

export const Container = styled.View<Partial<RecipeCardProps>>`
  align-items: center;
  justify-content: center;
  margin: 0 20px ${(props) => (props.isLast ?? false ? 60 + 20 : 20)}px 20px;
  position: relative;
`

export const Card = styled.View<Partial<RecipeCardProps>>`
  display: flex;
  flex-direction: row;
  height: ${(props) => props.height}px;
  width: 95%;
  border-color: ${({ theme }) => theme.colors.lightGray};
  border-width: 2px;
  border-radius: 20px;
  position: relative;
  z-index: 1;
`

export const MealPhoto = styled.Image.attrs({
  resizeMode: 'cover'
})`
  width: 100px;
  height: 80%;
  border-radius: 20px;
  margin-top: 10px;
  margin-left: 10px;
`

export const HamburguerMenu = styled.Image.attrs({})`
  height: 30px;
  width: 30px;
  position: absolute;
  z-index: 10;
`

export const ModalOverlay = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const ModalContent = styled.View`
  position: absolute;
  right: 10px;
  top: 50px;
  width: 150px;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 3.84px rgba(0, 0, 0, 0.55);
`

export const MenuItem = styled.TouchableOpacity`
  padding: 10px 0;
`

export const MenuText = styled.Text`
  color: black;
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
  height: 50px;
  flex-direction: row;
  padding-top: 15px;
  padding-left: 10px;
  gap: 3px;
`
export const MacroIcon = styled.Image.attrs({})`
  height: 15px;
  width: 15px;
  padding-right: 5px;
`
export const MacroNumber = styled.Text`
  font-size: 13px;
`
