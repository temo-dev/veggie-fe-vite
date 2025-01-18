import { Box, Button, Stack, TextInput } from '@mantine/core'
import * as yup from 'yup';
import { useForm,yupResolver } from '@mantine/form';
import classes from './index.module.css'
import { IconPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react';
import { modals } from '@mantine/modals';
import { CreateTagInput, useCreateNewTag } from '@/services/react-query/tag/use-create-tag';
import { useGetLinkFileToS3 } from '@/services/s3-aws/get_link_file_s3';
import { DropZoneImage } from '@/components/DropZone';
import { notifications } from '@mantine/notifications';


const FormCreateTag = () => {
  const {mutate:createNewTag, status} = useCreateNewTag()
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
      description: yup
        .string()
        .required('Hãy điền mô tả nhãn sản phẩm'),
      tag_name: yup
      .string()
      .required('Hãy điền tên nhãn'),
    });
  const form = useForm({
      initialValues: {
        description: '',
        tag_name:'',
      },
      validate: yupResolver(schema),
    });
  const handleSubmit = async (value:CreateTagInput) => {
    setLoading(true)
    try {
          if(fileInput){
          await uploadFile.mutateAsync(fileInput)
          .then((res) => {
            let url = res.url.split("?")[0]
                createNewTag({...value, image_url:url})
          })
        }else{
          createNewTag(value)
        }
        } catch (error) {
          notifications.show({
              title: 'Tạo Tag sản phẩm xảy ra lỗi',
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
          <TextInput label="*Tên Nhãn Sản Phẩm" placeholder="bio" classNames={classes} {...form.getInputProps('tag_name')} name={'tag_name'}/>
          <TextInput label="*Mô Tả Nhãn" placeholder="sản phẩm hữu cơ" classNames={classes} {...form.getInputProps('description')} name={'description'}/>
          <DropZoneImage handlerDrop={dropFile}/>
        </Stack>
        <Button loading={loading} disabled={loading} type="submit" fullWidth className='mt-2' leftSection={<IconPlus style={{ width: '90%', height: '90%' }} stroke={2}/>}>
            Tạo Nhãn Sản Phẩm Mới
          </Button>
      </form>
    </Box>
  )
}

export default FormCreateTag