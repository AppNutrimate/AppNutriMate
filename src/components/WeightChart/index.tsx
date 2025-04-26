import React, { useState } from 'react';
import { Dimensions, TouchableWithoutFeedback, View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Weight } from 'src/entitites/Weight';
import { ActionButton, ActionButtonText, AddWeightButton, ButtonContainer, ChartContainer, ChartHeader, ChartTitle, ErrorMessage, ErrorMessageContainer, FormContainer, ModalInput, ModalLabel, NoDataContainer, NoDataText, TextButton } from './styles';
import StandardModal from '../StandardModal';
import { Circle } from 'react-native-svg';
import { ToolTip } from './ToolTip';
import DateTimePicker from 'react-native-modal-datetime-picker';

interface WeightChartProps {
  data: Weight[];
}

interface NewWeightForm {
  value: string;
  measuredAt: Date;
}

const screenWidth = Dimensions.get('window').width;

export const WeightChart = ({ data }: WeightChartProps) => {
  const sortedData = [...data].sort((a, b) =>
    new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime()
  );

  const labels = sortedData.map((item) =>
    new Date(item.measuredAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    })
  );

  const values = sortedData
    .map((item) => ({ value: parseFloat(item.value as string), item }))
    .filter(({ value, item }) => {
      const isValid = !isNaN(value) && isFinite(value);
      return isValid;
    })
    .map(({ value }) => value);
  
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState<Weight | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, value: 0, visible: false });
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [weightForm, setWeightForm] = useState<NewWeightForm>({
    value: '0',
    measuredAt: new Date(),
  });


  if (values.length === 0 || labels.length === 0 || values.length !== labels.length) {
    return (
      <NoDataContainer onPress={() => {setIsModalVisible(true)}}>
        <NoDataText>Clique aqui para adicionar seu peso!</NoDataText>
          <AddWeightButton >
            <TextButton>+</TextButton>
          </AddWeightButton>
      </NoDataContainer>
    );
  }

  const handleAddWeight = (newWeightForm: NewWeightForm) => {
    if (!newWeightForm.value || newWeightForm.value === '0') {
      setErrorMessage('Por favor, insira um valor válido.');
      return;
    }
    setIsModalVisible(false);
    handleCloseModal();
  }

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };
  
  const handleConfirmDate = (date: Date) => {
    setWeightForm({ ...weightForm, measuredAt: date });
    setIsDatePickerVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setErrorMessage('');
    setWeightForm({ value: '0', measuredAt: new Date() });
  }

  const formatDateToDisplay = (isoDate: string) => {
    if (!isoDate) return ''
    const datePart = isoDate.split('T')[0]
    const [year, month, day] = datePart.split('-')
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
  }

  return (
    <>    
      <StandardModal
        isOpen={isModalVisible}
        onClose={handleCloseModal}
      >
        <FormContainer>
          <ModalLabel>Track Your Weight:</ModalLabel>
          <ModalInput
            placeholder="You're doing a great jobs..."
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
          <ModalLabel style={{marginTop: 10, fontSize: 20}}>Measurement Date:</ModalLabel>
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
          {errorMessage ? (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          ) : null}
        </ErrorMessageContainer>
        <ButtonContainer>
          <ActionButton
            onPress={() => {
              console.log('Weight added:', weightForm);
              handleAddWeight(weightForm)
            }}
          >
            <ActionButtonText>Save Weight</ActionButtonText>
          </ActionButton>
          </ButtonContainer>  
      </StandardModal>

      <ChartContainer>
        <ChartHeader>
          <ChartTitle>Peso</ChartTitle>
          <AddWeightButton onPress={() => {setIsModalVisible(true)}}>
            <TextButton>+</TextButton>
          </AddWeightButton>
        </ChartHeader>
        <TouchableWithoutFeedback
          onPress={() => {
            setTooltipPos({ x: 0, y: 0, value: 0, visible: false });
          }}
        >
          <View>          
            <LineChart
              data={{
                labels,
                datasets: [
                  {
                    data: values,
                  },
                ],
              }}
              width={screenWidth - 40}
              height={220}
              fromZero={true}
              bezier
              chartConfig={{
                decimalPlaces: 1,
                color: () => '#ffffff',
                labelColor: () => '#ffffff',
                propsForLabels: {
                  fontSize: '12',
                  fontWeight: 'bold',
                },
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: '#fff',
                },
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                propsForBackgroundLines: {
                  strokeWidth: 0,
                },
              }}
              style={{
                borderRadius: 16,
                marginRight: 20,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              renderDotContent={({ x, y, index }) => (
                <React.Fragment key={`circle-tooltip-${index}`}>
                  <Circle
                    cx={x}
                    cy={y}
                    r={6}
                    fill="#fff"
                    onPress={() => {
                      setTooltipPos({ x, y, value: values[index], visible: true });
                    }}
                  />
                  <ToolTip
                    x={x}
                    y={y}
                    value={values[index]}
                    visible={tooltipPos.visible && tooltipPos.x === x}
                  />
                </React.Fragment>
              )}        
            />
          </View>
        </TouchableWithoutFeedback>
      </ChartContainer>
    </>  
  );
};
