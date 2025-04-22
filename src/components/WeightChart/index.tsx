import React, { useState } from 'react';
import { Dimensions, TouchableWithoutFeedback, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Weight } from 'src/entitites/Weight';
import { AddWeightButton, ChartContainer, ChartHeader, ChartTitle, NoDataContainer, NoDataText, TextButton } from './styles';
import StandardModal from '../StandardModal';
import { Circle } from 'react-native-svg';
import { ToolTip } from './ToolTip';

interface WeightChartProps {
  data: Weight[];
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

  return (
    <>    
      <StandardModal isOpen={isModalVisible} onClose={() => {setIsModalVisible(false)}}>
        {/* TODO: Forms para adicionar peso */}
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
