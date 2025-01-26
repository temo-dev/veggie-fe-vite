import { Box, Button, NumberInput, Select, Stack, TextInput } from '@mantine/core'
import * as yup from 'yup';
import { useForm,yupResolver } from '@mantine/form';
import classes from './index.module.css'
import { IconPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react';
import { modals } from '@mantine/modals';
import { DropZoneImage } from '@/components/DropZone';
import { useGetLinkFileToS3 } from '@/services/s3-aws/get_link_file_s3';
import { notifications } from '@mantine/notifications';
import { CreateSupplierInput, useCreateNewSupplier } from '@/services/react-query/supplier/use-create-supplier';
import { useAppSelector } from '@/store';

const FormCreateSupplier = () => {
  const {mutate:createNewSupplier, status} = useCreateNewSupplier()
  const {currencies} = useAppSelector(state => state.currency.currency)
  const [loading, setLoading] = useState<boolean>(false)
  const [fileInput, setFileInput] = useState<File | null>(null)
  const uploadFile = useGetLinkFileToS3();
  let dataSelectCurrencies = currencies?.map((el) => {
    return {
      value: el.currency_id,
      label: el.currency_name
    }
  })
  useEffect(()=>{
    if(status === 'success' || status === 'error'){
      setLoading(false)
      modals.closeAll()
      setFileInput(null)
    }
  },[status])
  //form
  const schema = yup.object().shape({
    supplier_name: yup
        .string()
        .required('Hãy điền tên nhà cung cấp'),
    supplier_code: yup
        .string()
        .required('Hãy điền mã nhà cung cấp'),
    contact_info: yup
        .string()
        .required('Hãy điền thông tin liên lạc nhà cung cấp'),
    tax_id: yup
        .string()
        .required('Hãy điền mã số thuế nhà cung cấp'),
    email_purchase: yup
        .string()
        .required('Hãy điền email đặt hàng nhà cung cấp'),
    duration_package: yup
        .number()
        .transform((_, originalValue) => {
            // Chuyển đổi chuỗi thành số
            return originalValue ? parseInt(originalValue) : null;
        }),
    currency_id: yup
        .string()
        .required('Hãy điền loại tiền thanh toán cho nhà cung cấp'),
    });
    
  const form = useForm({
      initialValues:{
        contact_info: '',
        currency_id: '',
        description: '',
        duration_package:0,
        email_purchase: '',
        image_url: '',
        note: '',
        supplier_code: '',
        supplier_name: '',
        tax_id: '',
      },
      validate: yupResolver(schema),
    });
  const handleSubmit = async (value:CreateSupplierInput) => {
    setLoading(true)
    try {
      if(fileInput){
      await uploadFile.mutateAsync(fileInput)
      .then((res) => {
        let url = res.url.split("?")[0]
        createNewSupplier({...value, image_url:url})
      })
    }else{
        createNewSupplier(value)
    }
    } catch (error) {
      notifications.show({
          title: 'Tạo thương hiệu xảy ra lỗi',
          message: String(error),
          color: 'red',
          autoClose: 5000,
      })
      setLoading(false)
    }
  }
  const dropFile = (file:File) => {
    setFileInput(file)
  }
  return (
    <Box>
      <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
        <Stack>
          <TextInput label="*Tên Nhà Cung Cấp" placeholder="veggie" classNames={classes} {...form.getInputProps('supplier_name')} name={'supplier_name'}/>
          <TextInput label="*Mã Nhà Cung Cấp" placeholder="veggie" classNames={classes} {...form.getInputProps('supplier_code')} name={'supplier_code'}/>
          <TextInput label="*Thông Tin Nhà Cung Cấp" placeholder="veggie" classNames={classes} {...form.getInputProps('contact_info')} name={'contact_info'}/>
          <TextInput label="*Mã số thuế" placeholder="veggie" classNames={classes} {...form.getInputProps('tax_id')} name={'tax_id'}/>
          <TextInput label="*Email đặt hàng của nhà cung cấp" placeholder="veggie" classNames={classes} {...form.getInputProps('email_purchase')} name={'email_purchase'}/>
          <NumberInput label="Số ngày đóng hàng" placeholder="21" classNames={classes} {...form.getInputProps('duration_package')} name={'duration_package'}/>
          <Select
            label={<div className='mx-3'>
              *Tiền Tệ Thanh Toán 
            </div>}
            placeholder="Chọn tiền tệ thanh toán"
            data={dataSelectCurrencies}
            {...form.getInputProps('currency_id')} name={'currency_id'}
          />
          <TextInput label="Mô tả nhà cung cấp" placeholder="veggie" classNames={classes} {...form.getInputProps('description')} name={'description'}/>
          <TextInput label="Chú Thích" placeholder="veggie" classNames={classes} {...form.getInputProps('note')} name={'note'}/>
          <DropZoneImage handlerDrop={dropFile}/>
        </Stack>
        <Button loading={loading} disabled={loading} type="submit" fullWidth className='mt-2' leftSection={<IconPlus style={{ width: '90%', height: '90%' }} stroke={2}/>}>
            Tạo Thương Hiệu Mới
          </Button>
      </form>
    </Box>
  )
}

export default FormCreateSupplier