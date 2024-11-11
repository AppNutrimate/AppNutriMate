import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightBackground};
`

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.purple};
  width: 100%;
  height: 15%;
  justify-content: center;
  align-items: center;
`
export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  width: 90%;
`

export const ProfileTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-top: 60px;
  color: ${({ theme }) => theme.colors.background};
`

export const ProfileImage = styled.Image.attrs({ resize: 'cover' })`
  width: 115px;
  height: 115px;
  border-radius: 100px;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.purple};
  margin-top: -50px;
`
export const ProfileName = styled.Text`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.purple};
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: -10px;
`
export const EditIcon = styled.Image.attrs({resize: 'contain'})`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`
export const ArrowBackButton = styled.Image.attrs({resize: 'contain'})`
width: 20px;
height: 20px;
margin-right: 10px;
`
export const ContainerShaded = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  justify-content: center;
  width: 75%;
  max-height: 240px;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 10px;
`
export const ContainerInfo = styled.View`
  margin-top: 10px;
  margin-bottom: -20px;
  flex: 1;
  justify-content: center;
`
export const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 14px;
`
export const BarLimit = styled.View`
  width: 90%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  align-self: center;
  `

export const ContainerTitle = styled.View`
  flex-direction: row;
  margin-left: 20px;
  margin-top: -30px;
  margin-bottom: 10px;
  `

export const UserDetail = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 17px;
`
export const UserDetailTitle = styled.Text`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  font-size: 15px;
`
export const UserDetailValue = styled.Text`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 14px;
`
