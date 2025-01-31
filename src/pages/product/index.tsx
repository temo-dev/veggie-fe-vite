import classes from './index.module.css'
import { Card, Avatar, Group, Button,Text, Grid, Stack, Container, Title, Tabs, Menu, FileButton, UnstyledButton, Divider, Pagination } from '@mantine/core'
import { IconBrandVinted, IconCategoryPlus, IconDownload, IconPlus, IconUpload } from '@tabler/icons-react';
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import LineProductChart from '@/components/Report/LineProductChart';
import { useElementSize } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import TableProduct from '@/components/Table/TableProduct';
import FormCreateProduct from '@/components/Form/FormCreateProduct';
import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { useGetLinkFileToS3 } from '@/services/s3-aws/get_link_file_s3';
import { ImportExcelType, useImportExcel } from '@/services/react-query/import-excel/use-import-exel';
import { notifications } from '@mantine/notifications';
import { useFindAllProduct } from '@/services/react-query/product/use-find-all-product';

const ProductPage = () => {
  const { ref, width } = useElementSize();
  const {products} = useAppSelector((state)=>state.product.product)
  const {subCategories} = useAppSelector((state)=>state.subCategory.subCategory)
  const [loading, setLoading] = useState<boolean>(false)
  const [activePage, setPage] = useState<number>(1);
  const uploadFile = useGetLinkFileToS3()
  const {mutate: importExcel, status } =useImportExcel()
  const {status: statusProduct} = useFindAllProduct(10,activePage)
  //mock data
  const dataSubCategories = subCategories.map((subCategory)=>{
    return {
      value: subCategory.product_count,
      name: subCategory.sub_category_name_vn.toUpperCase()
    }
  })
  const dataTab = [
    {
      id:1,
      name:"Sản Phẩm",
      description:"Danh sách sản phẩm",
      icon: <IconCategoryPlus size={20}/>,
      table: <TableProduct data={products} minWidth={width}/>
    },
  ]
  //effect
  useEffect(()=>{
      if(
          status === 'success' 
          || status === 'error' 
          || statusProduct === 'success' || 
          statusProduct === 'error'
        ){
        setLoading(false)
      }
    },[status])
  //logic
  const handleImport = async (file: File | null) => {
    let value: ImportExcelType ={
      to_table:"product",
      excel_url:""
    }
    setLoading(true)
    try {
      if(file){
        await uploadFile.mutateAsync(file)
        .then((res) => {
          let url = res.url.split("?")[0]
          importExcel({...value, excel_url:url})
        })
      }
    } catch (error) {
      notifications.show({
          title: 'Import Excel hiệu xảy ra lỗi',
          message: String(error),
          color: 'red',
          autoClose: 5000,
      })
      setLoading(false)
    }
  }
  const openModal = (el:any) => {
    modals.open({
      title: (
        <Group>
          <Avatar variant='transparent'>
            {el.icon}
          </Avatar>
          <Title order={5} >{`TẠO ${el.name.toUpperCase()}`}</Title>
        </Group>
      ),
      children: <FormCreateProduct/>,
      size:"auto",
    });
  }
  //render
  return (
    <div ref={ref}>
      <Stack>
        <Group>
          <Button variant="default" leftSection={<IconPlus size={20} />} onClick={()=>openModal({name:"Sản Phẩm",icon:<IconBrandVinted size={20}/>})}>
            Thêm Sản Phẩm
          </Button>
          <FileButton onChange={handleImport} accept=".xlsx, .xls" multiple={false}>
            {(props) => (
              <Button {...props} leftSection={<IconUpload size={20} />} variant='default' loading={loading}>
                Import Excel
              </Button>
            )}
          </FileButton>
        </Group>
        <Grid>
          <Grid.Col span={6}>
            <TotalCategoryPieChart title="Danh mục hàng hóa" data={dataSubCategories}/>
          </Grid.Col>
          <Grid.Col span={6}>
            <LineProductChart title='Giá Hàng Hóa Nhập'/>
          </Grid.Col>
        </Grid>
        <Container fluid size="responsive" w={width}>
          <Card shadow="xs"radius="md">
            <Tabs defaultValue={`${dataTab[0].name}`}>
              <Tabs.List>
                {
                  dataTab.map((tab)=>(
                    <Tabs.Tab value={tab.name} key={tab.id} leftSection={tab.icon} className='font-bold'>
                    {tab.name.toUpperCase()}
                  </Tabs.Tab>
                  ))
                }
              </Tabs.List>
                {
                  dataTab.map((tab)=>(
                    <Tabs.Panel value={tab.name} key={tab.id} className='min-h-80'>
                      {tab.table}
                    </Tabs.Panel>
                  ))
                }
              </Tabs>
              <Divider/>
              <Pagination total={3} value={activePage} onChange={setPage} mt="md" size="xs" disabled={loading}/>
          </Card>
        </Container>
      </Stack>
    </div>
  )
}

export default ProductPage