import React, { useState } from 'react';
import { Dimensions, TouchableWithoutFeedback, View, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Weight } from 'src/entitites/Weight';
import { AddWeightButton, ChartContainer, ChartHeader, ChartTitle, TextButton } from './styles';
import { Circle } from 'react-native-svg';
import { ToolTip } from './ToolTip';
import weightService from 'src/services/weightService';
import { TrackWeightModal } from './TrackWeightModal';
import { EditDeleteWeightModal } from './EditDeleteWeightModal';

interface WeightChartProps {
  data: Weight[];
  userId?: string | null;
}

interface NewWeightForm {
  value: string;
  measuredAt: Date;
}

const screenWidth = Dimensions.get('window').width;

export const WeightChart = ({ data, userId }: WeightChartProps) => {
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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState<Weight | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, value: 0, visible: false });
  const [errorMessage, setErrorMessage] = useState('');
  const [weightForm, setWeightForm] = useState<NewWeightForm>({
    value: '0',
    measuredAt: new Date(),
  });

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

  const handleUpdateWeight = async (weightId: string, value: number, measuredAt: Date) => {
    if (!userId) return;

    try {
      await weightService.updateWeight(userId, weightId, value, measuredAt);
      Alert.alert('Peso atualizado com sucesso');
    } catch (error) {
      console.error('Error updating weight:', error);
      setErrorMessage('Erro ao atualizar peso. Tente novamente.');
    }
  };

  const handleDeleteWeight = async (weightId: string) => {
    if (!userId) return;

    try {
      await weightService.removeWeight(userId, weightId);
      Alert.alert('Peso atualizado com sucesso');
      handleCloseModal();
    } catch (error) {
      console.error('Error updating weight:', error);
      setErrorMessage('Erro ao atualizar peso. Tente novamente.');
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setErrorMessage('');
    setWeightForm({ value: '0', measuredAt: new Date() });
  }


  const handleCirclePress = (x: number, y: number, value: number) => {
    setTooltipPos({ x, y, value, visible: true });

    setTimeout(() => {
      setTooltipPos({ x: 0, y: 0, value: 0, visible: false });
    }, 4000);
  };

  return (
    <>    
      <TrackWeightModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSave={handleAddWeight}
      />

      <EditDeleteWeightModal
        isVisible={isEditModalVisible}
        onClose={handleCloseModal}
        onSave={(form) => {
          if (selectedWeight) {
            handleUpdateWeight(selectedWeight.id, parseFloat(form.value), new Date(form.measuredAt));
          }
        }}
        onDelete={() => {
          if (selectedWeight) {
            handleDeleteWeight(selectedWeight.id);
          }
        }}
        initialData={
          selectedWeight
            ? { 
                ...selectedWeight, 
                value: String(selectedWeight.value), 
                measuredAt: new Date(selectedWeight.measuredAt) 
              }
            : undefined
        }
      />

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
              height={200}
              fromZero={true}
              bezier
              chartConfig={{
                decimalPlaces: 1,
                color: () => '#ffffff',
                labelColor: () => '#ffffff',
                propsForLabels: {
                  fontSize: '10',
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
                      handleCirclePress(x, y, values[index]);
                    }}
                    onLongPress={() => {
                      setSelectedWeight(sortedData[index]);
                      setIsEditModalVisible(true);
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
