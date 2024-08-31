import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const ContainerTabRecipes = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`

export const TabRecipes = styled.View`
  display: flex; background-color: #D9D9D9; flex-direction: row; width: 85%; border-radius: 20px;
`

interface TabButtonProps {
  active: boolean
}

export const TabButton = styled.TouchableOpacity<TabButtonProps>`
  background-color: ${(props) => props.active ? props.theme.colors.purple : props.theme.colors.lightGray};
  width: 50%;
  height: 54px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`
export const TabButtonText = styled.Text<TabButtonProps>`
  font-size: 20px;
  color:  ${(props) => {
    return props.active ? '#EDF1F7' : '#777777'
  }}
`
