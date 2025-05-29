import { EChartsOption, LineSeriesOption } from 'echarts';

export const generateCifPriceBySupplierOption = (data: any[]): EChartsOption => {
  if (!data?.length) return {};

  // 1. Unique sorted dates (chuẩn hóa bằng toISOString)
  const dateSet = new Set<string>();
  data?.forEach(({ effective_from }) => {
    const iso = new Date(effective_from).toISOString();
    dateSet.add(iso);
  });
  const sortedDates = Array.from(dateSet)
    .map((d) => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime())
    .map((d) => d.toISOString());

  // xAxis hiển thị ở dạng ngày người dùng đọc được
  const xAxisData = sortedDates.map((d) => new Date(d).toLocaleDateString('cs-CZ'));

  // 2. Group by supplierId, dùng ISO làm key
  const bySupplier: Record<string, Record<string, number>> = {};
  data?.forEach(({ supplier_k2_id, cifPrice, effective_from }) => {
    const iso = new Date(effective_from).toISOString();
    if (!bySupplier[supplier_k2_id]) {
      bySupplier[supplier_k2_id] = {};
    }
    bySupplier[supplier_k2_id][iso] = cifPrice;
  });

  // 3. List of suppliers
  const suppliers = Array.from(new Set(data?.map((d) => d.supplier_k2_id)));

  // 4. Build the series array
  const seriesData: LineSeriesOption[] = suppliers.map((supplierId) => {
    const priceMap = bySupplier[supplierId] || {};

    // Khởi tạo biến lastPrice để giữ giá cuối cùng
    let lastPrice: number | null = null;

    const seriesDataPoints = sortedDates.map((date) => {
      const price = priceMap[date];
      if (price != null) {
        lastPrice = price;
      }
      return lastPrice;
    });

    const first = data?.find((d) => d.supplier_k2_id === supplierId)!;
    const name = first.supplier_name ?? supplierId.toString();

    return {
      name,
      type: 'line',
      smooth: true,
      connectNulls: false,
      data: seriesDataPoints,
    };
  });

  // 5. Legend selected
  const selected = seriesData.reduce(
    (acc, s) => {
      if (typeof s.name === 'string') acc[s.name] = true;
      return acc;
    },
    {} as Record<string, boolean>
  );

  // 6. Final option
  return {
    tooltip: { trigger: 'axis' },
    legend: {
      data: seriesData.map((s) => s.name as string),
      selected,
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    toolbox: { feature: { saveAsImage: {} } },
    xAxis: { type: 'category', boundaryGap: false, data: xAxisData },
    yAxis: { type: 'value', name: 'CIF' },
    series: seriesData,
  };
};
