import { Box, Button, NumberInput, Stack, TextInput } from '@mantine/core'
import * as yup from 'yup';
import { useForm,yupResolver } from '@mantine/form';
import classes from './index.module.css'
import { IconPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react';
import { CreateCurrencyInput, useCreateNewCurrency } from '@/services/react-query/currency/use-create-currency';
import { modals } from '@mantine/modals';



const FormCreateCurrency = () => {
  const {mutate: createNewCurrency, status} = useCreateNewCurrency()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    if(status === 'success' || status === 'error'){
      setLoading(false)
      modals.closeAll()
    }
  },[status])
  
  //form
  const schema = yup.object().shape({
      currency_code: yup
        .string()
        .required('Hãy Điền Mã Loại Đồng Tiền'),
      currency_name: yup
      .string()
      .required('Hãy Điền Tên Loại Đồng Tiền'),
      exchange_rate: yup
        .number()
        .transform((_, originalValue) => {
          // Chuyển đổi chuỗi thành số
          return originalValue ? parseFloat(originalValue) : null;
        })
        .required('Tỷ giá phải là một số')
    });
  const form = useForm({
      initialValues: {
        currency_code: '',
        currency_name: '',
      },
      validate: yupResolver(schema),
    });
  const handleSubmit = (value:CreateCurrencyInput) => {
    createNewCurrency(value)
    setLoading(true)
  }
  return (
    <Box>
      <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
        <Stack>
          <TextInput label="*Tên Loại Tiền" placeholder="euro" classNames={classes} {...form.getInputProps('currency_name')} name={'currency_name'}/>
          <TextInput label="*Mã Đồng Tiền" placeholder="eur" classNames={classes} {...form.getInputProps('currency_code')} name={'currency_code'}/>
          <NumberInput label="Tỷ giá hiện tại" placeholder="25" classNames={classes} {...form.getInputProps('exchange_rate')} name={'exchange_rate'}/>
        </Stack>
        <Button loading={loading} disabled={loading} type="submit" fullWidth className='mt-2' leftSection={<IconPlus style={{ width: '90%', height: '90%' }} stroke={2}/>}>
            Tạo Loại Tiền Tệ Mới
          </Button>
      </form>
    </Box>
  )
}

export default FormCreateCurrency