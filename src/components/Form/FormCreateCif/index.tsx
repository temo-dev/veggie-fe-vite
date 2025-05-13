import { useFindSuppliers } from '@/services/react-query/supplier/use-find-supplier';
import {
  Button,
  ComboboxData,
  Divider,
  Group,
  InputWrapper,
  Loader,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
} from '@mantine/core';
import * as yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { IconCancel, IconCarCrane, IconCash } from '@tabler/icons-react';
import { useFindProducts } from '@/services/react-query/product/use-find-product';
import { useEffect, useState } from 'react';
import { useCreateCifPrice } from '@/services/react-query/cif/use-create-cif';
const FormCreateCif = () => {
  //state
  const [valueProduct, setValueProduct] = useState<string>('');
  const [searchProduct, setSearchProduct] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataProduct, setDataProduct] = useState<ComboboxData | undefined>([]);
  //data
  const { data, status } = useFindProducts(searchProduct);
  const { data: responseSupplier } = useFindSuppliers();
  //query
  const { mutate: sendCifPrice } = useCreateCifPrice();

  useEffect(() => {
    if (status === 'success') {
      const dataSelectProduct: ComboboxData | undefined = data?.products?.map((item: any) => ({
        value: `${item.product_k2_id}`,
        label: `${item.product_abbr} - ${item.product_name_vn}`,
      }));
      setDataProduct(dataSelectProduct);
      setIsLoading(false);
    }
  }, [status]);

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
    product_k2_id: yup
      .array()
      .of(yup.string().required('Sản phẩm không được để trống'))
      .min(1, 'Sản phẩm không được để trống'),
    price_pc: yup
      .number()
      .required('Giá sản phẩm không được để trống')
      .min(1, 'Giá sản phẩm không được nhỏ hơn 0'),
    box_pallet: yup
      .number()
      .required('Số lượng thùng không được để trống')
      .min(1, 'Số lượng thùng không được nhỏ hơn 0'),
    shipping_currency: yup.string().required('Mệnh giá đồng tiền không được để trống'),
  });
  const form = useForm({
    initialValues: {
      supplier_k2_id: [],
      product_k2_id: [],
      price_pc: 0,
      box_pallet: 0,
      shipping_currency: 'czk',
    },
    validate: yupResolver(schema),
  });
  //handle
  //logic
  function handleSubmit(values: {
    supplier_k2_id: string[];
    product_k2_id: string[];
    price_pc: number;
    box_pallet: number;
    shipping_currency: string;
  }) {
    const supplierId = values.supplier_k2_id.map((item) => Number(item));
    const productId = values.product_k2_id.map((item) => Number(item));
    sendCifPrice({ ...values, supplier_k2_id: supplierId, product_k2_id: productId });
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
        <InputWrapper label="Sản Phẩm" required>
          <MultiSelect
            data={dataProduct}
            searchable
            placeholder="Chọn sản phẩm"
            {...form.getInputProps('product_k2_id')}
            name={'product_k2_id'}
            onSearchChange={setValueProduct}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setSearchProduct(valueProduct);
                setIsLoading(true);
              }
            }}
            rightSection={<Loader color="green" className={isLoading ? '' : `hidden`} size={12} />}
          />
        </InputWrapper>
        <InputWrapper label="Nhập Số Lượng Thùng" required>
          <NumberInput min={1} {...form.getInputProps('box_pallet')} name={'box_pallet'} />
        </InputWrapper>
        <InputWrapper label="Nhập Giá Của Một Sản Phẩm" required>
          <NumberInput min={1} {...form.getInputProps('price_pc')} name={'price_pc'} />
        </InputWrapper>
        <InputWrapper label="Mệnh Giá Đồng Tiền" required>
          <Select
            data={[
              { value: 'czk', label: 'CZK' },
              { value: 'usd', label: 'USD' },
              { value: 'eur', label: 'EUR' },
              { value: 'thb', label: 'THB' },
              { value: 'krw', label: 'KRW' },
            ]}
            className="my-2"
            {...form.getInputProps('shipping_currency')}
            name={'shipping_currency'}
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

export default FormCreateCif;
