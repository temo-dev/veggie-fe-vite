import FormCreateCif from '@/components/Form/FormCreateCif';
import FormCreateShippingPrice from '@/components/Form/FormCreateShippingPrice';
import TableCif from '@/components/Table/TableCif';
import { useFindExChange } from '@/services/currency/use-get-ex-change-today';
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
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconBasketDollar, IconCarCrane, IconCash, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';

const CifPage = () => {
  const [nameProduct, setNameProduct] = useState<string>('');
  const [valueSearch, setValueSearch] = useState<string>('');
  const [baseCurrency, setBaseCurrency] = useState<string>('');
  const _ = useFindExChange(baseCurrency);
  const { exchange } = useAppSelector((state) => state.product.product);
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
    if (valueSearch) {
      setNameProduct(valueSearch);
    }
  };

  //render
  return (
    <Container fluid className='w-full'>
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
              ]}
              defaultValue={'czk'}
              className="my-2"
              onChange={(_value, option) => setBaseCurrency(option.value)}
              leftSection={<IconCash size={20} color="green" />}
            />
          </InputWrapper>
        </Group>
        <TableCif exchange={exchange} keyword={nameProduct}/>
      </Stack>
    </Container>
  );
};

export default CifPage;
