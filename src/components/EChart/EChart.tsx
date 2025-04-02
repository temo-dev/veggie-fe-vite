import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

interface EChartProps {
  options: EChartsOption; // Kiểu dữ liệu của cấu hình ECharts
  style?: React.CSSProperties; // Kiểu dữ liệu cho style
  data?:any
}

const EChart: React.FC<EChartProps> = ({ options, style = { height: '400px', width: '100%' },data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      // Áp dụng cấu hình options
      chartInstance.setOption(options);

      // Lắng nghe sự kiện thay đổi kích thước
      const handleResize = () => chartInstance.resize();
      window.addEventListener('resize', handleResize);

      chartInstance.on('legendselectchanged', (params) => {
      })

      // Cleanup
      return () => {
        chartInstance.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [options]);

  return <div ref={chartRef} style={style} />;
};

export default EChart;
