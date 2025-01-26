import { ActionIcon, Avatar, Group, Table } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


interface PropsInterface{
  data: any[],
  minWidth: number
}

const TableProduct = (prop:PropsInterface) => {
  const {data,minWidth} = prop
  const navigate = useNavigate();
  //component
  const rows = data?.map((el,key) => (
    <Table.Tr key={key}>
      <Table.Td>{key+1}</Table.Td>
      <Table.Td>
        <Avatar src={el.image_url ? el.image_url : "/logo/favicon-32x32.png"} alt="category" radius="sm" color="green"/>
      </Table.Td>
      <Table.Td>{
            <Link to={"/products/product-detail"} onClick={(event) => {
                event.preventDefault();
                navigate("/products/product-detail");
                }}>
                {el.product_name}
            </Link>
        }</Table.Td>
      <Table.Td>{el.description}</Table.Td>
      <Table.Td>{"null"}</Table.Td>
      <Table.Td>{"null"}</Table.Td>
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
    <Table.ScrollContainer minWidth={minWidth} type='native' h={400}>
      <Table striped highlightOnHover withTableBorder withColumnBorders stickyHeader>
        <Table.Thead className="bg-green-600 h-10 text-white">
          <Table.Tr>
            <Table.Th>Thứ Tự</Table.Th>
            <Table.Th>Hình Ảnh</Table.Th>
            <Table.Th>Tên Thương Hiệu</Table.Th>
            <Table.Th>Chú Thích</Table.Th>
            <Table.Th>Nhà cung cấp nhiều nhất</Table.Th>
            <Table.Th>Tổng sản phẩm</Table.Th>
            <Table.Th>Hành Động</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}

export default TableProduct