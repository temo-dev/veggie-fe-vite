import classes from './index.module.css';
import {
  Card,
  Avatar,
  Group,
  Button,
  Text,
  Grid,
  Stack,
  Anchor,
  Breadcrumbs,
  Container,
  Tabs,
} from '@mantine/core';
import { IconPlus, IconSalad } from '@tabler/icons-react';
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import LineProductChart from '@/components/Report/LineProductChart';
import { Link, useNavigate } from 'react-router-dom';
import { useElementSize } from '@mantine/hooks';
import TableProduct from '@/components/Table/TableProduct';
import { useAppSelector } from '@/store';

const stats = [
  { value: '2', label: 'Thương Hiệu' },
  { value: '3', label: 'Sản Phẩm' },
];

//mock data
const data1 = [
  { value: 200, name: 'Dry Foods' },
  { value: 50, name: 'VEG Products' },
  { value: 100, name: 'Snack Foods' },
  { value: 100, name: 'EU Products' },
  { value: 111, name: 'Czech Farms' },
];

const SupplierDetailPage = () => {
  const { ref, width } = useElementSize();
  const {currentSupplier} = useAppSelector((state) => state.supplier.supplier);
  console.log(currentSupplier)
  const navigate = useNavigate();
  const dataTab = [
    {
      id: 1,
      name: 'Sản Phẩm',
      description: 'sản phẩm',
      icon: <IconSalad />,
      table: <TableProduct data={[]} minWidth={width} />,
    },
    {
      id: 2,
      name: 'Thương Hiệu',
      description: 'Thương Hiệu',
      icon: <IconSalad />,
      table: <TableProduct data={[]} minWidth={width} />,
    },
  ];
  const items2 = [
    { title: 'Nhà Cung Cấp', href: '/suppliers' },
    { title: 'Nhà Cung Cấp Chi Tiết', href: '/supplier-detail' },
  ].map((item, index) => (
    <Link
      to={item.href}
      key={index}
      onClick={(event) => {
        event.preventDefault();
        navigate(item.href);
      }}
    >
      {item.title}
    </Link>
  ));

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <div ref={ref}>
      <Stack>
        <Breadcrumbs>{items2}</Breadcrumbs>
        <Group>
          <Button size="md" variant="light" radius="md" leftSection={<IconPlus size={20} />}>
            Thêm Sản Phẩm
          </Button>
        </Group>
        <Card withBorder padding="md" radius="md" className={classes.card}>
          <Card.Section
            h={220}
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
            }}
          />
          <Group justify="space-between" mt="md">
            <Group>
              <div>
                <Avatar
                  src={currentSupplier?.image_url}
                  size={120}
                  radius={120}
                  mx="auto"
                  mt={-90}
                  className={classes.avatar}
                />
                <Text ta="center" fz="lg" fw={500} mt="sm">
                  {currentSupplier?.supplier_name.toUpperCase()}
                </Text>
              </div>
              <Group mt="md" justify="center" gap={30}>
                {items}
              </Group>
            </Group>
          </Group>
        </Card>
        <Grid>
          <Grid.Col span={6}>
            <TotalCategoryPieChart title="Thống kê danh mục hàng" data={data1} />
          </Grid.Col>
          <Grid.Col span={6}>
            <LineProductChart />
          </Grid.Col>
        </Grid>
        <Container fluid size="responsive" w={width}>
        <Card shadow="xs"radius="md">
          <Tabs defaultValue={`${dataTab[0].name}`}>
            <Tabs.List>
              {
                dataTab.map((tab)=>(
                  <Tabs.Tab value={tab.name} key={tab.id} leftSection={tab.icon} className='font-bold'>
                  {tab.name.toUpperCase()}
                </Tabs.Tab>
                ))
              }
            </Tabs.List>
              {
                dataTab.map((tab)=>(
                  <Tabs.Panel value={tab.name} key={tab.id} className='min-h-80'>
                    {tab.table}
                  </Tabs.Panel>
                ))
              }
            </Tabs>
        </Card>
      </Container>
      </Stack>
    </div>
  );
};

export default SupplierDetailPage;
