import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Card } from '@mantine/core';
import { useExchangeCurrencyQuery } from '@/services/react-query/currency/use-exchange-currency';

const TotalCurrencyLineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  // Dữ liệu tĩnh
  const rawData = [
    ["Currency", "Date", "Exchange Rate"],
    ["USD", "2023-01-01", 0.04060],
    ["USD", "2023-01-02", 22.12],
    ["USD", "2023-01-03", 22.10],
    ["USD", "2023-01-04", 22.12],
    ["USD", "2023-01-05", 22.10],
    ["USD", "2023-01-06", 22.12],
    ["EUR", "2023-01-01", 0.03965],
    ["EUR", "2023-01-02", 26.12],
    ["EUR", "2023-01-03", 26.10],
    ["EUR", "2023-01-04", 26.12],
    ["EUR", "2023-01-05", 26.10],
    ["EUR", "2023-01-06", 26.12],
    ["BATH", "2023-01-01", 0.01526],
    ["BATH", "2023-01-02", 15.12],
    ["BATH", "2023-01-03", 15.10],
    ["BATH", "2023-01-04", 15.12],
    ["BATH", "2023-01-05", 15.10],
    ["BATH", "2023-01-06", 15.12],
  ];

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);

    // Cấu hình biểu đồ
    const option: echarts.EChartsOption = {
      dataset: [
        {
          id: 'dataset_raw',
          source: rawData,
        },
        {
          id: 'dataset_usd',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [{ dimension: 'Currency', '=': 'USD' }],
            },
          },
        },
        {
          id: 'dataset_eur',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [{ dimension: 'Currency', '=': 'EUR' }],
            },
          },
        },
        {
          id: 'dataset_bath',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [{ dimension: 'Currency', '=': 'BATH' }],
            },
          },
        },
      ],
      title: {
        text: 'Tỷ Giá Tiền Tệ',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        name: 'Date',
      },
      yAxis: {
        type: 'value',
        name: 'Exchange Rate',
      },
      series: [
        {
          type: 'line',
          datasetId: 'dataset_usd',
          name: 'USD',
          encode: {
            x: 'Date',
            y: 'Exchange Rate',
          },
        },
        {
          type: 'line',
          datasetId: 'dataset_eur',
          name: 'EUR',
          encode: {
            x: 'Date',
            y: 'Exchange Rate',
          },
        },
        {
          type: 'line',
          datasetId: 'dataset_bath',
          name: 'BATH',
          encode: {
            x: 'Date',
            y: 'Exchange Rate',
          },
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <Card shadow="lg" padding="xs" radius="lg" withBorder className='bg-slate-50' >
        <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
    </Card>
  )
}

export default TotalCurrencyLineChart;
