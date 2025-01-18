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
import { useAppSelector } from '@/store';
import { CreateSubCategoryInput, useCreateNewSubCategory } from '@/services/react-query/subCategory/use-create-subCategory';


const FormCreateSubCategory = () => {
  const {mutate:createNewSubCategory, status} = useCreateNewSubCategory()
  const [loading, setLoading] = useState<boolean>(false)
  const [fileInput, setFileInput] = useState<File | null>(null)
  const {categories} = useAppSelector(state => state.category.category)
  let dataSelectCaterogies = categories?.map((el) => {
    return {
      value: el.category_id,
      label: el.category_name_vn
    }
  })
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
      sub_category_name_de: yup
        .string()
        .required('Hãy điền tên tiếng Đức của danh mục'),
      sub_category_name_eng: yup
        .string()
        .required('Hãy điền tên tiếng Anh của danh mục'),
      sub_category_name_th: yup
        .string()
        .required('Hãy điền tên tiếng Thái của danh mục'),
      sub_category_name_vn: yup
        .string()
        .required('Hãy điền tên tiếng Việt Nam của danh mục'),
      category_id: yup
        .string()
        .required('Hãy chọn nhóm sản phẩm'),
      dph: yup
      .number()
      .transform((_, originalValue) => {
        // Chuyển đổi chuỗi thành số
        return originalValue ? parseInt(originalValue) : null;
      }),
    });
  const form = useForm({
      initialValues: {
        sub_category_name_de: '',
        sub_category_name_eng: '',
        sub_category_name_th: '',
        sub_category_name_vn: '',
        category_id: '',
        dph: 21
      },
      validate: yupResolver(schema),
    });
  const handleSubmit = async (value:CreateSubCategoryInput) => {
    setLoading(true)
    try {
      if(fileInput){
      await uploadFile.mutateAsync(fileInput)
      .then((res) => {
        let url = res.url.split("?")[0]
        createNewSubCategory({...value, image_url:url})
      })
    }else{
      createNewSubCategory(value)
    }
    } catch (error) {
      notifications.show({
          title: 'Tạo danh mục sản phẩm xảy ra lỗi',
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
          <TextInput label="*Tên Tiếng Việt Nam" placeholder="veggie" classNames={classes} {...form.getInputProps('sub_category_name_vn')} name={'sub_category_name_vn'}/>
          <TextInput label="*Tên Tiếng Anh" placeholder="veggie" classNames={classes} {...form.getInputProps('sub_category_name_eng')} name={'sub_category_name_eng'}/>
          <TextInput label="*Tên Tiếng Đức" placeholder="veggie" classNames={classes} {...form.getInputProps('sub_category_name_de')} name={'sub_category_name_de'}/>
          <TextInput label="*Tên Tiếng Thái" placeholder="veggie" classNames={classes} {...form.getInputProps('sub_category_name_th')} name={'sub_category_name_th'}/>
          <NumberInput label="Dph" placeholder="21" classNames={classes} {...form.getInputProps('dph')} name={'dph'}/>
          <Select
            label={<div className='mx-3'>
              *Nhóm Sản Phẩm
            </div>}
            placeholder="Chọn nhóm sản phẩm"
            data={dataSelectCaterogies}
            {...form.getInputProps('category_id')} name={'category_id'}
          />
          <DropZoneImage handlerDrop={dropFile}/>
        </Stack>
        <Button loading={loading} disabled={loading} type="submit" fullWidth className='mt-2' leftSection={<IconPlus style={{ width: '90%', height: '90%' }} stroke={2}/>}>
            Tạo Danh Mục Sản Phẩm Mới
          </Button>
      </form>
    </Box>
  )
}

export default FormCreateSubCategory