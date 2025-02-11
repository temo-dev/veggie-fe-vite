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
  Input,
} from '@mantine/core';
import { IconPlus, IconSalad, IconSearch, IconUsersGroup } from '@tabler/icons-react';
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

const ZoneDetailPage = () => {
  const { ref, width } = useElementSize();
  const navigate = useNavigate();
  const {currentZone} = useAppSelector((state) => state.zone.zone);
  //mock data
  const stats = [
    { value: '20', label: 'Tổng Khách Hàng' },
    { value: '300', label: 'Tổng Mặt Hàng' },
    { value: 'Khánh Sale', label: 'Người Phụ Trách' },
  ];
  const dataTab = [
    {
      id: 1,
      name: 'Danh Sách Sản Phẩm',
      description: 'Danh sách sản phẩm',
      icon: <IconSalad />,
      table: <>
              <Input leftSection={<IconSearch size={20}/>} placeholder='Tìm Kiếm Sản Phẩm' className='my-2' />
              <TableProduct data={[]} minWidth={width} />,
              </>
    },
    {
      id: 1,
      name: 'Danh Sách Khách Hàng',
      description: 'Danh sách Khách Hàng',
      icon: <IconUsersGroup />,
      table: <>
              <Input leftSection={<IconSearch size={20}/>} placeholder='Tìm Kiếm Khách Hàng' className='my-2' />
              <TableProduct data={[]} minWidth={width} />,
            </>
    },
  ];
  //children components
  const items2 = [
    { title: 'Zones', href: '/zone' },
    { title: 'Zone Detail', href: '/zone-detail' },
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
          <Button variant="default" leftSection={<IconPlus size={20} />}>
            Đổi Tên Zone
          </Button>
          <Button variant="default" leftSection={<IconPlus size={20} />}>
            Thêm Khách Hàng
          </Button>
          <Button variant="default" leftSection={<IconPlus size={20} />}>
            Thêm Sản Phẩm
          </Button>
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
                <Avatar
                  size={120}
                  radius={120}
                  mx="auto"
                  mt={-90}
                  className={classes.avatar}
                >
                  <Text ta="center" fz="lg" fw={700} mt="sm">
                    {currentZone?.zone_name}
                  </Text>
                </Avatar>
              </div>
              <Group mt="md" justify="center" gap={30}>
                {items}
              </Group>
            </Group>
          </Group>
        </Card>
        <Grid>
          <Grid.Col span={6}>
            <TotalCategoryPieChart title="Số Sản Phẩm" data={data1} />
          </Grid.Col>
          <Grid.Col span={6}>
            <LineProductChart title='Sức Mua'/>
          </Grid.Col>
        </Grid>
        <Container fluid size="responsive" w={width}>
          <Card shadow="xs"radius="md">
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
          </Card>
        </Container>
      </Stack>
    </div>
  );
};

export default ZoneDetailPage;
