import { Tabs, Grid, Button, rem,Container } from '@mantine/core'
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart'
import { IconCategory2, IconCategoryPlus, IconCoinBitcoin, IconPackage, IconPlus, IconTagStarred } from '@tabler/icons-react'
import TableCategory from '@/components/Table/TableCategory'
import TableSubCategory from '@/components/Table/TableSubCategory'
import TableTag from '@/components/Table/TableTag'
import TableCurrency from '@/components/Table/TableCurrency'
import TablePackage from '@/components/Table/TablePackage'
import { useElementSize } from '@mantine/hooks'
const ExtensionsPage = () => {
  const { ref, width, height } = useElementSize();
  const iconStyle = { width: rem(22), height: rem(22), color: "green" };

    const elements = [
      {  
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        category_name_vn: "veggie-1",
        category_name_eng: "veggie-1",
        category_name_de: "veggie-1",
        category_name_th: "veggie-1",
        image_url: ""
      },
      {  
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        category_name_vn: "veggie-2",
        category_name_eng: "veggie-2",
        category_name_de: "veggie-2",
        category_name_th: "veggie-2",
        image_url: ""
      },
      {  
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        category_name_vn: "veggie-3",
        category_name_eng: "veggie-3",
        category_name_de: "veggie-3",
        category_name_th: "veggie-3",
        image_url: ""
      },
      {  
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        category_name_vn: "veggie-4",
        category_name_eng: "veggie-4",
        category_name_de: "veggie-4",
        category_name_th: "veggie-4",
        image_url: ""
      },
    ];
    const dataSub = [
      {
        sub_category_id: "a76f4076-4853-4864-bb9c-8f68163609ee",
        sub_category_name_vn: "dry food",
        sub_category_name_eng: "dry food",
        sub_category_name_de: "dry food",
        sub_category_name_th: "dry food",
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        image_url: "",
        dph: 21
      },
      {
        sub_category_id: "a76f4076-4853-4864-bb9c-8f68163609ee",
        sub_category_name_vn: "dry food",
        sub_category_name_eng: "dry food",
        sub_category_name_de: "dry food",
        sub_category_name_th: "dry food",
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        image_url: "",
        dph: 21
      },
      {
        sub_category_id: "a76f4076-4853-4864-bb9c-8f68163609ee",
        sub_category_name_vn: "dry food",
        sub_category_name_eng: "dry food",
        sub_category_name_de: "dry food",
        sub_category_name_th: "dry food",
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        image_url: "",
        dph: 21
      },
      {
        sub_category_id: "a76f4076-4853-4864-bb9c-8f68163609ee",
        sub_category_name_vn: "dry food",
        sub_category_name_eng: "dry food",
        sub_category_name_de: "dry food",
        sub_category_name_th: "dry food",
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        image_url: "",
        dph: 21
      },
      {
        sub_category_id: "a76f4076-4853-4864-bb9c-8f68163609ee",
        sub_category_name_vn: "dry food",
        sub_category_name_eng: "dry food",
        sub_category_name_de: "dry food",
        sub_category_name_th: "dry food",
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        image_url: "",
        dph: 21
      },
      {
        sub_category_id: "a76f4076-4853-4864-bb9c-8f68163609ee",
        sub_category_name_vn: "dry food",
        sub_category_name_eng: "dry food",
        sub_category_name_de: "dry food",
        sub_category_name_th: "dry food",
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        image_url: "",
        dph: 21
      },
      {
        sub_category_id: "a76f4076-4853-4864-bb9c-8f68163609ee",
        sub_category_name_vn: "dry food",
        sub_category_name_eng: "dry food",
        sub_category_name_de: "dry food",
        sub_category_name_th: "dry food",
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        image_url: "",
        dph: 21
      },
      {
        sub_category_id: "a76f4076-4853-4864-bb9c-8f68163609ee",
        sub_category_name_vn: "dry food",
        sub_category_name_eng: "dry food",
        sub_category_name_de: "dry food",
        sub_category_name_th: "dry food",
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        image_url: "",
        dph: 21
      },
      {
        sub_category_id: "a76f4076-4853-4864-bb9c-8f68163609ee",
        sub_category_name_vn: "dry food",
        sub_category_name_eng: "dry food",
        sub_category_name_de: "dry food",
        sub_category_name_th: "dry food",
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        image_url: "",
        dph: 21
      },
      {
        sub_category_id: "a76f4076-4853-4864-bb9c-8f68163609ee",
        sub_category_name_vn: "dry food",
        sub_category_name_eng: "dry food",
        sub_category_name_de: "dry food",
        sub_category_name_th: "dry food",
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        image_url: "",
        dph: 21
      },
      {
        sub_category_id: "a76f4076-4853-4864-bb9c-8f68163609ee",
        sub_category_name_vn: "dry food",
        sub_category_name_eng: "dry food",
        sub_category_name_de: "dry food",
        sub_category_name_th: "dry food",
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        image_url: "",
        dph: 21
      },
      {
        sub_category_id: "a76f4076-4853-4864-bb9c-8f68163609ee",
        sub_category_name_vn: "dry food",
        sub_category_name_eng: "dry food",
        sub_category_name_de: "dry food",
        sub_category_name_th: "dry food",
        category_id: "ef075b9e-1c99-49c6-84b0-daba146de080",
        image_url: "",
        dph: 21
      }
    ]
    const dataTag = [
      {
        description: "san pham host",
        image_url: "",
        tag_name: "host"
      }
    ]
    const dataCurrency = [
      {
        currency_code: "string",
        currency_name: "string",
        exchange_rate: 12
      }
    ]
    const dataPackage = [
      {
        attitude_product_package_code: "string",
        package_cubic: 0,
        package_height: 0,
        package_length: "string",
        package_width: 0,
      }
    ]
    const data1 = [
      { value: 200, name: 'Dry Foods' },
      { value: 50, name: 'VEG Products' },
      { value: 100, name: 'Snack Foods' },
      { value: 100, name: 'EU Products'},
      { value: 111, name: 'Czech Farms' }
    ];
    const data2 = [
      { value: 100, name: 'Best Seller' },
      { value: 20, name: 'Hot' },
      { value: 300, name: 'Limited' },
      { value: 40, name: 'New'},
      { value: 11, name: 'Sale Off' }
    ];
    const dataTab = [
      {
        id:1,
        name:"nhóm sản phẩm",
        description:"nhóm sản phẩm",
        icon: <IconCategoryPlus style={iconStyle}/>,
        table: <TableCategory data={elements}/>
      },
      {
        id:2,
        name:"danh mục",
        description:"danh mục sản phẩm",
        icon: <IconCategory2 style={iconStyle}/>,
        table: <TableSubCategory data={dataSub}/>
      },
      {
        id:3,
        name:"loại tiền tệ",
        description:"loại tiền tệ",
        icon: <IconCoinBitcoin style={iconStyle}/>,
        table: <TableCurrency data={dataCurrency}/>
      },
      {
        id:4,
        name:"nhãn sản phẩm",
        description:"nhãn sản phẩm",
        icon: <IconTagStarred style={iconStyle}/>,
        table: <TableTag data={dataTag}/>
      },
      {
        id:5,
        name:"package sản phẩm",
        description:"package sản phẩm",
        icon: <IconPackage style={iconStyle}/>,
        table: <TablePackage data={dataPackage}/>
      },
    ]

  return (
    <div ref={ref}>
      <div className='mb-4'>
        {
          dataTab.map((button)=>(
            <Button leftSection={<IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />} variant="default" className='mr-2' key={button.id}>
            {`${button.name.toUpperCase()}`}
          </Button>
          ))
        }
      </div>
      <Grid>
        <Grid.Col span={6} order={{ base: 12, sm: 12, lg: 4 }}>
          <TotalCategoryPieChart title='danh mục sản phẩm' data={data1}/>
        </Grid.Col>
        <Grid.Col span={6} order={{ base: 12, sm: 12, lg: 8 }}>
          <TotalCategoryPieChart title='Nhãn Sản Phẩm' data={data2}/>
        </Grid.Col>
      </Grid>
      <Container fluid size="responsive" w={width}>
        <Tabs defaultValue={`${dataTab[1].name}`} className='mt-4'>
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
      </Container>
    </div>
  )
}

export default ExtensionsPage