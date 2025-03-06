import styled from 'styled-components/native'
import { type MealCardProps } from '.'

export const Container = styled.View<Partial<MealCardProps>>`
  align-items: center;
  justify-content: center;
  margin: 0 20px
    ${(props) => {
    // se for o ultimo item adiciona a altura da navbar ao margin-bottom
    return props.isLast ?? false ? 60 + 20 : 20
  }}px
    20px;
`
export const Card = styled.View<Partial<MealCardProps>>`
  display: flex;
  flex-direction: row;
  height: ${(props) => props.height}px;
  width: 95%;
  border-color: ${({ theme }) => theme.colors.lightGray};
  border-width: 2px;
  border-radius: 20px;
  padding-bottom: 3px;
  padding-top: 3px;
`
export const MealPhoto = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 90px; // Ajusta a largura para compensar a margem
  height: 90px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  margin-left: 10px; // Adiciona margem apenas à esquerda
`
export const TitleCard = styled.Text`
  color: ${({ theme }) => theme.colors.darkGray};
  font-weight: bold;
  font-size: 18px;
  text-transform: capitalize;
`
export const AddButtonIcon = styled.Image.attrs({})`
  padding: 5px;
  width: 40px;
  height: 40px;
`
