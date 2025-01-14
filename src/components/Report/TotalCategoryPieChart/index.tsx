import EChart from '@/components/EChart/EChart'
import { Card } from '@mantine/core'
import { EChartsOption } from 'echarts/types/dist/echarts';
import React from 'react'


interface DataChart {
  value: number
  name: string
}

interface PropsInterface {
  data :DataChart[],
  title :string
}

const TotalCategoryPieChart = (props :PropsInterface) => {
  const {title,data} = props
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const option:EChartsOption = {
    title: {
      text: `${title.toUpperCase()}`,
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
      {
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
        text: `Tổng: ${total}\n sản phẩm`,
        align: 'center',
        fill: '#333', // text color
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
  };
  return (
    <Card shadow="lg" padding="xs" radius="lg" withBorder className='bg-slate-50' >
        <EChart options={option} data={data}/>
    </Card>
  )
}

export default TotalCategoryPieChart