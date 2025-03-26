// import { Box, Button, Divider, Grid, NumberInput, Select, Stack, Switch, TextInput, Title } from '@mantine/core'
// import * as yup from 'yup';
// import { useForm, yupResolver } from '@mantine/form';
// import classes from './index.module.css'
// import { IconPlus } from '@tabler/icons-react'
// import { useEffect, useState } from 'react';
// import { modals } from '@mantine/modals';
// import { useGetLinkFileToS3 } from '@/services/s3-aws/get_link_file_s3';
// import { DropZoneImage } from '@/components/DropZone';
// import { notifications } from '@mantine/notifications';
// import { CreateProductInput, useCreateNewProduct } from '@/services/react-query/product/use-create-product';
// import { useAppSelector } from '@/store';


// const FormCreateProduct = () => {
//   const {mutate:createNewProduct, status} = useCreateNewProduct()
//   const [loading, setLoading] = useState<boolean>(false)
//   const [fileInput, setFileInput] = useState<File | null>(null)
//   const uploadFile = useGetLinkFileToS3();
//   const dataSelectSeason = [
//     {
//       value: 'summer',
//       label: 'Mùa Hè'
//     },
//     {
//       value: 'winter',
//       label: 'Mùa Đông'
//     },
//     {
//       value: 'spring',
//       label: 'Mùa Xuân'
//     },
//     {
//       value: 'autumn',
//       label: 'Mùa Thu'
//     },
//     {
//       value: 'all',
//       label: 'Tất Cả'
//     }
//   ]

//   useEffect(()=>{
//     if(status === 'success' || status === 'error'){
//       setLoading(false)
//       modals.closeAll()
//       setFileInput(null)
//     }
//   },[status])
  
//   //form
//   const schema = yup.object().shape({
//       product_code: yup
//         .string()
//         .required('Hãy điền mã sản phẩm'),
//       product_name_vn: yup
//         .string()
//         .required('Hãy điền tên tiếng việt'),
//       product_name_eng: yup
//         .string()
//         .required('Hãy điền tên tiếng anh'),
//       product_name_th: yup
//         .string()
//         .required('Hãy điền tên tiếng thái'),
//       product_name_de: yup
//         .string()
//         .required('Hãy điền tên tiếng đức'),
//       product_name_cz: yup
//         .string()
//         .required('Hãy điền tên tiếng séc'),
//       brand_id: yup
//         .string()
//         .required('Hãy chọn thương hiệu cho sản phẩm'),
//       sub_category_id: yup
//         .string()
//         .required('Hãy chọn danh mục cho sản phẩm'),
//       season: yup
//         .string()
//         .required('Hãy chọn mùa cho sản phẩm'),
//       cubic: yup
//         .number()
//         .transform((_, originalValue) => {
//           // Chuyển đổi chuỗi thành số
//           return originalValue ? parseInt(originalValue) : null;
//           }),
//       shelf_life: yup
//         .number()
//         .transform((_, originalValue) => {
//           // Chuyển đổi chuỗi thành số
//           return originalValue ? parseInt(originalValue) : null;
//       }),
//       net_weight: yup
//         .number()
//         .transform((_, originalValue) => {
//           // Chuyển đổi chuỗi thành số
//           return originalValue ? parseInt(originalValue) : null;
//       }),
//       gross_weight: yup
//         .number()
//         .transform((_, originalValue) => {
//           // Chuyển đổi chuỗi thành số
//           return originalValue ? parseInt(originalValue) : null;
//       })
//   });
//   const form = useForm({
//       initialValues: {
//         brand_id: '',
//         cubic: 0,
//         description: '',
//         dph: 0,
//         image_url: '',
//         is_fragility: false,
//         is_stackability: false,
//         height: 0,
//         length: 0,
//         width: 0,
//         maximum_order_quantity: 0,
//         minimum_order_quantity: 0,
//         net_weight: 0,
//         gross_weight: 0,
//         note: '',
//         pre_order: true,
//         product_code: '',
//         product_name_de: '',
//         product_name_eng: '',
//         product_name_th: '',
//         product_name_vn: '',
//         product_name_cz: '',
//         reorder_level: 0,
//         season: '',
//         shelf_life: 0,
//         status: '',
//         sub_category_id: '',
//         temperature_requirement: 0,
//         total_quantity: 0,
//       },
//       validate: yupResolver(schema),
//     });
//   const handleSubmit = async (value:CreateProductInput) => {
//     setLoading(true)
//     try {
//       if(fileInput){
//         await uploadFile.mutateAsync(fileInput)
//         .then((res) => {
//           let url = res.url.split("?")[0]
//           createNewProduct({...value, image_url:url})
//         })
//       }else{
//         createNewProduct(value)
//       }
//     } catch (error) {
//         notifications.show({
//             title: 'Tạo sản phẩm xảy ra lỗi',
//             message: String(error),
//             color: 'red',
//             autoClose: 5000,
//         })
//         setLoading(false)
//     }
//   }
//   const dropFile = (file:File) => {
//     setFileInput(file)
//   }
//   return (
//     <Box>
//       <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
//         <Grid>
//           <Grid.Col span={6}>
//             <Stack>
//               <Divider/>
//               <Title order={5}>Thông Tin Chung</Title>
//               <TextInput label="*Mã Sản Phẩm" classNames={classes} {...form.getInputProps('product_code')} name={'product_code'}/>
//               <TextInput label="*Tên Tiếng Việt" classNames={classes} {...form.getInputProps('product_name_vn')} name={'product_name_vn'}/>
//               <TextInput label="*Tên Tiếng Thái" classNames={classes} {...form.getInputProps('product_name_th')} name={'product_name_th'}/>
//               <TextInput label="*Tên Tiếng Anh" classNames={classes} {...form.getInputProps('product_name_eng')} name={'product_name_eng'}/>
//               <TextInput label="*Tên Tiếng Đức" classNames={classes} {...form.getInputProps('product_name_de')} name={'product_name_de'}/>
//               <TextInput label="*Tên Tiếng Séc" classNames={classes} {...form.getInputProps('product_name_cz')} name={'product_name_cz'}/>
//               <Select
//                 label={<div className='mx-3'>
//                   *Chọn mùa cho sản phẩm
//                 </div>}
//                 data={dataSelectSeason}
//                 {...form.getInputProps('season')} name={'season'}
//               />
//             </Stack>
//           </Grid.Col>
//           <Grid.Col span={6}>
//             <Stack>
//               <Divider/>
//               <Title order={5}>Chỉ Số Sản Phẩm</Title>
//               <NumberInput label="*Trọng Lượng" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('net_weight')} name={'net_weight'}/>
//               <NumberInput label="*Trọng Lượng Cả Bao Bì" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('gross_weight')} name={'gross_weight'}/>
//               <NumberInput label="*Cubic" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('cubic')} name={'cubic'}/>
//               <NumberInput label="Chiều Dài" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('length')} name={'length'}/>
//               <NumberInput label="Chiều Cao" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('height')} name={'height'}/>
//               <NumberInput label="Chiều Rộng" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('width')} name={'width'}/>
//             </Stack>
//           </Grid.Col>
//           <Grid.Col span={6}>
//             <Stack>
//               <Divider/>
//               <Title order={5}>Thông Tin Mở Rộng</Title>
//               <TextInput label="Ghi Chú Sản Phẩm" classNames={classes} {...form.getInputProps('note')} name={'note'}/>
//               <TextInput label="Mô Tả Sản Phẩm" classNames={classes} {...form.getInputProps('description')} name={'description'}/>
//               <NumberInput label="Dph" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('dph')} name={'dph'}/>
//               <NumberInput label="Số Lượng Tối Đa Được Đặt" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('maximum_order_quantity')} name={'maximum_order_quantity'}/>
//               <NumberInput label="Số Lượng Tối Thiểu Được Đặt" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('minimum_order_quantity')} name={'minimum_order_quantity'}/>
//               <NumberInput label="Mức đặt tối thiểu" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('reorder_level')} name={'reorder_level'}/>
//               <NumberInput label="Số lượng hiện có" clampBehavior="strict" min={0} classNames={classes} {...form.getInputProps('total_quantity')} name={'total_quantity'}/>
//             </Stack>
//           </Grid.Col>
//           <Grid.Col span={6}>
//             <Stack>
//               <Divider/>
//               <Title order={5}>Thông Tin Bảo Quản</Title>
//               <NumberInput label="Nhiệt Độ Bảo Quản" classNames={classes} {...form.getInputProps('temperature_requirement')} name={'temperature_requirement'}/>
//               <NumberInput label="*Vòng đời sản phẩm" classNames={classes} {...form.getInputProps('shelf_life')} name={'shelf_life'}/>
//               <Switch
//                 label="Sản Phẩm Dễ Vỡ"
//                 {...form.getInputProps('is_fragility')} name={'is_fragility'}
//               />
//               <Switch
//                 label="Xếp trồng lên được"
//                 {...form.getInputProps('is_stackability')} name={'is_stackability'}
//               />
//               <Switch
//                 label="Hàng Đặt Trước"
//                 defaultChecked={true}
//                 {...form.getInputProps('pre_order')} name={'pre_order'}
//               />
//             </Stack>
//           </Grid.Col>
//         </Grid>
//         <div className='max-w-4xl'>
//           <DropZoneImage handlerDrop={dropFile}/>
//         </div>
//         <Button loading={loading} disabled={loading} type="submit" fullWidth className='mt-2' leftSection={<IconPlus style={{ width: '90%', height: '90%' }} stroke={2}/>}>
//             Tạo Nhãn Sản Phẩm Mới
//           </Button>
//       </form>
//     </Box>
//   )
// }

// export default FormCreateProduct