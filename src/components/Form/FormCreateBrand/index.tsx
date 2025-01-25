import { Box, Button, Stack, TextInput } from '@mantine/core'
import * as yup from 'yup';
import { useForm,yupResolver } from '@mantine/form';
import classes from './index.module.css'
import { IconPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react';
import { modals } from '@mantine/modals';
import { DropZoneImage } from '@/components/DropZone';
import { useGetLinkFileToS3 } from '@/services/s3-aws/get_link_file_s3';
import { notifications } from '@mantine/notifications';
import { CreateBrandInput, useCreateNewBrand } from '@/services/react-query/brand/use-create-brand';

const FormCreateBrand = () => {
  const {mutate:createNewBrand, status} = useCreateNewBrand()
  const [loading, setLoading] = useState<boolean>(false)
  const [fileInput, setFileInput] = useState<File | null>(null)
  const uploadFile = useGetLinkFileToS3();

  useEffect(()=>{
    if(status === 'success' || status === 'error'){
      setLoading(false)
      modals.closeAll()
      setFileInput(null)
    }
  },[status])
  //form
  const schema = yup.object().shape({
    brand_name: yup
        .string()
        .required('Hãy điền tên thương hiệu'),
    });
  const form = useForm({
      initialValues:{
        brand_name:'',
        description:'',
      },
      validate: yupResolver(schema),
    });
  const handleSubmit = async (value:CreateBrandInput) => {
    setLoading(true)
    try {
      if(fileInput){
      await uploadFile.mutateAsync(fileInput)
      .then((res) => {
        let url = res.url.split("?")[0]
        createNewBrand({...value, image_url:url})
      })
    }else{
      createNewBrand(value)
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
          <TextInput label="*Tên Thương Hiệu" placeholder="bio" classNames={classes} {...form.getInputProps('brand_name')} name={'brand_name'}/>
          <TextInput label="Chú Thích" placeholder="bio" classNames={classes} {...form.getInputProps('description')} name={'description'}/>
          <DropZoneImage handlerDrop={dropFile}/>
        </Stack>
        <Button loading={loading} disabled={loading} type="submit" fullWidth className='mt-2' leftSection={<IconPlus style={{ width: '90%', height: '90%' }} stroke={2}/>}>
            Tạo Thương Hiệu Mới
          </Button>
      </form>
    </Box>
  )
}

export default FormCreateBrand