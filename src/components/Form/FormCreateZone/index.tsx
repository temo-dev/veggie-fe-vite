import { Box, Button, Stack, TextInput } from '@mantine/core'
import * as yup from 'yup';
import { useForm,yupResolver } from '@mantine/form';
import classes from './index.module.css'
import { IconPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react';
import { modals } from '@mantine/modals';
import { CreateZoneInput, useCreateNewZone } from '@/services/react-query/zone/use-create-zone';


const FormCreateZone = () => {
  const {mutate:createNewZone, status} = useCreateNewZone()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    if(status === 'success' || status === 'error'){
      setLoading(false)
      modals.closeAll()
    }
  },[status])
  
  //form
  const schema = yup.object().shape({
      zone_name: yup
      .string()
      .required('Hãy điền mã zone'),
    });
  const form = useForm({
      initialValues: {
        zone_name:'',
      },
      validate: yupResolver(schema),
    });
  const handleSubmit = async (value:CreateZoneInput) => {
    setLoading(true)
    createNewZone(value)
  }
  return (
    <Box>
      <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
        <Stack>
          <TextInput label="*Mã Zone" placeholder="zone13" classNames={classes} {...form.getInputProps('zone_name')} name={'zone_name'}/>
        </Stack>
        <Button loading={loading} disabled={loading} type="submit" fullWidth className='mt-2' leftSection={<IconPlus style={{ width: '90%', height: '90%' }} stroke={2}/>}>
            Tạo Zone Khách Hàng Mới
        </Button>
      </form>
    </Box>
  )
}

export default FormCreateZone