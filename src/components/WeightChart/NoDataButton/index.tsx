import React, { useState } from "react";
import { AddWeightButton, NoDataContainer, NoDataText, TextButton } from "../styles";
import { TrackWeightModal } from "../TrackWeightModal";
import weightService from "src/services/weightService";
import { Alert } from "react-native";

interface NewWeightForm {
  value: string;
  measuredAt: Date;
}

interface NoDataButtonProps {
  userId?: string | null;
}

export const NoDataButton = ({ userId }:NoDataButtonProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleAddWeightModal = () => {
    setIsModalVisible(!isModalVisible);
  }

  const handleAddWeight = async (newWeightForm: NewWeightForm) => {
    if (!newWeightForm.value || newWeightForm.value === '0') {
      setErrorMessage('Por favor, insira um valor válido.');
      return;
    }
    if (!newWeightForm.measuredAt) {
      setErrorMessage('Por favor, insira uma data válida.');
      return;
    }

    const parsedValue = parseFloat(newWeightForm.value);
  
    if (isNaN(parsedValue) || parsedValue <= 0) {
      setErrorMessage('Por favor, insira um valor numérico válido.');
      return;
    }

    try {
      await weightService.addWeight(
        userId ?? '',
        parsedValue,
        newWeightForm.measuredAt
      );
      Alert.alert('Peso adicionado com sucesso');
      setIsModalVisible(false)
    } catch (error) {
      console.error('Error adding weight:', error);
      setErrorMessage('Erro ao adicionar peso. Tente novamente.');
    }
  }

  return (
      <>
        {isModalVisible && (
          <TrackWeightModal
            isVisible={isModalVisible}
            onClose={toggleAddWeightModal}
            onSave={handleAddWeight}
          />
        )}
        <NoDataContainer onPress={toggleAddWeightModal}>
          <NoDataText>Clique aqui para adicionar seu peso!</NoDataText>
            <AddWeightButton onPress={toggleAddWeightModal}>
              <TextButton>+</TextButton>
            </AddWeightButton>
        </NoDataContainer>
      </>
  );
}