import { Box, Button, Divider, Grid, NumberInput, Select, Stack, Switch, TextInput, Title } from '@mantine/core'
import * as yup from 'yup';
import { useForm,yupResolver } from '@mantine/form';
import classes from './index.module.css'
import { IconPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react';
import { modals } from '@mantine/modals';
import { DateInput } from '@mantine/dates';
import { useGetLinkFileToS3 } from '@/services/s3-aws/get_link_file_s3';
import { DropZoneImage } from '@/components/DropZone';
import { notifications } from '@mantine/notifications';
import { CreateProductInput, useCreateNewProduct } from '@/services/react-query/product/use-create-product';
import { useAppSelector } from '@/store';


const FormCreateProduct = () => {
  const {mutate:createNewProduct, status} = useCreateNewProduct()
  const [loading, setLoading] = useState<boolean>(false)
  const [fileInput, setFileInput] = useState<File | null>(null)
  const uploadFile = useGetLinkFileToS3();
  const {brands} = useAppSelector(state => state.brand.brand)
  const{subCategories} = useAppSelector(state => state.subCategory.subCategory)
  const {attPackages} = useAppSelector(state => state.attpackage.attPackage)

  const dataSelectAttPackages = attPackages?.map((el) => {
    return {
      value: el.attitude_product_package_id,
      label: el.attitude_product_package_code
    }
  })

  const dataSelectSubCategories = subCategories?.map((el) => {
    return {
      value: el.sub_category_id,
      label: el.sub_category_name_vn
    }
  })
  const dataSelectBrands = brands?.map((el) => {
    return {
      value: el.brand_id,
      label: el.brand_name
    }
  })
  const dataSelectLen =[
    {
      value: 'cm',
      label: 'cm'
    },
    {
      value: 'inch',
      label: 'inch'
    }
  ]

  const dataSelectSeason = [
    {
      value: 'summer',
      label: 'Mùa Hè'
    },
    {
      value: 'winter',
      label: 'Mùa Đông'
    },
    {
      value: 'spring',
      label: 'Mùa Xuân'
    },
    {
      value: 'autumn',
      label: 'Mùa Thu'
    },
    {
      value: 'all',
      label: 'Tất Cả'
    }
  ]

  useEffect(()=>{
    if(status === 'success' || status === 'error'){
      setLoading(false)
      modals.closeAll()
      setFileInput(null)
    }
  },[status])
  
  //form
  const schema = yup.object().shape({
      product_code: yup
        .string()
        .required('Hãy điền mã sản phẩm'),
      product_name_vn: yup
        .string()
        .required('Hãy điền tên tiếng việt'),
      product_name_eng: yup
        .string()
        .required('Hãy điền tên tiếng anh'),
      product_name_th: yup
        .string()
        .required('Hãy điền tên tiếng thái'),
      product_name_de: yup
        .string()
        .required('Hãy điền tên tiếng đức'),
      brand_id: yup
        .string()
        .required('Hãy chọn thương hiệu cho sản phẩm'),
      sub_category_id: yup
        .string()
        .required('Hãy chọn danh mục cho sản phẩm'),
      season: yup
        .string()
        .required('Hãy chọn mùa cho sản phẩm'),
      len: yup
        .string()
        .required('Hãy chọn đơn bị đo'),
      cubic: yup
          .number()
          .transform((_, originalValue) => {
            // Chuyển đổi chuỗi thành số
            return originalValue ? parseInt(originalValue) : null;
          }),
      published_at: yup
          .date()
          .transform((_, originalValue) => {
            return new Date(originalValue);
          })
  });
  const form = useForm({
      initialValues: {
        attitude_product_package_id: '',
        brand_id: '',
        cubic: 0,
        description: '',
        dph: 0,
        image_url: '',
        is_fragility: false,
        is_stackability: false,
        len:'',
        height: 0,
        length: 0,
        width: 0,
        maximum_order_quantity: 0,
        minimum_order_quantity: 0,
        net_weight: 0,
        gross_weight: 0,
        note: '',
        pre_order: false,
        product_code: '',
        product_name_de: '',
        product_name_eng: '',
        product_name_th: '',
        product_name_vn: '',
        published_at: new Date(),
        reorder_level: 0,
        season: '',
        shelf_life: 0,
        status: '',
        sub_category_id: '',
        temperature_requirement: 0,
        total_quantity: 0,
      },
      validate: yupResolver(schema),
    });
  const handleSubmit = async (value:CreateProductInput) => {
    console.log('value',value)
    setLoading(true)
    try {
      if(fileInput){
        await uploadFile.mutateAsync(fileInput)
        .then((res) => {
          let url = res.url.split("?")[0]
          createNewProduct({...value, image_url:url})
        })
      }else{
        createNewProduct(value)
      }
    } catch (error) {
        notifications.show({
            title: 'Tạo sản phẩm xảy ra lỗi',
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
        <Grid>
          <Grid.Col span={6}>
            <Stack>
              <Divider/>
              <Title order={5}>Thông Tin Chung</Title>
              <TextInput label="*Mã Sản Phẩm" placeholder="veggie" classNames={classes} {...form.getInputProps('product_code')} name={'product_code'}/>
              <TextInput label="*Tên Tiếng Việt" placeholder="veggie" classNames={classes} {...form.getInputProps('product_name_vn')} name={'product_name_vn'}/>
              <TextInput label="*Tên Tiếng Thái" placeholder="veggie" classNames={classes} {...form.getInputProps('product_name_th')} name={'product_name_th'}/>
              <TextInput label="*Tên Tiếng Anh" placeholder="veggie" classNames={classes} {...form.getInputProps('product_name_eng')} name={'product_name_eng'}/>
              <TextInput label="*Tên Tiếng Đức" placeholder="veggie" classNames={classes} {...form.getInputProps('product_name_de')} name={'product_name_de'}/>
              <Select
                label={<div className='mx-3'>
                  *Nhóm thương hiệu
                </div>}
                placeholder="Chọn thương hiệu"
                data={dataSelectBrands}
                {...form.getInputProps('brand_id')} name={'brand_id'}
              />
              <Select
                label={<div className='mx-3'>
                  *Chọn danh mục
                </div>}
                placeholder="*Chọn danh mục"
                data={dataSelectSubCategories}
                {...form.getInputProps('sub_category_id')} name={'sub_category_id'}
              />
              <Select
                label={<div className='mx-3'>
                  *Chọn mùa cho sản phẩm
                </div>}
                placeholder="*Chọn mùa cho sản phẩm"
                data={dataSelectSeason}
                {...form.getInputProps('season')} name={'season'}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <Divider/>
              <Title order={5}>Chỉ Số Sản Phẩm</Title>
              <NumberInput label="Trọng Lượng" placeholder="100" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('net_weight')} name={'net_weight'}/>
              <NumberInput label="Trọng Lượng Cả Bao Bì" placeholder="100" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('gross_weight')} name={'gross_weight'}/>
              <Select
                label={<div className='mx-3'>
                  *Chọn đơn vị đo
                </div>}
                placeholder="*Chọn đơn vị đo"
                data={dataSelectLen}
                {...form.getInputProps('len')} name={'len'}
              />
              <NumberInput label="*Cubic" placeholder="100" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('cubic')} name={'cubic'}/>
              <NumberInput label="Chiều Dài" placeholder="100" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('length')} name={'length'}/>
              <NumberInput label="Chiều Cao" placeholder="100" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('height')} name={'height'}/>
              <NumberInput label="Chiều Rộng" placeholder="100" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('width')} name={'width'}/>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <Divider/>
              <Title order={5}>Thông Tin Mở Rộng</Title>
              <TextInput label="Ghi Chú Sản Phẩm" placeholder="veggie" classNames={classes} {...form.getInputProps('note')} name={'note'}/>
              <TextInput label="Mô Tả Sản Phẩm" placeholder="veggie" classNames={classes} {...form.getInputProps('description')} name={'description'}/>
              <NumberInput label="Dph" placeholder="21" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('dph')} name={'dph'}/>
              <NumberInput label="Số Lượng Tối Đa Được Đặt" placeholder="100" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('maximum_order_quantity')} name={'maximum_order_quantity'}/>
              <NumberInput label="Số Lượng Tối Thiểu Được Đặt" placeholder="100" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('minimum_order_quantity')} name={'minimum_order_quantity'}/>
              <NumberInput label="Mức đặt tối thiểu" placeholder="50" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('reorder_level')} name={'reorder_level'}/>
              <DateInput
                label="Ngày Triển Khai"
                placeholder="00/00/0000"
                {...form.getInputProps('published_at')} name={'published_at'}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <Divider/>
              <Title order={5}>Thông Tin Bảo Quản</Title>
              <Select
                label={<div className='mx-3'>
                  Loại Thùng
                </div>}
                placeholder="Chọn loại thùng cho sản phẩm"
                data={dataSelectAttPackages}
                {...form.getInputProps('attitude_product_package_id')} name={'attitude_product_package_id'}
              />
              <NumberInput label="Nhiệt Độ Bảo Quản" placeholder="20" classNames={classes} {...form.getInputProps('temperature_requirement')} name={'temperature_requirement'}/>
              <NumberInput label="Vòng đời sản phẩm" placeholder="60" classNames={classes} {...form.getInputProps('shelf_life')} name={'shelf_life'}/>
              <Switch
                label="Sản Phẩm Dễ Vỡ"
                {...form.getInputProps('is_fragility')} name={'is_fragility'}
              />
              <Switch
                label="Xếp trồng lên được"
                {...form.getInputProps('is_stackability')} name={'is_stackability'}
              />
              <Switch
                label="Hàng Đặt Trước"
                {...form.getInputProps('pre_order')} name={'pre_order'}
              />
            </Stack>
          </Grid.Col>
        </Grid>
        <div className='max-w-4xl'>
          <DropZoneImage handlerDrop={dropFile}/>
        </div>
        <Button loading={loading} disabled={loading} type="submit" fullWidth className='mt-2' leftSection={<IconPlus style={{ width: '90%', height: '90%' }} stroke={2}/>}>
            Tạo Nhãn Sản Phẩm Mới
          </Button>
      </form>
    </Box>
  )
}

export default FormCreateProduct