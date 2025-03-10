import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const IndicatorContainer = styled.View`
  display: flex;
  margin: -1px 10px;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`
export const Section = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
`
export const SideTitle = styled.Text`
  font-weight: 500;
  font-size: 24px;
`
export const SideSubTitle = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.darkGray};
`
export const CenterTitle = styled.Text`
  font-weight: 700;
  font-size: 32px;
`
export const CenterSubTitle = styled.Text`
  font-weight: 500;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.darkGray};
`
export const FormContainer = styled.View`
  margin-top: -10px;
`

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`

export const ModalLabel = styled.Text`
  font-size: 26px;
  margin-bottom: 8px;
  font-weight: bold;
  margin-left: 5px;
`
export const ModalInput = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: #ccc;
  padding: 8px;
  border-radius: 8px;
  font-size: 18px;
  margin-bottom: -5px;
`
export const ActionButton = styled.Pressable`
  flex: 1;
  background-color: #6161a9;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin-top: 5px;
`

export const ActionButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`

export const PresetImagesContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 10px;
`
export const PresetImageCard = styled.Pressable`
  width: 30%;
  aspect-ratio: 1;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.colors.darkPurple};
  padding: 3px;
  margin-top: 5px;
`
export const PresetImage = styled.Image`
  width: 90%;
  aspect-ratio: 1;
`