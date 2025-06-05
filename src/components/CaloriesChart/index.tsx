import { BarChart } from 'react-native-chart-kit';
import { Dimensions, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Workout } from 'src/entitites/Workout';

const screenWidth = Dimensions.get('window').width;

interface CaloriesChartProps {
  workouts: Workout[];
}

const CaloriesChart = ({ workouts }: CaloriesChartProps) => {
    const formatDateLocal = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.getFullYear() + '-' +
            String(date.getMonth() + 1).padStart(2, '0') + '-' +
            String(date.getDate()).padStart(2, '0');
    };

    const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        d.setHours(0, 0, 0, 0);
        return d;
    });

    const dayLabels = last7Days.map(date => {
        const dayIndex = date.getDay();
        const labels = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
        return labels[dayIndex];
    });

    const last7DaysFormatted = last7Days.map(date => 
        date.getFullYear() + '-' +
        String(date.getMonth() + 1).padStart(2, '0') + '-' +
        String(date.getDate()).padStart(2, '0')
    );

    const dayCalories = last7DaysFormatted.map(dateStr => {
        return workouts
            .filter(w => formatDateLocal(w.date) === dateStr)
            .reduce((sum, w) => sum + w.caloriesBurned, 0);
    });

    const data = {
        labels: dayLabels,
        datasets: [
            {
                data: dayCalories,
            },
        ],
    };

    return(
        <View>
            <Text
                style={{
                    alignSelf: 'flex-end',
                    marginRight: 25,
                    marginTop: 15,
                    color: '#b7b7b7',
                    fontSize: 14,
                    fontWeight: 'bold',
                }}>
                    Últimos 7 Dias
            </Text>
            <BarChart
                data={data}
                width={screenWidth - 40}
                height={180}
                fromZero={true}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                    decimalPlaces: 0,
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    color: () => 'rgba(184, 233, 3, 1)',
                    fillShadowGradientFromOpacity: 1,
                    fillShadowGradientToOpacity: 1,
                    fillShadowGradientFrom: '#b6e801',
                    fillShadowGradientTo: '#b6e801',
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    barPercentage: 0.9,
                    propsForBackgroundLines: { strokeWidth: 0 },
                    propsForLabels: {
                        fontSize: '10',
                        fontWeight: 'bold',
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                showBarTops={false}        
                withInnerLines={false}     
                withHorizontalLabels={true}
            />
        </View>
    )
}
export default CaloriesChart;