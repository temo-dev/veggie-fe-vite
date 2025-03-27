import EChart from '@/components/EChart/EChart';
import { Card } from '@mantine/core';
import { EChartsOption } from 'echarts/types/dist/echarts';
import { useAppSelector } from '@/store';
import { useReportTotalProduct } from '@/services/react-query/report/use-get-total-product';

const TotalCategoryPieChart = () => {
  const _ = useReportTotalProduct();
  const { reportTotalProduct, totalProduct } = useAppSelector((state) => state.report.report);
  //mock data
  const dataReport = reportTotalProduct.map((report) => {
    return {
      value: Number(report.value), // Ensure value is a number
      name: report.name.toUpperCase(),
    };
  });
  const option: EChartsOption = {
    title: {
      text: `K2 System`,
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
        data: dataReport,
        bottom: '10px',
      },
    ],
    graphic: {
      type: 'text',
      left: 'center',
      top: '44%',
      style: {
        text: `Tổng: ${totalProduct}\n sản phẩm`,
        align: 'center',
        fill: '#333', // text color
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
  };
  return (
    <Card shadow="lg" padding="xs" radius="lg" withBorder className="bg-slate-50">
      <EChart options={option} data={dataReport} />
    </Card>
  );
};

export default TotalCategoryPieChart;
