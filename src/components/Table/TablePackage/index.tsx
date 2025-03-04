import { useDeletePackageById } from '@/services/react-query/attPackage/use-delete-package';
import { PackageType } from '@/services/react-query/attPackage/use-find-all-package';
import { ActionIcon, Group, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface PropsInterface{
  data: PackageType[]
}

const TablePackage = (prop:PropsInterface) => {
  const {mutate:deletePackageById} = useDeletePackageById()
  const {data} = prop
  //logic
  const handleDelete = (id:string) => {
    deletePackageById(id)
  }
  //component
  const rows = data?.map((element,key) => (
    <Table.Tr key={key}>
      <Table.Td>{key+1}</Table.Td>
      <Table.Td>{element.attitude_product_package_code}</Table.Td>
      <Table.Td>{element.package_cubic}</Table.Td>
      <Table.Td>{element.package_length}</Table.Td>
      <Table.Td>{element.package_width}</Table.Td>
      <Table.Td>{element.package_height}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon variant="filled" aria-label="chỉnh sửa">
            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="filled" color="red" aria-label="xóa" onClick={()=>handleDelete(element.attitude_product_package_id)}>
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
                <Table.Th>Mã Thùng</Table.Th>
                <Table.Th>Cubic</Table.Th>
                <Table.Th>Chiều Dài</Table.Th>
                <Table.Th>Chiều Rộng</Table.Th>
                <Table.Th>Chiều Cao</Table.Th>
                <Table.Th>Hành Động</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
    </Table.ScrollContainer>
  )
}

export default TablePackage