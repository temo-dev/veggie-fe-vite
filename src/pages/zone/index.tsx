
import { Card, Avatar, Group, Button, Grid, Stack, Container, Title, Tabs, Divider, Pagination, Input, LoadingOverlay } from '@mantine/core'
import { IconCategoryPlus, IconPlus, IconSearch, IconUpload, IconUsersGroup } from '@tabler/icons-react';
import { getHotkeyHandler } from '@mantine/hooks';
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import LineProductChart from '@/components/Report/LineProductChart';
import { useElementSize } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { useFindAllProduct } from '@/services/react-query/product/use-find-all-product';
import TableZone from '@/components/Table/TableZone';
import FormCreateZone from '@/components/Form/FormCreateZone';
import { useFindAllZones } from '@/services/react-query/zone/use-find-all-zone';
import { use } from 'i18next';

const ZonePage = () => {
  const { ref, width } = useElementSize();
  const {zones} = useAppSelector((state)=>state.zone.zone)
  const {subCategories} = useAppSelector((state)=>state.subCategory.subCategory)
  const [loading, setLoading] = useState<boolean>(true)
  const [valueSearch, setValueSearch] = useState<string>('')
  const [valueConfirm, setValueConfirm] = useState<string>('')
  const {status: statusZone} = useFindAllZones()

  useEffect(()=>{
    if(
        statusZone === 'success' 
        || statusZone === 'error' 
      ){
      setLoading(false)
    }
  },[statusZone])
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
      name:"Danh Sách Zone",
      description:"Danh sách zone",
      icon: <IconCategoryPlus size={20}/>,
      table: 
        <TableZone data={zones} minWidth={width}/>
    },
  ]
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
      children: <FormCreateZone/>,
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
    }
  //render
  return (
    <div ref={ref}>
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Stack>
        <Group>
          <Button variant="default" leftSection={<IconPlus size={20} />} onClick={()=>openModal({name:"Zone Khách Hàng",icon:<IconUsersGroup size={20}/>})}>
            Thêm Zone
          </Button>
        </Group>
        <Grid>
          <Grid.Col span={6}>
            <TotalCategoryPieChart title="Zone Khách" data={dataSubCategories}/>
          </Grid.Col>
          <Grid.Col span={6}>
            <LineProductChart title='Mực Độ Gia Tăng Khách Hàng'/>
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
          </Card>
        </Container>
      </Stack>
    </div>
  )
}

export default ZonePage