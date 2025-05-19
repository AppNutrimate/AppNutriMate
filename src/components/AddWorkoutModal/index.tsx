import React, { useEffect, useState } from 'react'
import StandardModal from '../StandardModal'
import { AddButton, AddButtonText, ArrowDown, Container, FlexContainer, Label, MinutesInput, ModalTitle, pickerSelectStyles, RowContainer, TitleInput } from './styles'
import sportService from 'src/services/sportService'
import RNPickerSelect from 'react-native-picker-select'
import { View } from 'react-native'
import { CreateWorkoutDTO, Workout } from 'src/entitites/Workout'
import DefaultAlert from '../common/DefaultAlert'
import AsyncStorage from '@react-native-async-storage/async-storage'
import workoutService from 'src/services/workoutService'

interface AddWorkoutModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddWorkoutModal = ({ isOpen, onClose }: AddWorkoutModalProps) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState(true)
  const [selectedSport, setSelectedSport] = useState<string>('')
  const [dropdownItems, setDropdownItems] = useState<{ label: string; value: string; key: string }[]>([])
  const [workoutForm, setWorkoutForm] = useState<CreateWorkoutDTO>(
    {
      name: '' ,
      date: new Date().toISOString(),
      durationInMin: 0,
      caloriesBurned: 10,
      userId: '',
      sportId: '',
    }
  )

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

  const handleAddWorkout = async () => {
    if (!workoutForm.name || !workoutForm.durationInMin || !selectedSport) {
      setAlertMessage('Preencha todos os campos obrigatórios.')
      setAlertType(false)
      setIsAlertVisible(true)
      return
    }

    if (workoutForm.durationInMin <= 0 || workoutForm.durationInMin >= 1440) {
      setAlertMessage('A duração não está válida.')
      setAlertType(false)
      setIsAlertVisible(true)
      return
    }

    try {
      const userId = await AsyncStorage.getItem('userId')
      if (!userId) {
        setAlertMessage('Usuário não encontrado.')
        setAlertType(false)
        setIsAlertVisible(true)
        return
      }

      const workoutData = {
        ...workoutForm,
        sportId: selectedSport,
        userId: userId,
      }

      console.log(workoutData)
      await workoutService.addWorkout(workoutData)
      setAlertMessage('Treino registrado com sucesso!')
      setAlertType(true)
      setIsAlertVisible(true)
      handleCleanForm()
    } catch (error) {
      
    }
  }

  const handleOnClose = () => {
    setSelectedSport('')
    handleCleanForm()
    setIsAlertVisible(false)
    setAlertMessage('')
    setAlertType(true)
    onClose()
  }

  const handleCleanForm = () => {
    setWorkoutForm({
      name: '',
      date: new Date().toISOString(),
      durationInMin: 0,
      caloriesBurned: 0,
      userId: '' ,
      sportId: '',
    })
  }

  return (
    <StandardModal isOpen={isOpen} onClose={handleOnClose}>
      <DefaultAlert
        isOpen={isAlertVisible}
        isSuccess={alertType}
        secondText={alertMessage}
        onClose={()=>setIsAlertVisible(false)}
      />
      <Container>
        <ModalTitle>Registro de Treino</ModalTitle>
        <FlexContainer>
          <Label>Identifique o Treino:</Label>
          <TitleInput
            placeholder='E aí, como foi?'
            value={workoutForm.name}
            onChangeText={(text) => setWorkoutForm((prev) => ({ ...prev, name: text }))}/>
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
              keyboardType='numeric'
              maxLength={3}
              value={workoutForm.durationInMin?.toString()}
              onChangeText={(text) => setWorkoutForm((prev) => ({ ...prev, durationInMin: Number(text) }))}
            />
          </FlexContainer>
        </RowContainer>
      </Container>
      <AddButton onPress={handleAddWorkout}>        
        <AddButtonText>Registrar Treino</AddButtonText>
      </AddButton>
    </StandardModal>
  )
}

export default AddWorkoutModal