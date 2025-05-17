import React, { useEffect, useState } from 'react'
import StandardModal from '../StandardModal'
import { ArrowDown, Container, FlexContainer, Label, MinutesInput, ModalTitle, pickerSelectStyles, RowContainer, TitleInput } from './styles'
import sportService from 'src/services/sportService'
import RNPickerSelect from 'react-native-picker-select'
import { View } from 'react-native'

interface AddWorkoutModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddWorkoutModal = ({ isOpen, onClose }: AddWorkoutModalProps) => {
  const [selectedSport, setSelectedSport] = useState<string>('')
  const [dropdownItems, setDropdownItems] = useState<{ label: string; value: string; key: string }[]>([])

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await sportService.getSports()
        const data = response?.data ?? []
        setDropdownItems(
          data.map((sport) => ({
            label: sport.title,
            value: sport.id,
            key: sport.id,
          })).sort((a, b) => a.label.localeCompare(b.label))
        )
      } catch (error) {
        console.error('Erro ao buscar esportes:', error)
      }
    }
    if (isOpen) fetchSports()
  }, [isOpen])

  const handleOnClose = () => {
    setSelectedSport('')
    onClose()
  }

  return (
    <StandardModal isOpen={isOpen} onClose={handleOnClose}>
      <Container>
        <ModalTitle>Registro de Treino</ModalTitle>
        <FlexContainer>
          <Label>Identifique o Treino:</Label>
          <TitleInput placeholder='E aí, como foi?'/>
        </FlexContainer>
        <RowContainer>
          <FlexContainer>          
            <Label>Esporte:</Label>
            <View>
            <RNPickerSelect
                onValueChange={(value) => setSelectedSport(value)}
                value={selectedSport}
                placeholder={{ label: 'Treino do dia', value: '' }}
                items={dropdownItems}
                style={pickerSelectStyles}
                Icon={() => {
                  return (
                    <ArrowDown>▼</ArrowDown>
                  );
                }}
                />
              </View>
          </FlexContainer>
          <FlexContainer>
            <Label>Duração:</Label>
            <MinutesInput
              placeholder='Em minutos'
            />
          </FlexContainer>
        </RowContainer>
      </Container>
    </StandardModal>
  )
}

export default AddWorkoutModal