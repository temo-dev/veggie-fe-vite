import EChart from '@/components/EChart/EChart';
import { useHistoryCifPriceProduct } from '@/services/react-query/report/use-get-history-cif-by-id';
import { useAppSelector } from '@/store';
import { generateCifPriceBySupplierOption } from '@/utils/generateHistoryCifPrice';
import { Card} from '@mantine/core';
import { EChartsOption } from 'echarts';
import { useEffect, useState } from 'react';

interface LineProductChartProps {
  productId?: number;
}


const formatNumber = (num: number) => (typeof num === 'number' ? num.toFixed(2) : '-');

const LineChartHistoryCifPrice = (props: LineProductChartProps) => {
  const { productId } = props;
  const { exchange } = useAppSelector((state) => state.product.product);
  const { data } = useHistoryCifPriceProduct(productId || 0);
  const [dataCif, setDataCif] = useState<any[]>([]);

  const switchExchange = (value: number, currency: string) => {
        let price = 0;
        if (value !== null) {
          switch (currency.toLowerCase()) {
            case 'czk':
              price = value / exchange?.value_czk;
              break;
            case 'usd':
              price = value / exchange?.value_usd;
              break;
            case 'eur':
              price = value / exchange?.value_eur;
              break;
            case 'thb':
              price = value / exchange?.value_th;
              break;
            case 'krw':
              price = value / exchange?.value_kr;
              break;
            case 'sek':
              price = value / exchange?.value_sek;
              break;
            default:
              price = value / exchange?.value_czk;
              break;
          }
        }
        return formatNumber(price);
      };

  useEffect(() => {
    if (data?.data) {
      const newData = data?.data?.map((item: any) => {
        return {
          ...item,
          cifPrice:switchExchange(item.cifPrice, item.shipping_currency),
        };
      });
      setDataCif(newData);
    }
  }, [data]);

  const option: EChartsOption = generateCifPriceBySupplierOption(dataCif);
  return (
    <Card shadow="lg" padding="xs" radius="lg" withBorder className="bg-slate-50">
      <EChart options={option} />
    </Card>
  );
};

export default LineChartHistoryCifPrice;

