import { Box, Button, NumberInput, Stack, TextInput } from '@mantine/core'
import * as yup from 'yup';
import { useForm,yupResolver } from '@mantine/form';
import classes from './index.module.css'
import { IconPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react';
import { modals } from '@mantine/modals';
import { CreatePackageInput, useCreateNewPackage } from '@/services/react-query/attPackage/use-create-package';


const FormCreatePackage = () => {
  const {mutate:createNewPackage, status} = useCreateNewPackage()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    if(status === 'success' || status === 'error'){
      setLoading(false)
      modals.closeAll()
    }
  },[status])
  
  //form
  const schema = yup.object().shape({
      attitude_product_package_code: yup
        .string()
        .required('Hãy điền mã thùng sản phẩm'),
      package_length: yup
        .string()
        .required('Hãy điền đơn vị tính'),
      package_cubic: yup
        .number()
        .transform((_, originalValue) => {
          // Chuyển đổi chuỗi thành số
          return originalValue ? parseFloat(originalValue) : null;
        })
        .required('Hãy điền thể tích (cubic)'),
      package_height: yup
        .number()
        .transform((_, originalValue) => {
          // Chuyển đổi chuỗi thành số
          return originalValue ? parseFloat(originalValue) : null;
        }),
      package_width: yup
        .number()
        .transform((_, originalValue) => {
          // Chuyển đổi chuỗi thành số
          return originalValue ? parseFloat(originalValue) : null;
        })
    });
  const form = useForm({
      initialValues: {
        attitude_product_package_code:'',
        package_length: 'cm',
      },
      validate: yupResolver(schema),
    });
  const handleSubmit = (value:CreatePackageInput) => {
    createNewPackage(value)
    setLoading(true)
  }
  return (
    <Box>
      <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
        <Stack>
          <TextInput label="*Mã Thùng Sản Phẩm" placeholder="do mình tự quy định" classNames={classes} {...form.getInputProps('attitude_product_package_code')} name={'attitude_product_package_code'}/>
          <TextInput label="*Đơn vị tính" placeholder="cm" classNames={classes} {...form.getInputProps('package_length')} name={'package_length'}/>
          <NumberInput label="*Cubic" placeholder="25" classNames={classes} {...form.getInputProps('package_cubic')} name={'package_cubic'}/>
          <NumberInput label="Chiều Cao" placeholder="25" classNames={classes} {...form.getInputProps('package_height')} name={'package_height'}/>
          <NumberInput label="Chiều Rộng" placeholder="25" classNames={classes} {...form.getInputProps('package_width')} name={'package_width'}/>
        </Stack>
        <Button loading={loading} disabled={loading} type="submit" fullWidth className='mt-2' leftSection={<IconPlus style={{ width: '90%', height: '90%' }} stroke={2}/>}>
            Tạo Loại Thùng Mới Cho Sản Phẩm
          </Button>
      </form>
    </Box>
  )
}

export default FormCreatePackage