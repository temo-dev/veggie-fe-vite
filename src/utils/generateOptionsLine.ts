import { EChartsOption } from "echarts";

type CurrencyData = {
  base_currency: string;
  value_eur: number;
  value_usd: number;
  value_th: number;
  value_vnd: number;
  value_tw: number;
  value_czk: number;
  value_kr: number;
  value_jp: number;
  created_at: string;
  updated_at: string;
};

export const generateOption = (
  data: CurrencyData[],
  defaultCurrencies: string[]
): EChartsOption => {
  if (data.length === 0) return {};

  const currencyKeys = Object.keys(data[0]).filter((key) =>
    key.startsWith("value_")
  );

  const xAxisData = data
    .map((item) => new Date(item.created_at).toLocaleDateString("cs-CZ"))
    .reverse();

  const series = currencyKeys.map((key) => ({
    name: key.replace("value_", "").toUpperCase(),
    type: "line",
    data: data.map((item) => item[key as keyof CurrencyData]).reverse()
  })) as EChartsOption['series'];

  const legendNames = currencyKeys.map((key) =>
    key.replace("value_", "").toUpperCase()
  );

  const selectedLegend = legendNames.reduce((acc, name) => {
    acc[name] = defaultCurrencies.includes(name);
    return acc;
  }, {} as Record<string, boolean>);

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: legendNames,
      selected: selectedLegend
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
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
      data: xAxisData
    },
    yAxis: {
      type: "value"
    },
    series
  };

  return option;
};
