import {
  Card,
  Grid,
  Stack,
  Container,
  Tabs,
  Divider,
  Pagination,
  Input,
  Group,
  Loader,
  LoadingOverlay,
  Select,
} from '@mantine/core';
import {
  IconBasketX,
  IconBellZFilled,
  IconCalendarFilled,
  IconHomeCheck,
  IconHomeSearch,
  IconSearch,
  IconShoppingCartExclamation,
  IconTruck,
} from '@tabler/icons-react';
import { getHotkeyHandler } from '@mantine/hooks';
import { useElementSize } from '@mantine/hooks';
import TableProduct from '@/components/Table/TableProduct';
import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { useFindProduct } from '@/services/react-query/product/use-find-all-product';
import CardReportTotal from '@/container/Card/CardReportTotal';

const ProductPage = () => {
  const { ref, width } = useElementSize();
  const { products, totalCurrentProduct } = useAppSelector((state) => state.product.product);
  const [loading, setLoading] = useState<boolean>(true);
  const [activePage, setPage] = useState<number>(1);
  const [valueSearch, setValueSearch] = useState<string>('');
  const [valueConfirm, setValueConfirm] = useState<string>('');
  const [valueTab, setValueTab] = useState<string | null>('all');
  const [validTab, setValidTab] = useState<string | null>('all');
  const [filter, setFilter] = useState<string>('');
  const { status } = useFindProduct(10, activePage, valueConfirm, validTab, filter);
  //effect
  useEffect(() => {
    setLoading(false);
  }, [products, status]);
  //function
  const handleSetValueSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setValueSearch(value);
  };
  const handleSearch = () => {
    setValueConfirm(valueSearch);
    setPage(1);
    setLoading(true);
  };
  const handleChangeTab = (value: string | null) => {
    setValidTab(value);
    setValueTab(value);
    setPage(1);
    setLoading(true);
    setValueConfirm('');
  };
  const handleChangePage = (value: number) => {
    setPage(value);
    setLoading(true);
  };
  const handleSetMonth = (cond: string) => {
    setFilter(cond);
    setLoading(true);
  };
  //tab
  const dataTab = [
    {
      id: 1,
      name: 'all',
      description: 'Tất Cả Sản Phẩm',
      icon: <IconHomeSearch size={20} color="green" />,
      table: (
        <>
          <Group>
            <Input
              leftSection={<IconSearch size={20} color="green" />}
              placeholder="Tìm Kiếm Sản Phẩm"
              className="my-2"
              onChange={handleSetValueSearch}
              onKeyDown={getHotkeyHandler([['Enter', handleSearch]])}
              defaultValue={valueConfirm}
              w={300}
            />
          </Group>
          <TableProduct data={products} minWidth={width} />
        </>
      ),
    },
    {
      id: 2,
      name: 'available',
      description: 'Hàng Có Sẵn',
      icon: <IconHomeCheck size={20} color="green" />,
      table: <TableProduct data={products} minWidth={width} />,
    },
    {
      id: 3,
      name: 'sold',
      description: 'Hàng Hết',
      icon: <IconBasketX size={20} color="red" />,
      table: <TableProduct data={products} minWidth={width} />,
    },
    {
      id: 4,
      name: 'expired',
      description: 'Lô Hết Hạn',
      icon: <IconBellZFilled size={20} color="orange" />,
      table: (
        <>
          <Group>
            <Select
              data={[
                { value: '0', label: 'Hôm Nay' },
                { value: '1', label: '1 Tháng Tới' },
                { value: '2', label: '2 Tháng Tới' },
                { value: '3', label: '3 Tháng Tới' },
                { value: '4', label: '4 Tháng Tới' },
                { value: '5', label: '5 Tháng Tới' },
                { value: '6', label: '6 Tháng Tới' },
              ]}
              value={filter}
              className="my-2"
              placeholder="Hôm Nay"
              onChange={(_value, option) => handleSetMonth(option.value)}
              leftSection={<IconCalendarFilled size={20} color="orange" />}
            />
          </Group>
          <TableProduct data={products} minWidth={width} />
        </>
      ),
    },
    {
      id: 5,
      name: 'specialist',
      description: 'Lô Không Có Hạn',
      icon: <IconShoppingCartExclamation size={20} />,
      table: <TableProduct data={products} minWidth={width} />,
    },
    {
      id: 6,
      name: 'new',
      description: 'Lô Mới',
      icon: <IconTruck size={20} color={'green'} />,
      table: (
        <>
          <Group>
            <Select
              data={[
                { value: '1', label: '1 Tháng Tới' },
                { value: '2', label: '2 Tháng Tới' },
                { value: '3', label: '3 Tháng Tới' },
                { value: '4', label: '4 Tháng Tới' },
                { value: '5', label: '5 Tháng Tới' },
                { value: '6', label: '6 Tháng Tới' },
              ]}
              value={filter}
              className="my-2"
              placeholder="1 Tháng"
              onChange={(_value, option) => handleSetMonth(option.value)}
              leftSection={<IconCalendarFilled size={20} color="orange" />}
            />
          </Group>
          <TableProduct data={products} minWidth={width} />
        </>
      ),
    },
  ];
  //render
  return (
    <div ref={ref}>
      <Stack>
        <CardReportTotal />
        <Container fluid size="responsive" w={width} pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'md', blur: 2 }}
            loaderProps={{
              children: (
                <Stack gap="md">
                  <img alt={'Veggie Logo'} src={'/logo/logo-text-1.svg'} />
                  <Loader
                    style={{ alignSelf: 'center' }}
                    color="green"
                    type="bars"
                    className="mt-5"
                  />
                </Stack>
              ),
            }}
          />
          <Card shadow="xs" radius="md">
            <Tabs defaultValue={valueTab} onChange={handleChangeTab} value={valueTab}>
              <Tabs.List>
                <Group justify="space-between" gap="xl">
                  {dataTab.map((tab) => (
                    <Tabs.Tab
                      value={tab.name}
                      key={tab.id}
                      leftSection={tab.icon}
                      className="font-bold"
                    >
                      {tab.description.toUpperCase()}
                    </Tabs.Tab>
                  ))}
                </Group>
              </Tabs.List>
              {dataTab.map((tab) => (
                <Tabs.Panel value={tab.name} key={tab.id} className="min-h-80">
                  {tab.table}
                </Tabs.Panel>
              ))}
            </Tabs>
            <Divider />
            <Pagination
              total={totalCurrentProduct / 10}
              value={activePage}
              onChange={handleChangePage}
              mt="md"
              size="xs"
              disabled={loading}
            />
          </Card>
        </Container>
      </Stack>
    </div>
  );
};

export default ProductPage;
