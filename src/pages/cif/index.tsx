import FormCreateCif from '@/components/Form/FormCreateCif';
import FormCreateShippingPrice from '@/components/Form/FormCreateShippingPrice';
import TableCif from '@/components/Table/TableCif';
import { useFindExChange } from '@/services/currency/use-get-ex-change-today';
import { useFindProductsCif } from '@/services/react-query/cif/use-find-product-cif';
import { useAppSelector } from '@/store';
import {
  Divider,
  Group,
  InputWrapper,
  Pagination,
  Text,
  Input,
  Button,
  Select,
  Title,
  LoadingOverlay,
  Container,
  Stack,
  Loader,
  Image,
} from '@mantine/core';
import { getHotkeyHandler, useElementSize } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconBasketDollar, IconCarCrane, IconCash, IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const CifPage = () => {
  const { ref, width, height } = useElementSize();
  const [activePage, setPage] = useState<number>(1);
  const [nameProduct, setNameProduct] = useState<string>('');
  const [valueSearch, setValueSearch] = useState<string>('');
  const [baseCurrency, setBaseCurrency] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { status } = useFindProductsCif(nameProduct, activePage - 1);
  const _ = useFindExChange(baseCurrency);
  const { productCifs, exchange } = useAppSelector((state) => state.product.product);
  //effect
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setIsLoading(false);
    }
  }, [productCifs, status]);
  const handleCreateCif = () => {
    modals.open({
      title: <Title order={6}>Cập Nhật Giá Cif</Title>,
      children: <FormCreateCif />,
      size: 'lg',
    });
  };
  const handleCreateShippingPrice = () => {
    modals.open({
      title: <Title order={6}>Cập Nhật Phí Vận Chuyển</Title>,
      children: <FormCreateShippingPrice />,
      size: 'lg',
    });
  };

  const handleSetValueSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setValueSearch(value);
  };

  const handleSearch = () => {
    setNameProduct(valueSearch);
    setIsLoading(true);
  };

  const handleChangePage = (value: number) => {
    setPage(value);
    setIsLoading(true);
  };

  //render
  return (
    <div ref={ref} className="flex flex-col h-full">
      <Group className="mb-2">
        <Button
          leftSection={<IconBasketDollar size={20} color="white" />}
          variant="outline"
          color="green"
          onClick={handleCreateCif}
        >
          {'Cập Nhật Giá Cif'}
        </Button>
        <Button
          leftSection={<IconCarCrane size={20} color="white" />}
          variant="outline"
          color="green"
          onClick={handleCreateShippingPrice}
        >
          {'Cập Nhật Phí Vận Chuyển'}
        </Button>
      </Group>
      <Divider />
      <Container fluid size="responsive" w={width} pos="relative">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'md', blur: 2 }}
          loaderProps={{
            children: (
              <Stack gap="md" justify="center" align="center">
                <Image alt={'Veggie Logo'} src={'/logo/logo-text-1.svg'} />
                <Loader
                  style={{ alignSelf: 'center' }}
                  color="green"
                  type="bars"
                  className="mt-5"
                />
                <Text size="lg" color="green" fw={700}>
                  {'Đang Tải Dữ Liệu Từ K2...'}
                </Text>
              </Stack>
            ),
          }}
        />
        <Group>
          <InputWrapper
            label={
              <Text size="xs" fs="italic">
                {'Tìm Kiếm Theo Tên, Mã Sản Phẩm'}
              </Text>
            }
          >
            <Input
              leftSection={<IconSearch size={20} color="green" />}
              className="my-2"
              onChange={handleSetValueSearch}
              onKeyDown={getHotkeyHandler([['Enter', handleSearch]])}
              defaultValue={valueSearch}
              w={200}
            />
          </InputWrapper>
          <InputWrapper
            label={
              <Text size="xs" fs="italic">
                {'Đồng Tiền Mặc Định'}
              </Text>
            }
          >
            <Select
              data={[
                { value: 'czk', label: 'CZK' },
                { value: 'usd', label: 'USD' },
                { value: 'eur', label: 'EUR' },
                { value: 'thb', label: 'THB' },
                { value: 'krw', label: 'KRW' },
              ]}
              defaultValue={'czk'}
              className="my-2"
              onChange={(_value, option) => setBaseCurrency(option.value)}
              leftSection={<IconCash size={20} color="green" />}
            />
          </InputWrapper>
        </Group>
        <Group justify="flex-end">
          <Pagination
            total={productCifs?.total / parseInt(productCifs?.limit)}
            value={activePage}
            onChange={handleChangePage}
            mb="xs"
            size="xs"
            disabled={isLoading}
          />
        </Group>
        <TableCif minWidth={width} minHeight={height} dataSearch={productCifs?.data} exchange={exchange}/>
        <Divider />
      </Container>
    </div>
  );
};

export default CifPage;
