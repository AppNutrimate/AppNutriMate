import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { 
  FormContainer, ModalLabel, ModalInput, 
  ErrorMessageContainer, ErrorMessage, 
  ButtonContainer, ActionButton, ActionButtonText 
} from '../styles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import StandardModal from 'src/components/StandardModal';

interface WeightForm {
  value: string;
  measuredAt: Date;
}

interface TrackWeightModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (form: WeightForm) => void;
}

export const TrackWeightModal: React.FC<TrackWeightModalProps> = ({
  isVisible,
  onClose,
  onSave,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [weightForm, setWeightForm] = useState<WeightForm>({
    value: '0',
    measuredAt: new Date(),
  });

  const formatDateToDisplay = (isoDate: string) => {
    if (!isoDate) return '';
    const datePart = isoDate.split('T')[0];
    const [year, month, day] = datePart.split('-');
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  };

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const handleConfirmDate = (date: Date) => {
    setWeightForm({ ...weightForm, measuredAt: date });
    setIsDatePickerVisible(false);
  };

  const handleSave = () => {
    if (!weightForm.value || weightForm.value === '0' || isNaN(parseFloat(weightForm.value)) || parseFloat(weightForm.value) > 999) {
      setErrorMessage('Por favor, insira um valor válido.');
      return;
    }
    if (!weightForm.measuredAt) {
      setErrorMessage('Por favor, insira uma data válida.');
      return;
    }
    onSave(weightForm);
    setWeightForm({ value: '0', measuredAt: new Date() });
    setErrorMessage('');
  };

  const handleChangeValue = (text: string) => {
    let formatted = text.replace(',', '.').replace(/[^0-9.]/g, '');
  
    const parts = formatted.split('.');
  
    if (parts.length > 2) {
      formatted = parts[0] + '.' + parts[1];
    }
  
    if (parts[1]?.length > 3) {
      formatted = `${parts[0]}.${parts[1].slice(0, 3)}`;
    }

    setWeightForm((prev) => ({ ...prev, value: formatted }));
  };  

  return (
    <StandardModal isOpen={isVisible} onClose={onClose}>
      <FormContainer>
        <ModalLabel>Track Your Weight:</ModalLabel>
        <ModalInput
          placeholder="You're doing a great job..."
          keyboardType="decimal-pad"
          value={weightForm.value === '0' ? '' : weightForm.value.toString()}
          onChangeText={handleChangeValue}
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
        <ActionButton onPress={handleSave}>
          <ActionButtonText>Save Weight</ActionButtonText>
        </ActionButton>
      </ButtonContainer>
    </StandardModal>
  );
};
