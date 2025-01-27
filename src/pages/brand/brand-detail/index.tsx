import classes from './index.module.css';
import {
  Card,
  Avatar,
  Group,
  Button,
  Text,
  Grid,
  Stack,
  Breadcrumbs,
  Container,
  Tabs,
} from '@mantine/core';
import { IconPlus, IconSalad } from '@tabler/icons-react';
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import LineProductChart from '@/components/Report/LineProductChart';
import { Link, useNavigate } from 'react-router-dom';
import { useElementSize } from '@mantine/hooks';
import TableBrand from '@/components/Table/TableBrand';
import { useAppSelector } from '@/store';

const stats = [
  { value: '2', label: 'Nhà Cung Cấp' },
  { value: '3', label: 'Khách Hàng' },
];

//mock data
const data1 = [
  { value: 200, name: 'Dry Foods' },
  { value: 50, name: 'VEG Products' },
  { value: 100, name: 'Snack Foods' },
  { value: 100, name: 'EU Products' },
  { value: 111, name: 'Czech Farms' },
];

const BrandDetailPage = () => {
  const { ref, width } = useElementSize();
  const {brands} = useAppSelector((state) => state.brand.brand);
  const dataTab = [
    {
      id: 1,
      name: 'Danh Sách Sản Phẩm',
      description: 'Danh sách sản phẩm',
      icon: <IconSalad />,
      table: <TableBrand data={brands} minWidth={width}/>,
    },
  ];
  const navigate = useNavigate();
  const items2 = [
    { title: 'Thương Hiệu', href: '/brands' },
    { title: 'Thương Hiệu Chi Tiết', href: '/brand-detail' },
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
          <Button variant="default" radius="md" leftSection={<IconPlus size={20} />}>
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
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                  size={120}
                  radius={120}
                  mx="auto"
                  mt={-90}
                  className={classes.avatar}
                />
                <Text ta="center" fz="lg" fw={500} mt="sm">
                  Tên Thương Hiệu
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
          <Tabs defaultValue={`${dataTab[0].name}`} className="mt-4">
            <Tabs.List>
              {dataTab.map((tab) => (
                <Tabs.Tab
                  value={tab.name}
                  key={tab.id}
                  leftSection={tab.icon}
                  className="font-bold"
                >
                  {tab.name.toUpperCase()}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            {dataTab.map((tab) => (
              <Tabs.Panel value={tab.name} key={tab.id} className="min-h-80">
                {tab.table}
              </Tabs.Panel>
            ))}
          </Tabs>
        </Container>
      </Stack>
    </div>
  );
};

export default BrandDetailPage;
