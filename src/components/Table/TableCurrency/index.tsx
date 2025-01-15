import { useDeleteCurrencyById } from '@/services/react-query/currency/use-delete-currency';
import { CurrencyType } from '@/services/react-query/currency/use-find-all-currency';
import { ActionIcon, Group, Table } from '@mantine/core';
import {IconEdit, IconTrash } from '@tabler/icons-react';

interface PropsInterface{
  data: CurrencyType[]
}

const TableCurrency = (prop:PropsInterface) => {
  const {data} = prop
  const {mutate:deleteCurrency} = useDeleteCurrencyById()

  //logic
  const handleDeleteCurrency = (id:string) => {
    deleteCurrency(id)
  }
  //component
  const rows = data.map((element,key) => (
    <Table.Tr key={key}>
      <Table.Td>{key+1}</Table.Td>
      <Table.Td>{element.currency_name.toUpperCase()}</Table.Td>
      <Table.Td>{element.currency_code.toUpperCase()}</Table.Td>
      <Table.Td className='font-bold'>{element.exchange_rate}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon variant="filled" aria-label="chỉnh sửa">
            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="filled" color="red" aria-label="xóa" onClick={()=>handleDeleteCurrency(element.currency_id)}>
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