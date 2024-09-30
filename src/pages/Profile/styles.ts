import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`
export const ProfileImage = styled.Image.attrs({ resize: 'cover' })`
  width: 150px;
  height: 150px;
  border-radius: 100px;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.purple};
`
export const ProfileName = styled.Text`
  font-size: 26px;
  color: ${({ theme }) => theme.colors.purple};
  font-weight: bold;
  margin-top: 20px;
`
export const ContainerShaded = styled.View`
  background-color: rgba(0, 0, 0, 0.05);
  flex: 1;
  justify-content: center;
  width: 80%;
  max-height: 350px;
  border-radius: 50px;
  margin-top: 20px;
  margin-bottom: 80px;
`
export const ContainerInfo = styled.View`
  padding-bottom: 30px;
`
export const UserDetail = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 25px;
`

export const UserDetailTitle = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 16px;
`
export const UserDetailValue = styled.Text`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 14px;
`
