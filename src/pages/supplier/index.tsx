import classes from './index.module.css'
import { Card, Avatar, Group, Button,Text, Grid, Stack, Container, Title, Input, Tabs } from '@mantine/core'
import { IconBrandVinted, IconBuildingFactory2, IconCategoryPlus, IconPlus, IconSearch } from '@tabler/icons-react';
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import LineProductChart from '@/components/Report/LineProductChart';
import { useElementSize } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import FormCreateSupplier from '@/components/Form/FormCreateSupplier';
import TableSupplier from '@/components/Table/TableSupplier';
import { useAppSelector } from '@/store';

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
  const dataTab = [
    {
      id:1,
      name:"Nhà Cung Cấp",
      description:"Nhà Cung Cấp",
      icon: <IconCategoryPlus size={20}/>,
      table: <TableSupplier data={suppliers} minWidth={width}/>
    },
  ]
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
        <Button disabled variant="default" leftSection={<IconPlus size={20} />} onClick={()=>openModal({name:"brand",icon:<IconBrandVinted size={20}/>})}>
          Import Exel
        </Button>
      </Group>
      <Grid>
        <Grid.Col span={6}>
          <TotalCategoryPieChart title="Thống kê danh mục hàng"data={data1}/>
        </Grid.Col>
        <Grid.Col span={6}>
          <LineProductChart/>
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