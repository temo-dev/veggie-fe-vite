
import { ActionIcon, Group, Table } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { ZoneType } from '@/services/react-query/zone/use-find-all-zone';
import { useDeleteZoneById } from '@/services/react-query/zone/use-delete-zone';
import useZone from '@/utils/hooks/useZone';


interface PropsInterface{
  data: ZoneType[] | [],
  minWidth: number
}

const TableZone = (prop:PropsInterface) => {
  const {data,minWidth} = prop
  const navigate = useNavigate();
  const {mutate:deleteZoneById} = useDeleteZoneById()
  const {updateCurrentZone} = useZone()
  //logic
  const handleDeleteTag = (el:ZoneType) => {
    deleteZoneById(el.zone_price_id)
  }
  //component
  const rows = data?.map((el,key) => (
    <Table.Tr key={key}>
      <Table.Td>{
            <Link to={"/zone/zone-detail"} onClick={(event) => {
              event.preventDefault();
              navigate("/zone/zone-detail");
              updateCurrentZone(el)
            }}>
              {el.zone_name}
            </Link>
        }</Table.Td>
      <Table.Td>{0}</Table.Td>
      <Table.Td w={10}>
        <Group>
          <ActionIcon variant="filled" color="red" aria-label="xóa" onClick={()=>handleDeleteTag(el)}>
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Table.ScrollContainer minWidth={minWidth-100} type='native' h={400}>
        <Table striped withTableBorder withColumnBorders stickyHeader>
          <Table.Thead>
            <Table.Tr className="bg-green-600 text-white text-nowrap">
              <Table.Th>Code Zone</Table.Th>
              <Table.Th>Tổng Khách Hàng</Table.Th>
              <Table.Th>Hành Động</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  )
}

export default TableZone