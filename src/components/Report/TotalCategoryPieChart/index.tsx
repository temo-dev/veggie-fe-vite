import EChart from '@/components/EChart/EChart'
import { Card } from '@mantine/core'
import { EChartsOption } from 'echarts/types/dist/echarts';
import React from 'react'

const TotalCategoryPieChart = () => {
  const data = [
    { value: 200, name: 'Dry Foods' },
    { value: 50, name: 'VEG Products' },
    { value: 100, name: 'Snack Foods' },
    { value: 100, name: 'EU Products'},
    { value: 111, name: 'Czech Farms' }
  ];
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const option:EChartsOption = {
    title: {
      text: 'Tổng Mặt Hàng',
      top: '5px',
      textStyle: {
        color: '#333',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '1px',
      left: 'center',
    },
    series: [
      { name:'Mặt Hàng',
        type: 'pie',
        radius: ['30%', '80%'],
        center: ['50%', '48%'],
        // adjust the start and end angle
        startAngle: 0,
        endAngle: 360,
        data: data,
        bottom: '10px',
      },
    ],
    graphic: {
      type: 'text',
      left: 'center',
      top: '44%',
      style: {
        text: `Total: ${total}`,
        align: 'center',
        fill: '#333', // text color
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
  };
  return (
    <Card shadow="lg" padding="xs" radius="lg" withBorder className='bg-slate-50' >
        <EChart options={option} />
    </Card>
  )
}

export default TotalCategoryPieChart