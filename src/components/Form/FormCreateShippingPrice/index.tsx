import { useFindSuppliers } from '@/services/react-query/supplier/use-find-supplier';
import {
  Button,
  ComboboxData,
  Divider,
  Group,
  InputWrapper,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
} from '@mantine/core';
import { IconCarCrane, IconCash } from '@tabler/icons-react';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';
import { useCreateShippingPrice } from '@/services/react-query/supplier/use-create-shipping-price';
const FormCreateShippingPrice = () => {
  //data
  const {mutate: sendRequest} = useCreateShippingPrice()
  const { data: responseSupplier } = useFindSuppliers();
  const dataSelectSupplier: ComboboxData | undefined = responseSupplier?.suppliers?.map(
    (item: any) => ({
      value: `${item.supplier_k2_id}`,
      label: item.supplier_name,
    })
  );
  //validate
  const schema = yup.object().shape({
    supplier_k2_id: yup
      .array()
      .of(yup.string().required('Nhà cung cấp không được để trống'))
      .min(1, 'Nhà cung cấp không được để trống'),
    supplier_pallet_price: yup
      .number()
      .required('Giá vận chuyển không được để trống')
      .min(1, 'Giá vận chuyển không được nhỏ hơn 0'),
    supplier_pallet_currency: yup.string().required('Mệnh giá đồng tiền không được để trống'),
  });
  const form = useForm({
    initialValues: {
      supplier_k2_id: [],
      supplier_pallet_price: 0,
      supplier_pallet_currency: 'Kč',
    },
    validate: yupResolver(schema),
  });
  //logic
  function handleSubmit(values: {
    supplier_k2_id: string[];
    supplier_pallet_price: number;
    supplier_pallet_currency: string;
  }) {
    sendRequest({
      supplier_k2_id: values.supplier_k2_id,
      supplier_pallet_price: values.supplier_pallet_price,
      supplier_pallet_currency: values.supplier_pallet_currency,})
  }
  //render
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <InputWrapper label="Tên nhà cung cấp" required>
          <MultiSelect
            data={dataSelectSupplier}
            searchable
            placeholder="Chọn tên nhà cung cấp"
            {...form.getInputProps('supplier_k2_id')}
            name={'supplier_k2_id'}
          />
        </InputWrapper>
        <InputWrapper label="Nhập Giá Vận Chuyển" required>
          <NumberInput
            min={1}
            {...form.getInputProps('supplier_pallet_price')}
            name={'supplier_pallet_price'}
          />
        </InputWrapper>
        <InputWrapper label="Mệnh Giá Đồng Tiền" required>
          <Select
            data={[
              { value: 'USD', label: 'USD' },
              { value: 'Kč', label: 'CZK' },
              { value: 'EUR', label: 'EUR' },
            ]}
            className="my-2"
            {...form.getInputProps('supplier_pallet_currency')}
            name={'supplier_pallet_currency'}
            leftSection={<IconCash size={20} color="green" />}
          />
        </InputWrapper>
        <Divider />
        <Group align="center">
          <Button
            leftSection={<IconCarCrane size={20} color="white" />}
            color="green"
            type="submit"
          >
            {'Cập Nhật Giá Cif'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default FormCreateShippingPrice;
