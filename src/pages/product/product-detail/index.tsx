import classes from './index.module.css';
import {
  Card,
  Avatar,
  Group,
  Text,
  Grid,
  Stack,
  Breadcrumbs,
  Container,
  Tabs,
  Loader,
  LoadingOverlay,
} from '@mantine/core';
import { IconBrandShopee, IconSalad } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useElementSize } from '@mantine/hooks';
import { useAppSelector } from '@/store';
import { ProductBaseDetailType } from '@/services/react-query/product/use-find-all-product';
import TableProductBatchDetail from '@/components/Table/TableProductBatchDetail';
import { useFindProductDetail } from '@/services/react-query/product/use-find-product-detail';
import { useEffect, useState } from 'react';
import TableEshop from '@/components/Table/TableEshop';
import ZonePrice from '@/components/ZonePrice';

//mock data

const ProductDetailPage = () => {
  const { ref, width } = useElementSize();
  const { currentProductCode } = useAppSelector((state) => state.product.product);
  const [productDetail, setProductDetail] = useState<ProductBaseDetailType | null>(null);
  const _ = useFindProductDetail(currentProductCode);
  const [valueTab, setValueTab] = useState<string | null>('batch');
  const navigate = useNavigate();
  const { status, isLoading, data: response } = useFindProductDetail(currentProductCode);
  const elBox = productDetail?.product_base?.units.filter(
    (unit: any) => unit.unit_name == 'box'
  )[0];
  //effect
  useEffect(() => {
    if (status == 'success') {
      setProductDetail(response?.data);
    }
  }, [status]);
  //mock data
  const stats: any[] = [
    {
      value: <Text fw={700}>{`${(productDetail?.product_base?.stock ?? 0) / (elBox?.quantity ?? 1)} ${elBox?.unit_name.toLocaleLowerCase() ?? ''}`}</Text>,
      label: 'Số Lượng',
    },
    {
      value: <ZonePrice listPrice={productDetail?.list_price}/>,
      label: 'Giá Bán Ra',
    },
    {
      value: <Text>{`${productDetail?.product_base?.brand}`}</Text>,
      label: 'Nhãn Hàng',
    },
    {
      value: <Text>{`${productDetail?.product_base?.origin}`}</Text>,
      label: 'Xuất Xứ',
    },
  ];
  const dataTab = [
    {
      id: 1,
      name: 'batch',
      description: 'Lô Hàng Hiện Tại',
      icon: <IconSalad />,
      table: (
        <TableProductBatchDetail
          listBatch={productDetail?.list_batch}
          productBase={productDetail?.product_base}
          minWidth={width}
        />
      ),
    },
    {
      id: 2,
      name: 'eshop',
      description: 'Thông Tin Trên Eshop',
      icon: <IconBrandShopee />,
      table: (
        <TableEshop
          productBase={productDetail?.product_base}
          minWidth={width}
        />
      ),
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
  //function
  const handleChangeTab = (value: string | null) => {
    setValueTab(value);
  };
  //render
  return (
    <div ref={ref}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'md', blur: 2 }}
        loaderProps={{
          children: (
            <Stack gap="md">
              <img alt={'Veggie Logo'} src={'/logo/logo-text-1.svg'} />
              <Loader style={{ alignSelf: 'center' }} color="green" type="bars" className="mt-5" />
            </Stack>
          ),
        }}
      />
      <Stack>
        <Breadcrumbs>{items2}</Breadcrumbs>
        <Card withBorder padding="md" radius="md" className={classes.card}>
          <Card.Section
            h={220}
            style={{
              background: 'url("/logo/logo-1.svg") no-repeat center center',
              backgroundColor: '#f5f5f5',
            }}
          />
          <Group justify="space-between" mt="md">
            <Group>
              <div>
                <Avatar
                  src={productDetail?.product_base?.image_url}
                  size={120}
                  radius={120}
                  mx="auto"
                  mt={-90}
                  className={classes.avatar}
                />
                <Text ta="center" fz="lg" fw={700} mt="sm">
                  {productDetail?.product_base?.product_abbr}
                </Text>
              </div>
              <Group mt="md" justify="center" gap={30}>
                {items}
              </Group>
            </Group>
          </Group>
        </Card>
        <Grid></Grid>
        <Container fluid size="responsive" w={width}>
          <Tabs defaultValue={valueTab} onChange={handleChangeTab} className="mt-4">
            <Tabs.List>
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

export default ProductDetailPage;
