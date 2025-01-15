import { ActionIcon, Avatar, Group, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface PropsInterface{
  data: any[]
}

const TableCategory = (prop:PropsInterface) => {
  const {data} = prop
  const rows = data?.map((element,key) => (
    <Table.Tr key={key}>
      <Table.Td>{key+1}</Table.Td>
      <Table.Td>
        <Avatar src={element.image_url ? element.image_url : "/logo/favicon-32x32.png"} alt="category" radius="sm" color="green"/>
      </Table.Td>
      <Table.Td>{element.category_name_vn}</Table.Td>
      <Table.Td>{element.category_name_de}</Table.Td>
      <Table.Td>{element.category_name_th}</Table.Td>
      <Table.Td>{element.category_name_eng}</Table.Td>
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
                <Table.Th>Hình Ảnh</Table.Th>
                <Table.Th>Tên Việt Nam</Table.Th>
                <Table.Th>Tên Đức</Table.Th>
                <Table.Th>Tên Thái Lan</Table.Th>
                <Table.Th>Tên Anh</Table.Th>
                <Table.Th>Hành Động</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
    </Table.ScrollContainer>
  )
}

export default TableCategory