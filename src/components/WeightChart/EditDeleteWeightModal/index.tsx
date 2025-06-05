import React, { useState, useEffect } from 'react';
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

interface EditDeleteWeightModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (form: WeightForm) => void;
  onDelete: () => void;
  initialData?: WeightForm;
}

export const EditDeleteWeightModal: React.FC<EditDeleteWeightModalProps> = ({
  isVisible,
  onClose,
  onSave,
  onDelete,
  initialData,
}) => {
  const formatDateToSave = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [weightForm, setWeightForm] = useState<WeightForm>({
    value: '0',
    measuredAt: new Date()
  });

  useEffect(() => {
    if (initialData) {
      setWeightForm(initialData);
    }
  }, [initialData]);

  const formatDateToDisplay = (date: Date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const handleConfirmDate = (date: Date) => {
    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0);
    setWeightForm({ ...weightForm, measuredAt: formattedDate });
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
    onClose();
    setWeightForm({ value: '0', measuredAt: new Date() });
    setErrorMessage('');
  };

  const handleDelete = () => {
    onDelete();
    onClose();
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
        <ModalLabel>Edit Your Weight:</ModalLabel>
        <ModalInput
          placeholder="You're doing a great job..."
          keyboardType="decimal-pad"
          value={weightForm.value === '0' ? '' : weightForm.value.toString()}
          onChangeText={handleChangeValue}
        />

        <ModalLabel style={{ marginTop: 10, fontSize: 20 }}>Measurement Date:</ModalLabel>
        <TouchableOpacity onPress={toggleDatePicker}>
          <ModalInput
            value={formatDateToDisplay(new Date(weightForm.measuredAt))}
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

      <ButtonContainer style={{ gap: 15 }}>
        <ActionButton onPress={handleDelete} style={{ backgroundColor: 'orange' }}>
          <ActionButtonText style={{ color: '#fff' }}>Delete Weight</ActionButtonText>
        </ActionButton>
        <ActionButton onPress={handleSave}>
          <ActionButtonText>Save Changes</ActionButtonText>
        </ActionButton>
      </ButtonContainer>
    </StandardModal>
  );
};
