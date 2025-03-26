
import { Card, Avatar, Group, Button, Grid, Stack, Container, Title, Tabs, FileButton, Divider, Pagination, Input } from '@mantine/core'
import { IconBrandVinted, IconCategoryPlus, IconPlus, IconSearch, IconUpload } from '@tabler/icons-react';
import { getHotkeyHandler } from '@mantine/hooks';
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import LineProductChart from '@/components/Report/LineProductChart';
import { useElementSize } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import TableProduct from '@/components/Table/TableProduct';
import FormCreateProduct from '@/components/Form/FormCreateProduct';
import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { useGetLinkFileToS3 } from '@/services/s3-aws/get_link_file_s3';
import { notifications } from '@mantine/notifications';
import { useFindAllProduct } from '@/services/react-query/product/use-find-all-product';

const ProductPage = () => {
  const { ref, width } = useElementSize();
  const {products} = useAppSelector((state)=>state.product.product)
  const [loading, setLoading] = useState<boolean>(false)
  const [activePage, setPage] = useState<number>(1);
  const [valueSearch, setValueSearch] = useState<string>('')
  const [valueConfirm, setValueConfirm] = useState<string>('')
  const uploadFile = useGetLinkFileToS3()
  const [totalPage, setTotalPage] = useState<number>(0)
  const {status: statusProduct} = useFindAllProduct(10,activePage,valueConfirm)
  //mock data
  // const dataSubCategories = subCategories.map((subCategory)=>{
  //   return {
  //     value: subCategory.product_count,
  //     name: subCategory.sub_category_name_vn.toUpperCase()
  //   }
  // })
  const dataTab = [
    {
      id:1,
      name:"Sản Phẩm",
      description:"Danh sách sản phẩm",
      icon: <IconCategoryPlus size={20}/>,
      table: 
        <TableProduct data={products} minWidth={width}/>
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

  useEffect(() => {
    if(products){
      setTotalPage((products[0]?.total_count ?? 0) / 10)
    }
  },[products])
  //logic
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

    const handleSetValueSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const value = event.target.value;
      setValueSearch(value)
    }
    const handleSearch = () => {
      setValueConfirm(valueSearch)
      setPage(1)
    }
  //render
  return (
    <div ref={ref}>
      <Stack>
        {/* <Group>
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
        </Group> */}
        <Grid>
          <Grid.Col span={6}>
            {/* <TotalCategoryPieChart title="Danh mục hàng hóa" data={dataSubCategories}/> */}
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
                <Input leftSection={<IconSearch size={20}/>} placeholder='Tìm Kiếm Sản Phẩm' className='my-2' 
                        onChange={handleSetValueSearch} 
                        onKeyDown={getHotkeyHandler([
                          ['Enter',handleSearch]
                        ])}
                  />
                {
                  dataTab.map((tab)=>(
                    <Tabs.Panel value={tab.name} key={tab.id} className='min-h-80'>
                      {tab.table}
                    </Tabs.Panel>
                  ))
                }
              </Tabs>
              <Divider/>
              <Pagination total={totalPage} value={activePage} onChange={setPage} mt="md" size="xs" disabled={loading}/>
          </Card>
        </Container>
      </Stack>
    </div>
  )
}

export default ProductPage