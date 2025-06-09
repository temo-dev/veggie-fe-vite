import { useFindSuppliers } from '@/services/react-query/supplier/use-find-supplier';
import {
  Button,
  ComboboxData,
  Divider,
  Group,
  InputWrapper,
  Select,
  Stack,
  ScrollArea,
  NumberInput,
  Input,
  Grid,
  Text,
  Switch,
  LoadingOverlay,
} from '@mantine/core';
import { IconCarCrane } from '@tabler/icons-react';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';
import TableOrderPurchase from '@/components/Table/TableOrderPurchase';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';
import { useCreatePurchase } from '@/services/react-query/purchase/use-create-purchase';

const formatNumber = (num: number) => (typeof num === 'number' ? num.toFixed(2) : '-');

const FormOrderPurchase = () => {
  //data
  const [loading, setLoading] = useState<boolean>(false);
  const [supplier, setSupplier] = useState<number | null>(null);
  const [productPurchase, setProductPurchase] = useState<any[] | []>([]);
  const [totalBox, setTotalBox] = useState<number>(0);
  const [totalBill, setTotalBill] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const { data: responseSupplier } = useFindSuppliers();
  const { exchange } = useAppSelector((state) => state.product.product);
  const { mutate: sendPurchaseOrder, status } = useCreatePurchase();
  const dataSelectSupplier: ComboboxData | undefined = responseSupplier?.suppliers?.map(
    (item: any) => ({
      value: `${item.supplier_k2_id}`,
      label: item.supplier_name,
    })
  );

  //validate
  const schema = yup.object().shape({
    supplier: yup.string().required('Nhà cung cấp không được để trống'),
  });
  const form = useForm({
    initialValues: {
      supplier: '',
      discount: 0,
      description: '',
      isVat: false,
    },
    validate: yupResolver(schema),
  });
  //effect
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setLoading(false);
    }
  }, [status, form]);
  useEffect(() => {
    setSupplier(Number(form.values.supplier));
  }, [form.values.supplier]);

  useEffect(() => {
    setDiscount(Number(form.values.discount));
  }, [form.values.discount]);

  useEffect(() => {
    let totalBill = 0;
    let totalBox = 0;
    productPurchase.forEach((item) => {
      totalBox += item?.quantity;
      totalBill += item?.quantity * item.price;
    });
    setTotalBox(totalBox);
    setTotalBill(totalBill * (1 - discount / 100));
  }, [productPurchase, discount]);

  //logic
  function handleSubmit(values: any) {
    const supplier_data = responseSupplier?.suppliers?.find(
      (item: any) => item.supplier_k2_id === supplier
    );
    let orderPurchase = {
      supplier: {
        id: supplier_data?.supplier_k2_id,
        abbr: supplier_data?.supplier_code,
      },
      description: values.description,
      isVat: values.isVat,
      items: productPurchase,
      discount: Number(values.discount),
      currency: exchange?.base_currency?.toUpperCase(),
    };
    if (productPurchase.length != 0) {
      sendPurchaseOrder(orderPurchase);
      setLoading(true);
    }
  }
  const handlePurchaseProduct = (product: any[]) => {
    setProductPurchase(product);
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'md', blur: 2 }}
          loaderProps={{ color: 'green', type: 'bars' }}
        />
        <Group justify="space-between" align="center">
          <InputWrapper label="Tên nhà cung cấp" required>
            <Select
              data={dataSelectSupplier}
              searchable
              placeholder="Chọn tên nhà cung cấp"
              {...form.getInputProps('supplier')}
              name={'supplier'}
            />
          </InputWrapper>
          <InputWrapper label="Hạ Giá (%)" w={100}>
            <NumberInput {...form.getInputProps('discount')} name={'discount'} />
          </InputWrapper>
          <InputWrapper label="Tổng Tiền" w={100}>
            <Text>{`${formatNumber(totalBill)}`}</Text>
          </InputWrapper>
          <InputWrapper label="Tổng Thùng" w={100}>
            <Text>{`${totalBox}`}</Text>
          </InputWrapper>
        </Group>
        <Group>
          <InputWrapper label="Ghi Chú" w="80%">
            <Input
              placeholder="Nhập ghi chú"
              {...form.getInputProps('description')}
              name={'description'}
            />
          </InputWrapper>
          <InputWrapper label="Dph">
            <Switch {...form.getInputProps('isVat')} name={'isVat'} />
          </InputWrapper>
        </Group>
        <Button
          leftSection={<IconCarCrane size={20} color="white" />}
          color="green"
          type="submit"
          mt={20}
        >
          {'Gửi Đặt Hàng'}
        </Button>
        <Divider />
        <Stack>
          <Grid bg="green.8" c="white" p={5} mb={2}>
            <Grid.Col span={2}>
              <Text fw={700} size="xs">
                Mã Hàng
              </Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Text fw={700} size="xs">
                Giá CIF Box
              </Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Text fw={700} size="xs">
                Điều Kiện Mua
              </Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Text fw={700} size="xs">
                Được Tặng
              </Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Text fw={700} size="xs">
                Thành Giá
              </Text>
            </Grid.Col>
            <Grid.Col span={2}>
              {/* <Text fw={700} size="xs">
                Thao Tác
              </Text> */}
            </Grid.Col>
          </Grid>
        </Stack>
        <ScrollArea h={600}>
          <TableOrderPurchase
            supplier={supplier}
            handlePurchase={handlePurchaseProduct}
            productPurchase={productPurchase}
          />
        </ScrollArea>
      </Stack>
    </form>
  );
};

export default FormOrderPurchase;
