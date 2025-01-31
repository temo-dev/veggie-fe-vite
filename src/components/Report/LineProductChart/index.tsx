import EChart from '@/components/EChart/EChart'
import { Card } from '@mantine/core'
import { EChartsOption } from 'echarts'
import React from 'react'


interface LineProductChartProps {
  title: string
}
const LineProductChart = (props:LineProductChartProps) => {
    const {title} = props
    const option:EChartsOption = {
        title: {
            text: `${title}`
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: { 
            data: ['supplier-1', 'supplier-2', 'supplier-3']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July','Aug','Sep','Oct','Nov','Dec']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'supplier-1',
              type: 'line',
              stack: 'Total',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: 'supplier-2',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
          ]
    }
  return (
    <Card shadow="lg" padding="xs" radius="lg" withBorder className='bg-slate-50' >
        <EChart options={option}/>
    </Card>
  )
}

export default LineProductChart