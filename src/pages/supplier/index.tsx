import classes from './index.module.css'
import { Card, Avatar, Group, Button,Text, Grid, Stack, Container, Title, Input, Tabs, Menu, FileButton, UnstyledButton, Divider } from '@mantine/core'
import { IconBrandVinted, IconBuildingFactory2, IconCategoryPlus, IconDownload, IconPlus, IconSearch, IconUpload } from '@tabler/icons-react';
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import LineProductChart from '@/components/Report/LineProductChart';
import { useElementSize } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import FormCreateSupplier from '@/components/Form/FormCreateSupplier';
import TableSupplier from '@/components/Table/TableSupplier';
import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { useGetLinkFileToS3 } from '@/services/s3-aws/get_link_file_s3';
import { ImportExcelType, useImportExcel } from '@/services/react-query/import-excel/use-import-exel';
import { notifications } from '@mantine/notifications';

//mock data
const data1 = [
  { value: 200, name: 'Dry Foods' },
  { value: 50, name: 'VEG Products' },
  { value: 100, name: 'Snack Foods' },
  { value: 100, name: 'EU Products'},
  { value: 111, name: 'Czech Farms' }
];

const SupplierPage = () => {
  const { ref, width } = useElementSize();
  const {suppliers} = useAppSelector((state) => state.supplier.supplier)
  const [loading, setLoading] = useState<boolean>(false)
  const uploadFile = useGetLinkFileToS3()
  const {mutate: importExcel, status } =useImportExcel()
  const dataTab = [
    {
      id:1,
      name:"Nhà Cung Cấp",
      description:"Nhà Cung Cấp",
      icon: <IconCategoryPlus size={20}/>,
      table: <TableSupplier data={suppliers} minWidth={width}/>
    },
  ]

  
  
    useEffect(()=>{
      if(status === 'success' || status === 'error'){
        setLoading(false)
      }
    },[status])
  
    const handleImport = async (file: File | null) => {
      let value: ImportExcelType ={
        to_table:"supplier",
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
            title: 'Import Excel xảy ra lỗi',
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
          children: <FormCreateSupplier/>,
        });
  }
  return (
    <div ref={ref}>
      <Stack>
      <Group>
        <Button variant="default" leftSection={<IconPlus size={20} />} onClick={()=>openModal({name:"Nhà Cung Cấp",icon:<IconBuildingFactory2 size={20}/>})}>
          Thêm Nhà Cung Cấp
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
          <TotalCategoryPieChart title="Danh Mục Hàng Hóa"data={data1}/>
        </Grid.Col>
        <Grid.Col span={6}>
          <LineProductChart title='Số Lượng Nhập Hàng'/>
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
        </Card>
      </Container>
    </Stack>
    </div>
  )
}

export default SupplierPage