import { Box, Button, Stack, TextInput,Text } from '@mantine/core'
import * as yup from 'yup';
import { useForm,yupResolver } from '@mantine/form';
import classes from './index.module.css'
import { IconPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react';
import { modals } from '@mantine/modals';
import { CreateCategoryInput, useCreateNewCategory } from '@/services/react-query/category/use-create-category';
import { DropZone } from '@/components/DropZone';


const FormCreateCategory = () => {
  const {mutate:createNewCategory, status} = useCreateNewCategory()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    if(status === 'success' || status === 'error'){
      setLoading(false)
      modals.closeAll()
    }
  },[status])
  
  //form
  const schema = yup.object().shape({
      category_name_de: yup
        .string()
        .required('Hãy điền tên tiếng Đức của sản phẩm'),
      category_name_eng: yup
        .string()
        .required('Hãy điền tên tiếng Anh của sản phẩm'),
      category_name_th: yup
        .string()
        .required('Hãy điền tên tiếng Thái của sản phẩm'),
      category_name_vn: yup
        .string()
        .required('Hãy điền tên tiếng Việt Nam của sản phẩm'),
    });
  const form = useForm({
      validate: yupResolver(schema),
    });
  const handleSubmit = (value:CreateCategoryInput) => {
    createNewCategory(value)
    setLoading(true)
  }
  return (
    <Box>
      <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
        <Stack>
          <TextInput label="*Tên Tiếng Việt Nam" placeholder="bio" classNames={classes} {...form.getInputProps('category_name_vn')} name={'category_name_vn'}/>
          <TextInput label="*Tên Tiếng Anh" placeholder="bio" classNames={classes} {...form.getInputProps('category_name_eng')} name={'category_name_eng'}/>
          <TextInput label="*Tên Tiếng Đức" placeholder="bio" classNames={classes} {...form.getInputProps('category_name_de')} name={'category_name_de'}/>
          <TextInput label="Tên Tiếng Thái" placeholder="bio" classNames={classes} {...form.getInputProps('category_name_th')} name={'category_name_th'}/>
          <DropZone/>
        </Stack>
        <Button loading={loading} disabled={loading} type="submit" fullWidth className='mt-2' leftSection={<IconPlus style={{ width: '90%', height: '90%' }} stroke={2}/>}>
            Tạo Nhóm Sản Phẩm Mới
          </Button>
      </form>
    </Box>
  )
}

export default FormCreateCategory