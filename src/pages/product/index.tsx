import classes from './index.module.css'
import { Card, Avatar, Group, Button,Text, Grid, Stack, Container, Title, GridCol, InputWrapper, Input } from '@mantine/core'
import { IconBrandVinted, IconPlus, IconSearch } from '@tabler/icons-react';
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import LineProductChart from '@/components/Report/LineProductChart';
import { useElementSize } from '@mantine/hooks';
import TableBrand from '@/components/Table/TableBrand';
import { modals } from '@mantine/modals';
import FormCreateBrand from '@/components/Form/FormCreateBrand';

//mock data
const data1 = [
  { value: 200, name: 'Dry Foods' },
  { value: 50, name: 'VEG Products' },
  { value: 100, name: 'Snack Foods' },
  { value: 100, name: 'EU Products'},
  { value: 111, name: 'Czech Farms' }
];

const data2 = [
  {
    brand_name:"demo-1",
    description:"demo-1",
    image_url:"/logo/favicon-32x32.png"
  },
  {
    brand_name:"demo-2",
    description:"demo-2",
    image_url:"/logo/favicon-32x32.png"
  },
  {
    brand_name:"demo-3",
    description:"demo-3",
    image_url:"/logo/favicon-32x32.png"
  },
  {
    brand_name:"demo-4",
    description:"demo-4",
    image_url:"/logo/favicon-32x32.png"
  },
  {
    brand_name:"demo-5",
    description:"demo-5",
    image_url:"/logo/favicon-32x32.png"
  },
  {
    brand_name:"demo-6",
    description:"demo-6",
    image_url:"/logo/favicon-32x32.png"
  },
  {
    brand_name:"demo-1",
    description:"demo-1",
    image_url:"/logo/favicon-32x32.png"
  },
  {
    brand_name:"demo-2",
    description:"demo-2",
    image_url:"/logo/favicon-32x32.png"
  },
  {
    brand_name:"demo-3",
    description:"demo-3",
    image_url:"/logo/favicon-32x32.png"
  },
  {
    brand_name:"demo-4",
    description:"demo-4",
    image_url:"/logo/favicon-32x32.png"
  },
  {
    brand_name:"demo-5",
    description:"demo-5",
    image_url:"/logo/favicon-32x32.png"
  },
  {
    brand_name:"demo-6",
    description:"demo-6",
    image_url:"/logo/favicon-32x32.png"
  },
]

const ProductPage = () => {
  const { ref, width } = useElementSize();
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
  return (
    <div ref={ref}>
      <Stack>
      <Group>
        <Button size="md" variant="light" radius="md" leftSection={<IconPlus size={20} />} onClick={()=>openModal({name:"brand",icon:<IconBrandVinted size={20}/>})}>
          Thêm Sản Phẩm
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
        <Card shadow="xs" padding="md" radius="md">
          <Group justify="space-between" mb="md">
            <Title order={3} style={{textAlign:"center"}}>
              Danh Sách Sản Phẩm
            </Title>
            <Input leftSection={<IconSearch size={20}/>} placeholder='Tìm sản phẩm' className="shadow w-1/4"/>
          </Group>
          {/* <TableBrand data={data2}/> */}
        </Card>
      </Container>
    </Stack>
    </div>
  )
}

export default ProductPage