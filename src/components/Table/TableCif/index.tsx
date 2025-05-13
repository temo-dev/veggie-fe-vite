import { convertTime } from '@/utils/convertTime';
import { ActionIcon, Collapse, Group, Image, Stack, Table, Text } from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconCircuitResistor,
  IconShoppingBagPlus,
} from '@tabler/icons-react';
import React, { useState } from 'react';

interface PropsInterface {
  minWidth: number;
  minHeight: number;
  dataSearch: any[];
  exchange: any;
}

const ActionButtons = () => (
  <Group>
    <ActionIcon variant="filled">
      <IconShoppingBagPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
    <ActionIcon variant="filled">
      <IconCircuitResistor style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  </Group>
);

const formatNumber = (num: number) => (typeof num === 'number' ? num.toFixed(2) : '-');

const TableCif = (prop: PropsInterface) => {
  const { minWidth, minHeight, dataSearch, exchange } = prop;

  const rows = dataSearch?.map((item: any) => {
    const { price_base, price_cif } = item;
    const boxBase = price_base?.units.find((unit: any) => unit?.unit_name === 'box')?.quantity ?? 0;
    //số thùng còn lại
    const boxQuantity = price_base?.stock / boxBase;
    // Sắp xếp price_cif theo cif_price tăng dần
    const sortedPriceCif = price_cif?.slice().sort((a: any, b: any) => a.cif_price - b.cif_price);
    const switchExchange = (value: number, currency: string) => {
      let price = 0;
      switch (currency) {
        case 'czk':
          price = value / exchange?.value_czk;
          break;
        case 'usd':
          price = value / exchange?.value_usd;
          break;
        case 'eur':
          price = value / exchange?.value_eur;
          break;
        case 'thb':
          price = value / exchange?.value_th;
          break;
        case 'krw':
          price = value / exchange?.value_kr;
          break;
        default:
          price = value / exchange?.value_czk;
          break;
      }
      return price;
    };
    const newCifPrice = sortedPriceCif?.map((item: any) => {
      const newPricePc = switchExchange(item?.price_pc, item?.shipping_currency);
      const newDeliveryPrice = switchExchange(
        item?.shipping_pallet_price,
        item?.shipping_pallet_currency
      );
      const newPriceCifBox = newPricePc * boxBase + newDeliveryPrice / item?.box_pallet;
      return {
        ...item,
        price_pc: newPricePc,
        price_pc_box: newPricePc * boxBase,
        cif_price: newPriceCifBox / boxBase,
        cif_price_box: newPriceCifBox,
      };
    });
    const [opened, setOpened] = useState(false);

    return (
      <React.Fragment key={price_base?.product_k2_id}>
        <Table.Tr className="bg-gray-100 font-semibold">
          <Table.Td rowSpan={opened ? 2 : 1} style={{ textAlign: 'center' }}>
            <Group justify="center">
              <Image
                src={price_base?.image_url || '/logo/logo-text-1.svg'}
                w={50}
                h={50}
                radius="md"
                fit="contain"
              />
              <Stack justify="center">
                <Text fw={700}>{`${price_base?.product_abbr} `}</Text>
                <Text
                  td={boxQuantity <= 0.9 ? 'line-through' : ''}
                  c={boxQuantity <= 0.9 ? 'red' : ''}
                >{`${boxQuantity.toFixed(1)} thùng ${boxBase}`}</Text>
              </Stack>
            </Group>
          </Table.Td>
          <Table.Td>{newCifPrice?.[0]?.supplier_name}</Table.Td>
          <Table.Td>{formatNumber(newCifPrice?.[0]?.price_pc)}</Table.Td>
          <Table.Td>{formatNumber(newCifPrice?.[0]?.price_pc_box)}</Table.Td>
          <Table.Td>{formatNumber(newCifPrice?.[0]?.cif_price)}</Table.Td>
          <Table.Td>{formatNumber(newCifPrice?.[0]?.cif_price_box)}</Table.Td>
          <Table.Td>{convertTime(newCifPrice?.[0]?.effective_from)}</Table.Td>
          <Table.Td>
            <Group>
              <ActionButtons />
              {newCifPrice?.length > 1 && (
                <ActionIcon variant="light" onClick={() => setOpened((o) => !o)}>
                  {opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                </ActionIcon>
              )}
            </Group>
          </Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td colSpan={8} style={{ padding: 0, border: 'none' }}>
            <Collapse in={opened} w={minWidth}>
              <Table striped>
                <Table.Tbody>
                  {newCifPrice?.slice(1).map((cifItem: any, idx: number) => (
                    <Table.Tr key={`${price_base?.product_k2_id}-${idx}`}>
                      <Table.Td>{cifItem?.supplier_name}</Table.Td>
                      <Table.Td>{formatNumber(cifItem?.price_pc)}</Table.Td>
                      <Table.Td>{formatNumber(cifItem?.price_pc_box)}</Table.Td>
                      <Table.Td>{formatNumber(cifItem?.cif_price)}</Table.Td>
                      <Table.Td>{formatNumber(cifItem?.cif_price_box)}</Table.Td>
                      <Table.Td>{convertTime(cifItem?.effective_from)}</Table.Td>
                      <Table.Td>
                        <ActionButtons />
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Collapse>
          </Table.Td>
        </Table.Tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <Table.ScrollContainer
        minWidth={minWidth}
        type="native"
        h={minHeight - 60}
        className="shadow-xl"
      >
        <Table striped stickyHeader tabularNums>
          <Table.Thead>
            <Table.Tr className="bg-green-600 text-white text-nowrap">
              <Table.Th w={100} style={{ textAlign: 'center', border: '1px solid #fff' }}>
                Mã Hàng
              </Table.Th>
              <Table.Th w={100}>Nhà Cung Cấp</Table.Th>
              <Table.Th w={50}>Giá Nhập</Table.Th>
              <Table.Th w={50}>Giá Thùng</Table.Th>
              <Table.Th w={50}>Giá CIF</Table.Th>
              <Table.Th w={50}>Giá CIF Box</Table.Th>
              <Table.Th w={50}>Ngày Áp Dụng</Table.Th>
              <Table.Th w={100}>Thao Tác</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
};

export default TableCif;
