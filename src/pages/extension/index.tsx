import { Tabs,Container, Divider, Card } from '@mantine/core'
import React from 'react'
import classes from './index.module.css'
import EChart from '@/components/EChart/EChart'
import { EChartsOption } from 'echarts/types/dist/echarts'
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart'
import TotalCurrencyLineChart from '@/components/Report/TotalCurrencyLineChart'
const ExtensionsPage = () => {
  return (
    <>
      <TotalCategoryPieChart/>
      <TotalCurrencyLineChart/>
    </>
  )
}

export default ExtensionsPage