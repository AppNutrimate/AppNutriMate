import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FormContainer, ModalLabel, ModalInput, ErrorMessageContainer, ErrorMessage, ButtonContainer, ActionButton, ActionButtonText } from '../styles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import StandardModal from 'src/components/StandardModal';

interface WeightForm {
  value: string;
  measuredAt: Date;
}

interface TrackWeightModalProps {
  isVisible: boolean;
  onClose: () => void;
  weightForm: WeightForm;
  setWeightForm: (form: WeightForm) => void;
  handleAddWeight: (form: WeightForm) => void;
  errorMessage?: string;
}

export const TrackWeightModal: React.FC<TrackWeightModalProps> = ({
  isVisible,
  onClose,
  weightForm,
  setWeightForm,
  handleAddWeight,
  errorMessage,
}) => {
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    
    const formatDateToDisplay = (isoDate: string) => {
        if (!isoDate) return ''
        const datePart = isoDate.split('T')[0]
        const [year, month, day] = datePart.split('-')
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
    }

    const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
    };

    const handleConfirmDate = (date: Date) => {
        setWeightForm({ ...weightForm, measuredAt: date });
        setIsDatePickerVisible(false);
    };

    
  return (
    <StandardModal isOpen={isVisible} onClose={onClose}>
      <FormContainer>
        <ModalLabel>Track Your Weight:</ModalLabel>
        <ModalInput
          placeholder="You're doing a great job..."
          keyboardType="decimal-pad"
          value={weightForm.value === '0' ? '' : weightForm.value.toString()}
          onChangeText={(text) => {
            let formatted = text.replace(',', '.').replace(/[^0-9.]/g, '');
            const parts = formatted.split('.');
            if (parts.length > 2) return;
        
            if (parts.length === 2 && parts[1].length > 3) {
              parts[1] = parts[1].slice(0, 3);
              formatted = `${parts[0]}.${parts[1]}`;
            }
        
            setWeightForm({ ...weightForm, value: formatted });
          }}
        />
        <ModalLabel style={{ marginTop: 10, fontSize: 20 }}>Measurement Date:</ModalLabel>
        <TouchableOpacity onPress={toggleDatePicker}>
          <ModalInput
            value={formatDateToDisplay(weightForm.measuredAt.toISOString())}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={toggleDatePicker}
        />
      </FormContainer>
      <ErrorMessageContainer>
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      </ErrorMessageContainer>
      <ButtonContainer>
        <ActionButton onPress={() => handleAddWeight(weightForm)}>
          <ActionButtonText>Save Weight</ActionButtonText>
        </ActionButton>
      </ButtonContainer>
    </StandardModal>
  );
};
