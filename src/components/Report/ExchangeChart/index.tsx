import { useFindExChange } from '@/services/currency/use-get-ex-change-today';
import { useAppSelector } from '@/store';
import { Card, Group, Stack, Text, Code, Image, SimpleGrid, Select, Divider } from '@mantine/core';
import { IconCalendarFilled, IconReceiptBitcoin } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

const ExchangeChart = () => {
  const { exchange:exchangeState } = useAppSelector((state) => state.product.product);
  const [exchange, setExChange] = useState<any | null>(null);
  const [valueCurrency, setValueCurrency] = useState<string>(exchangeState?.base_currency || 'czk')
  const { data } = useFindExChange(valueCurrency);
  const now = new Date().toLocaleDateString();

  useEffect(() => {
      setExChange(data?.data)
  }, [data]);
  //funciton
  const handleSetCurrency = (currency: string) => {
    setValueCurrency(currency)
  }
  //render
  return (
    <Card radius="md">
      <Text fw={700} size="lg">{`Tỉ Giá Hôm Nay (${now})`}</Text>
      <Select
        data={[
          { value: 'czk', label: 'CZK' },
          { value: 'usd', label: 'USD' },
          { value: 'eur', label: 'EUR' },
          { value: 'th', label: 'THB' },
          { value: 'kr', label: 'KRW' },
        ]}
        value={valueCurrency}
        className="my-2"
        placeholder="Hôm Nay"
        onChange={(_value, option) => handleSetCurrency(option.value)}
        leftSection={<IconReceiptBitcoin size={20} color="orange" />}
        label={
          <Text size="xs" fs="italic">
            {'Đồng Tiền'}
          </Text>
        }
        w={100}
      />
      <Divider/>
      <SimpleGrid cols={2} className="mt-3">
        <Stack justify="center">
          <Group>
            <Image src={'/images/flags/US.svg'} />
            <Text>USD</Text>
            <Code block color="green">
              {`${exchange?.value_usd}`}
            </Code>
          </Group>
          <Group>
            <Image src={'/images/flags/EU.svg'} />
            <Text>EUR</Text>
            <Code block color="green">
              {`${exchange?.value_eur}`}
            </Code>
          </Group>
          <Group>
            <Image src={'/images/flags/CZ.svg'} />
            <Text>CZK</Text>
            <Code block color="green">
              {`${exchange?.value_czk}`}
            </Code>
          </Group>
          <Group>
            <Image src={'/images/flags/VN.svg'} />
            <Text>VND</Text>
            <Code block color="green">
              {`${exchange?.value_vnd}`}
            </Code>
          </Group>
        </Stack>
        <Stack justify="center">
          <Group>
            <Image src={'/images/flags/TW.svg'} />
            <Text>TWD</Text>
            <Code block color="green">
              {`${exchange?.value_tw}`}
            </Code>
          </Group>
          <Group>
            <Image src={'/images/flags/TH.svg'} />
            <Text>THB</Text>
            <Code block color="green">
              {`${exchange?.value_th}`}
            </Code>
          </Group>
          <Group>
            <Image src={'/images/flags/KR.svg'} />
            <Text>KRW</Text>
            <Code block color="green">
              {`${exchange?.value_kr}`}
            </Code>
          </Group>
          <Group>
            <Image src={'/images/flags/JP.svg'} />
            <Text>JPY</Text>
            <Code block color="green">
              {`${exchange?.value_jp}`}
            </Code>
          </Group>
        </Stack>
      </SimpleGrid>
    </Card>
  );
};

export default ExchangeChart;
