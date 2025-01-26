import classes from './index.module.css'
import { Card, Avatar, Group, Button,Text, Grid, Stack, Container, Title, Input, Divider, Tabs } from '@mantine/core'
import { IconBrandVinted, IconCategoryPlus, IconPlus, IconSearch } from '@tabler/icons-react';
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import LineProductChart from '@/components/Report/LineProductChart';
import { useElementSize } from '@mantine/hooks';
import TableBrand from '@/components/Table/TableBrand';
import { modals } from '@mantine/modals';
import FormCreateBrand from '@/components/Form/FormCreateBrand';
import { useAppSelector } from '@/store';

//mock data
const data1 = [
  { value: 200, name: 'Dry Foods' },
  { value: 50, name: 'VEG Products' },
  { value: 100, name: 'Snack Foods' },
  { value: 100, name: 'EU Products'},
  { value: 111, name: 'Czech Farms' }
];

const BrandPage = () => {
  const { ref, width } = useElementSize();
  const {brands} = useAppSelector((state)=>state.brand.brand)
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
          children: <FormCreateBrand/>,
        });
  }
  const dataTab = [
    {
      id:1,
      name:"Nhãn Hàng",
      description:"Thông tin chung nhãn hàng",
      icon: <IconCategoryPlus size={20}/>,
      table: <TableBrand data={brands}/>
    },
  ]
  return (
    <div ref={ref}>
      <Stack>
      <Group>
        <Button size="md" variant="light" radius="md" leftSection={<IconPlus size={20} />} onClick={()=>openModal({name:"brand",icon:<IconBrandVinted size={20}/>})}>
          Thêm Thương Hiệu
        </Button>
        <Button size="md" variant="light" radius="md" leftSection={<IconPlus size={20} />} onClick={()=>openModal({name:"brand",icon:<IconBrandVinted size={20}/>})}>
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

export default BrandPage