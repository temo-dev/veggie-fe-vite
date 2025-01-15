import { ActionIcon, Avatar, Group, Table } from '@mantine/core';
import { IconAdjustments, IconEdit, IconTrash } from '@tabler/icons-react';
import React from 'react'

interface PropsInterface{
  data: any[]
}

const TableCurrency = (prop:PropsInterface) => {
  const {data} = prop
  const rows = data.map((element,key) => (
    <Table.Tr key={key}>
      <Table.Td>{key+1}</Table.Td>
      <Table.Td>{element.currency_name}</Table.Td>
      <Table.Td>{element.currency_code}</Table.Td>
      <Table.Td>{element.exchange_rate}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon variant="filled" aria-label="chỉnh sửa">
            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="filled" color="red" aria-label="xóa">
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500} type='native' h={280}>
          <Table striped withRowBorders={false} stickyHeader>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Thứ Tự</Table.Th>
                <Table.Th>Tên Loại Tiền</Table.Th>
                <Table.Th>Mã Đồng Tiền</Table.Th>
                <Table.Th>Tỷ Giá Hiện Tại</Table.Th>
                <Table.Th>Hành Động</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
    </Table.ScrollContainer>
  )
}

export default TableCurrency