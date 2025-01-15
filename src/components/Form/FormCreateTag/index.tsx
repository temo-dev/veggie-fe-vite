import { Box, Button, Stack, TextInput } from '@mantine/core'
import * as yup from 'yup';
import { useForm,yupResolver } from '@mantine/form';
import classes from './index.module.css'
import { IconPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react';
import { modals } from '@mantine/modals';
import { CreateTagInput, useCreateNewTag } from '@/services/react-query/tag/use-create-tag';


const FormCreateTag = () => {
  const {mutate:createNewTag, status} = useCreateNewTag()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    if(status === 'success' || status === 'error'){
      setLoading(false)
      modals.closeAll()
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
  const handleSubmit = (value:CreateTagInput) => {
    createNewTag(value)
    setLoading(true)
  }
  return (
    <Box>
      <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
        <Stack>
          <TextInput label="*Tên Nhãn Sản Phẩm" placeholder="bio" classNames={classes} {...form.getInputProps('tag_name')} name={'tag_name'}/>
          <TextInput label="*Mô Tả Nhãn" placeholder="sản phẩm hữu cơ" classNames={classes} {...form.getInputProps('description')} name={'description'}/>
        </Stack>
        <Button loading={loading} disabled={loading} type="submit" fullWidth className='mt-2' leftSection={<IconPlus style={{ width: '90%', height: '90%' }} stroke={2}/>}>
            Tạo Nhãn Sản Phẩm Mới
          </Button>
      </form>
    </Box>
  )
}

export default FormCreateTag