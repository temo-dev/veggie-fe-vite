import { useCreateNewCurrency } from '@/services/react-query/currency/use-create-currency'
import { Box, Button, Stack, TextInput } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import * as yup from 'yup';
import classes from './index.module.css'
import { useEffect, useState } from 'react'
import { IconPlus } from '@tabler/icons-react'

const FormCreateCategory = () => {
  const {mutate: createNewCurrency, status} = useCreateNewCurrency()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
      if(status === 'success' || status === 'error'){
        setLoading(false)
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
        .required('Tỷ giá phải là một số')
    });
  const form = useForm({
      initialValues: {
        currency_code: '',
        currency_name: '',
      },
      validate: yupResolver(schema),
    });
  const handleSubmit = (value:any) => {
    createNewCurrency(value)
    setLoading(true)
  }
  return (
    <Box>
      <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
        <Stack>
          <TextInput label="*Tên Loại Tiền" placeholder="euro" classNames={classes} {...form.getInputProps('currency_name')} name={'currency_name'}/>
          <TextInput label="*Mã Đồng Tiền" placeholder="eur" classNames={classes} {...form.getInputProps('currency_code')} name={'currency_code'}/>
          <TextInput label="Tỷ giá hiện tại" placeholder="25" classNames={classes} {...form.getInputProps('exchange_rate')} name={'exchange_rate'}/>
        </Stack>
        <Button loading={loading} disabled={loading} type="submit" fullWidth className='mt-2' leftSection={<IconPlus style={{ width: '90%', height: '90%' }} stroke={2}/>}>
            Tạo Loại Tiền Tệ Mới
          </Button>
      </form>
    </Box>
  )
}

export default FormCreateCategory