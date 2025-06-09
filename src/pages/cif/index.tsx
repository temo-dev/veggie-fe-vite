import FormCreateCif from '@/components/Form/FormCreateCif';
import FormCreateShippingPrice from '@/components/Form/FormCreateShippingPrice';
import FormOrderPurchase from '@/components/Form/FormOrderPurchase';
import TableCif from '@/components/Table/TableCif';
import { useFindExChange } from '@/services/currency/use-get-ex-change-today';
import { useFindProductsCif } from '@/services/react-query/cif/use-find-product-cif';
import { useAppSelector } from '@/store';
import {
  Divider,
  Group,
  InputWrapper,
  Text,
  Input,
  Button,
  Select,
  Title,
  Container,
  Stack,
  Pagination,
  LoadingOverlay,
  Indicator,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
  IconBasketDollar,
  IconCarCrane,
  IconCash,
  IconSearch,
  IconShoppingCart,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const CifPage = () => {
  const [nameProduct, setNameProduct] = useState<string>('');
  const [valueSearch, setValueSearch] = useState<string>('');
  const [activePage, setPage] = useState<number>(1);
  const [baseCurrency, setBaseCurrency] = useState<string>('');
  const [items, setItems] = useState<any[]>([]);
  const _ = useFindExChange(baseCurrency);
  const { exchange, purchaseProducts } = useAppSelector((state) => state.product.product);
  const { data: result, status, isFetching } = useFindProductsCif(nameProduct, activePage);

  const handleChangePage = (value: number) => {
    setPage(value);
  };
  useEffect(() => {
    setNameProduct(nameProduct);
    setItems([]);
  }, [nameProduct]);

  // on data load, append
  useEffect(() => {
    if (status === 'success' && result?.data) {
      setItems(result?.data);
    }
  }, [result, status]);

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

  const handleCreatePurchaseOrder = () => {
    modals.open({
      title: <Title order={6}>Đặt Hàng</Title>,
      children: <FormOrderPurchase />,
      size: 'xl',
    });
  };

  const handleSetValueSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setValueSearch(value);
  };

  const handleSearch = () => {
    if (valueSearch) {
      setNameProduct(valueSearch);
    }
  };

  //render
  return (
    <Container fluid className="w-full">
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
        <Indicator
          disabled={purchaseProducts.length > 0 ? false : true}
          label={`${purchaseProducts.length}`}
          processing
          size={20}
          color="red"
        >
          <Button
            leftSection={<IconShoppingCart size={20} color="white" />}
            variant="outline"
            color="green"
            onClick={handleCreatePurchaseOrder}
          >
            {'Đặt Hàng'}
          </Button>
        </Indicator>
      </Group>
      <Divider />
      <Stack>
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
                { value: 'sek', label: 'SEK' },
              ]}
              defaultValue={'czk'}
              className="my-2"
              onChange={(_value, option) => setBaseCurrency(option.value)}
              leftSection={<IconCash size={20} color="green" />}
            />
          </InputWrapper>
        </Group>
        <Divider />
        <Pagination
          total={(result?.total / parseInt(result?.limit) - 1) | 1}
          value={activePage}
          onChange={handleChangePage}
          mt="xs"
          size="xs"
        />
        <LoadingOverlay
          visible={status === 'loading'}
          zIndex={1000}
          overlayProps={{ radius: 'md', blur: 2 }}
          loaderProps={{ color: 'green', type: 'bars' }}
        />
        <TableCif exchange={exchange} items={items} />
      </Stack>
    </Container>
  );
};

export default CifPage;
