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
  dataSearch?: any[];
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
  const { minWidth, minHeight, dataSearch } = prop;

  const rows = dataSearch?.map((item: any) => {
    const { price_base, price_cif } = item;
    //số thùng còn lại
    const boxQuantity = price_base?.stock/(price_base?.units.find((unit:any) => unit?.unit_name === "box")?.quantity ?? 0);
    // Sắp xếp price_cif theo cif_price tăng dần
    const sortedPriceCif = price_cif?.slice().sort((a: any, b: any) => a.cif_price - b.cif_price);

    const [opened, setOpened] = useState(false);

    return (
      <React.Fragment key={price_base?.product_k2_id}>
        <Table.Tr className="bg-gray-100 font-semibold">
          <Table.Td rowSpan={1} style={{ textAlign: 'center' }}>
            <Group justify="center">
              <Image
                src={price_base?.image_url || '/logo/logo-text-1.svg'}
                w={50}
                h={50}
                radius="md"
                fit="contain"
              />
              <Stack justify='center'>
                <Text fw={700}>{`${price_base?.product_abbr} `}</Text>
                <Text td={boxQuantity <= 0.9 ? "line-through"  : ""} c={boxQuantity <= 0.9 ? "red"  : ""}>{`${boxQuantity.toFixed(1)} thùng`}</Text>
              </Stack>
            </Group>
          </Table.Td>
          <Table.Td>{sortedPriceCif?.[0]?.supplier_name}</Table.Td>
          <Table.Td>{formatNumber(sortedPriceCif?.[0]?.price_pc)}</Table.Td>
          <Table.Td>{formatNumber(sortedPriceCif?.[0]?.cif_price)}</Table.Td>
          <Table.Td>{formatNumber(sortedPriceCif?.[0]?.cif_price_box)}</Table.Td>
          <Table.Td>{convertTime(sortedPriceCif?.[0]?.effective_from)}</Table.Td>
          <Table.Td>
            <Group>
              <ActionButtons />
              {sortedPriceCif?.length > 1 && (
                <ActionIcon variant="light" onClick={() => setOpened((o) => !o)}>
                  {opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                </ActionIcon>
              )}
            </Group>
          </Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td colSpan={7} style={{ padding: 0, border: 'none' }}>
            <Collapse in={opened}>
              <Table striped>
                <Table.Tbody>
                  {sortedPriceCif?.slice(1).map((cifItem: any, idx: number) => (
                    <Table.Tr key={`${price_base?.product_k2_id}-${idx}`}>
                      <Table.Td w={200}></Table.Td>
                      <Table.Td>{cifItem?.supplier_name}</Table.Td>
                      <Table.Td>{formatNumber(cifItem?.price_pc)}</Table.Td>
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
              <Table.Th w={200} style={{ textAlign: 'center', border: '1px solid #fff' }}>
                Mã Hàng
              </Table.Th>
              <Table.Th>Nhà Cung Cấp</Table.Th>
              <Table.Th>Giá Nhập</Table.Th>
              <Table.Th>Giá CIF</Table.Th>
              <Table.Th>Giá CIF Box</Table.Th>
              <Table.Th>Ngày Áp Dụng</Table.Th>
              <Table.Th>Thao Tác</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
};

export default TableCif;
