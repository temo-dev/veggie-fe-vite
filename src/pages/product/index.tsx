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
} from '@mantine/core';
import { IconCategoryPlus, IconSearch } from '@tabler/icons-react';
import { getHotkeyHandler } from '@mantine/hooks';
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import LineProductChart from '@/components/Report/LineProductChart';
import { useElementSize } from '@mantine/hooks';
import TableProduct from '@/components/Table/TableProduct';
import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { useFindProduct } from '@/services/react-query/product/use-find-all-product';

const ProductPage = () => {
  const { ref, width } = useElementSize();
  const { products, totalCurrentProduct } = useAppSelector((state) => state.product.product);
  const [loading, setLoading] = useState<boolean>(false);
  const [activePage, setPage] = useState<number>(1);
  const [valueSearch, setValueSearch] = useState<string>('');
  const [valueConfirm, setValueConfirm] = useState<string>('');
  const [valueTab, setValueTab] = useState<string | null>('all')
  const [validTab, setValidTab] = useState<string | null>(null);
  const { status: statusProduct } = useFindProduct(10, activePage, valueConfirm, validTab);
  //mock data
  // const dataSubCategories = subCategories.map((subCategory)=>{
  //   return {
  //     value: subCategory.product_count,
  //     name: subCategory.sub_category_name_vn.toUpperCase()
  //   }
  // })

  //effect
  useEffect(() => {
    if (statusProduct === 'success' || statusProduct === 'error') {
      setLoading(false);
    }
  }, [statusProduct]);
  //function
  const handleSetValueSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setValueSearch(value);
  };
  const handleSearch = () => {
    setValueConfirm(valueSearch);
    setPage(1);
    setValueTab('all')
  };
  const handleChangeTab = (value: string | null) => {
    setValidTab(value)
    setValueTab(value)
    setPage(1)
  }
  //tab
  const dataTab = [
    {
      id: 1,
      name: 'all',
      description: 'Tất Cả Sản Phẩm',
      icon: <IconCategoryPlus size={20} />,
      table: (
        <>
          <TableProduct data={products} minWidth={width}/>
        </>
      ),
    },
    {
      id: 2,
      name: 'available',
      description: 'Có Sẵn',
      icon: <IconCategoryPlus size={20} />,
      table: <TableProduct data={products} minWidth={width} />,
    },
    {
      id: 3,
      name: 'expired',
      description: 'Hết Hạn',
      icon: <IconCategoryPlus size={20} />,
      table: <TableProduct data={products} minWidth={width} />,
    },
    {
      id: 4,
      name: 'sold',
      description: 'Hết Hàng',
      icon: <IconCategoryPlus size={20} />,
      table: <TableProduct data={products} minWidth={width} />,
    },
    {
      id: 5,
      name: 'specialist',
      description: 'Không Có Hạn',
      icon: <IconCategoryPlus size={20} />,
      table: <TableProduct data={products} minWidth={width} />,
    },
  ];
  //render
  return (
    <div ref={ref}>
      <Stack>
        <Grid>
          <Grid.Col span={6}>
            {/* <TotalCategoryPieChart title="Danh mục hàng hóa" data={dataSubCategories}/> */}
          </Grid.Col>
          <Grid.Col span={6}>
            <LineProductChart title="Giá Hàng Hóa Nhập" />
          </Grid.Col>
        </Grid>
        <Container fluid size="responsive" w={width}>
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
                  <Input
                    leftSection={<IconSearch size={20} />}
                    placeholder="Tìm Kiếm Sản Phẩm Tiếng Việt"
                    className="my-2"
                    onChange={handleSetValueSearch}
                    onKeyDown={getHotkeyHandler([['Enter', handleSearch]])}
                  />
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
              onChange={setPage}
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
