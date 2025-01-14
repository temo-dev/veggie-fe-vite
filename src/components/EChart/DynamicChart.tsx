import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

const femaleData: number[][] = [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], /* dữ liệu đầy đủ */];
const maleData: number[][] = [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], /* dữ liệu đầy đủ */];

function calculateAverage(data: number[][], dim: number) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i][dim];
  }
  return total / data.length;
}

const scatterOption: EChartsOption = {
  xAxis: { scale: true },
  yAxis: { scale: true },
  series: [
    {
      type: 'scatter',
      id: 'female',
      dataGroupId: 'female',
      universalTransition: { enabled: true },
      data: femaleData,
    },
    {
      type: 'scatter',
      id: 'male',
      dataGroupId: 'male',
      universalTransition: { enabled: true },
      data: maleData,
    },
  ],
};

const barOption: EChartsOption = {
  xAxis: { type: 'category', data: ['Female', 'Male'] },
  yAxis: {},
  series: [
    {
      type: 'bar',
      id: 'total',
      data: [
        { value: calculateAverage(maleData, 0), groupId: 'male' },
        { value: calculateAverage(femaleData, 0), groupId: 'female' },
      ],
      universalTransition: { enabled: true },
    },
  ],
};

const DynamicChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      let currentOption = scatterOption;

      const intervalId = setInterval(() => {
        currentOption = currentOption === scatterOption ? barOption : scatterOption;
        myChart.setOption(currentOption, true);
      }, 2000);

      myChart.setOption(currentOption);

      return () => {
        clearInterval(intervalId);
        myChart.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ height: '400px', width: '100%' }} />;
};

export default DynamicChart;
