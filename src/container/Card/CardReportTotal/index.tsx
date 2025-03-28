import { useAppSelector } from '@/store';
import {
  Card,
  Center,
  Container,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Text,
} from '@mantine/core';
import {
  IconBasketX,
  IconBellZFilled,
  IconHomeCheck,
  IconScan,
  IconShoppingCartExclamation,
  IconTruck,
} from '@tabler/icons-react';
import React from 'react';

const icons = {
  code: IconScan,
  available: IconHomeCheck,
  sold: IconBasketX,
  expired: IconBellZFilled,
  specialist: IconShoppingCartExclamation,
  new:IconTruck
};

const CardReport = () => {
  const { reportNumberProduct, totalProduct } = useAppSelector((state) => state.report.report);
  const data = reportNumberProduct.map((item) => {
    const valueProgress = (item.value / totalProduct) * 100;
    let valueColor = 'green';
    let icon = 'available';
    let label = 'Mã Có Sẵn';
    switch (item.name) {
      case 'all':
        valueColor = 'teal';
        icon = 'code';
        label = 'Mã Sản Phẩm';
        break;
      case 'sold':
        valueColor = 'red';
        icon = 'sold';
        label = 'Mã Hết Hàng';
        break;
      case 'expired':
        valueColor = 'orange';
        icon = 'expired';
        label = 'Lô Hết Hạn 3 Tháng tới';
        break;
      case 'new':
        valueColor = 'green';
        icon = 'new';
        label = 'Lô Mới Nhập';
        break;
      case 'specialist':
        valueColor = 'black';
        icon = 'specialist';
        label = 'Lô Chưa Có Hạn';
        break;
      default:
        break;
    }
    let stat = {
      label: label,
      stats: `${item.value}`,
      progress: valueProgress,
      color: valueColor,
      icon: icon,
    };
    return stat;
  });
  const stats = data.map((stat: any) => {
    const Icon = icons[stat?.icon as keyof typeof icons];
    return (
      <Paper
        withBorder
        radius="md"
        p="xs"
        key={stat.label}
        className="drop-shadow-lg border-green-700"
      >
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon size={20} stroke={1.5} />
              </Center>
            }
          />

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });
  return (
    <SimpleGrid cols={3}>{stats}</SimpleGrid>
  );
};

export default CardReport;
