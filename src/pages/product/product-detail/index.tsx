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
  Divider,
  Title,
} from '@mantine/core';
import { IconPlus, IconSalad } from '@tabler/icons-react';
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import LineProductChart from '@/components/Report/LineProductChart';
import { Link, useNavigate } from 'react-router-dom';
import { useElementSize } from '@mantine/hooks';
import TableProduct from '@/components/Table/TableProduct';
import { useAppSelector } from '@/store';

//mock data
const data1 = [
  { value: 200, name: 'Dry Foods' },
  { value: 50, name: 'VEG Products' },
  { value: 100, name: 'Snack Foods' },
  { value: 100, name: 'EU Products' },
  { value: 111, name: 'Czech Farms' },
];

const ProductDetailPage = () => {
  const { ref, width } = useElementSize();
  const navigate = useNavigate();
  const {currentProduct} = useAppSelector((state) => state.product.product);
  //mock data
  const stats = [
    { value: '2', label: 'Nhà Cung Cấp' },
    { value: '3', label: 'Khách Hàng' },
  ];
  const dataTab = [
    {
      id: 1,
      name: 'Danh Sách Sản Phẩm',
      description: 'Danh sách sản phẩm',
      icon: <IconSalad />,
      table: <TableProduct data={[]} minWidth={width} />,
    },
  ];
  //children components
  const items2 = [
    { title: 'Sản Phẩm', href: '/products' },
    { title: 'Sản Phẩm Chi Tiết', href: '/product-detail' },
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
      <Text ta="center" fz="lg" fw={700}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1} fw={700}>
        {stat.label}
      </Text>
    </div>
  ));


  //render
  return (
    <div ref={ref}>
      <Stack>
        <Breadcrumbs>{items2}</Breadcrumbs>
        <Group>
        </Group>
        <Card withBorder padding="md" radius="md" className={classes.card}>
          <Card.Section
            h={220}
            style={{
              background:
                'url("/logo/logo-1.svg") no-repeat center center',
              backgroundColor: '#f5f5f5',
            }}
          />
          <Group justify="space-between" mt="md">
            <Group>
              <div>
                {/* <Avatar
                  src={currentProduct?.image_url}
                  size={120}
                  radius={120}
                  mx="auto"
                  mt={-90}
                  className={classes.avatar}
                />
                <Text ta="center" fz="lg" fw={700} mt="sm">
                  {currentProduct?.product_code}
                </Text> */}
              </div>
              <Group mt="md" justify="center" gap={30}>
                {items}
              </Group>
            </Group>
          </Group>
        </Card>
        <Grid>
          <Grid.Col span={6}>
            <TotalCategoryPieChart />
          </Grid.Col>
          <Grid.Col span={6}>
            <LineProductChart title='Theo dõi giá nhập'/>
          </Grid.Col>
        </Grid>
        <Container fluid size="responsive" w={width}>
          {/* <Tabs defaultValue={`${dataTab[0].name}`} className="mt-4">
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
          </Tabs> */}
        </Container>
      </Stack>
    </div>
  );
};

export default ProductDetailPage;
