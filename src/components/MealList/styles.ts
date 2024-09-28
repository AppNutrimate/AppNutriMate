import styled from 'styled-components/native'
import { type MealListProps } from '.'

export const Container = styled.View<Partial<MealListProps>>`
  align-items: center;
  justify-content: center;
  margin: 0 20px
    ${(props) => {
      return props.isLast ?? false ? 10 + 20 : 20
    }}px
    20px;
`
export const ListTitle = styled.Text`
  color: ${({ theme }) => theme.colors.darkGray};
  font-weight: bold;
  font-size: 24px;
`

export const Card = styled.View<Partial<MealListProps>>`
  display: flex;
  flex-direction: row;
  height: ${(props) => props.height}px;
  width: 95%;
  border-color: ${({ theme }) => theme.colors.lightGray};
  border-width: 2px;
  border-radius: 25px;
  padding-bottom: 3px;
  padding-top: 3px;
`

export const TitleCard = styled.Text`
  color: ${({ theme }) => theme.colors.darkGray};
  font-weight: bold;
  font-size: 21px;
  text-transform: capitalize;
`
export const AddButtonIcon = styled.Image.attrs({})`
  width: 30px;
  height: 30px;
`
