import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Weight } from 'src/entitites/Weight';
import { AddWeightButton, ChartContainer, ChartHeader, ChartTitle, TextButton } from './styles';

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

  if (values.length === 0 || labels.length === 0 || values.length !== labels.length) {
    return (
      <View style={{ margin: 20, backgroundColor: '#6161A9', padding: 20, borderRadius: 16 }}>
        <Text style={{ color: '#fff' }}>Sem dados válidos para exibir o gráfico</Text>
      </View>
    );
  }

  return (
    <ChartContainer>
        <ChartHeader>
            <ChartTitle>Peso</ChartTitle>
            <AddWeightButton onPress={() => { console.log("TODO: Modal AddWeight") }}>
                <TextButton>+</TextButton>
            </AddWeightButton>
        </ChartHeader>
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
        height={180}
        bezier
        chartConfig={{
            decimalPlaces: 1,
            color: () => '#ffffff',
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
        />
    </ChartContainer>
  );
};
