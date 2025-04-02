import EChart from '@/components/EChart/EChart';
import { useFindDateExChange } from '@/services/currency/use-get-date-ex-change';
import { useAppSelector } from '@/store';
import { generateOption } from '@/utils/generateOptionsLine';
import { Card, Group, Select, Text } from '@mantine/core';
import { IconCalendarFilled, IconReceiptBitcoin } from '@tabler/icons-react';
import { EChartsOption } from 'echarts';
import { useState } from 'react';

interface LineProductChartProps {}
const LineExChangeChart = (props: LineProductChartProps) => {
  const { exchange: exchangeState } = useAppSelector((state) => state.product.product);
  const [currency, setCurrency] = useState(exchangeState?.base_currency || 'czk');
  const [duringDay, setDuringDay] = useState('7');
  const { data } = useFindDateExChange(duringDay, currency);

  const option: EChartsOption = generateOption(data?.data ? data?.data : [], ['USD', 'EUR']);
  return (
    <Card shadow="lg" padding="xs" radius="lg" withBorder className="bg-slate-50">
      <Group>
        <Text fw={700} className="mb-2">
          Theo Dõi Tỉ Giá
        </Text>
        <Select
          data={[
            { value: '7', label: '7 ngày' },
            { value: '10', label: '10 ngày' },
            { value: '14', label: '14 ngày' },
          ]}
          value={duringDay}
          className="my-2"
          placeholder="7 ngày"
          onChange={(_value, option) => setDuringDay(option.value)}
          leftSection={<IconReceiptBitcoin size={20} color="orange" />}
          w={100}
          size="xs"
        />
        <Select
          data={[
            { value: 'czk', label: 'CZK' },
            { value: 'usd', label: 'USD' },
            { value: 'eur', label: 'EUR' },
            { value: 'thb', label: 'THB' },
          ]}
          value={currency}
          className="my-2"
          placeholder="CZK"
          onChange={(_value, option) => setCurrency(option.value)}
          leftSection={<IconCalendarFilled size={20} color="orange" />}
          w={100}
          size="xs"
        />
      </Group>
      <EChart options={option} />
    </Card>
  );
};

export default LineExChangeChart;
