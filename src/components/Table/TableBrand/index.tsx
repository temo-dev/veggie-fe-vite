import { useDeleteBrandById } from '@/services/react-query/brand/use-delete-brand';
import { BrandType } from '@/services/react-query/brand/use-find-all-brand';
import { useDeleteFileOnS3 } from '@/services/s3-aws/delete_file_on_s3';
import { ActionIcon, Avatar, Group, Table } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';


interface PropsInterface{
  data: BrandType[]
  minWidth: number
}

const TableBrand = (prop:PropsInterface) => {
  const {data,minWidth} = prop
  const navigate = useNavigate();
  const {mutate:deleteBrandById, status} = useDeleteBrandById()
    const [nameFileS3deleted, setNameFileS3deleted] = React.useState<string | null>(null)
    const {mutate: deleteFileS3} = useDeleteFileOnS3()
  useEffect(() => {
    if (status === 'success' && nameFileS3deleted) {
      deleteFileS3(nameFileS3deleted)
    }else if(status === 'error'){
      setNameFileS3deleted(null)
    }
  }, [status])
  const handleDeleteBrand = (el:BrandType) => {
    let nameImage = el.image_url.split('amazonaws.com/')[1]
    setNameFileS3deleted(nameImage)
    deleteBrandById(el.brand_id)
  }
  //component
  const rows = data?.map((el,key) => (
    <Table.Tr key={key}>
      <Table.Td>{key+1}</Table.Td>
      <Table.Td>
        <Avatar src={el.image_url ? el.image_url : "/logo/favicon-32x32.png"} alt="category" radius="sm" color="green"/>
      </Table.Td>
      <Table.Td>
      {
        <Link to={"/brands/brand-detail"} onClick={(event) => {
              event.preventDefault();
              navigate("/brands/brand-detail");
            }}>
              {el.brand_name}
        </Link>
      }
      </Table.Td>
      <Table.Td>{el.description}</Table.Td>
      <Table.Td>{"null"}</Table.Td>
      <Table.Td>{"null"}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon variant="filled" aria-label="chỉnh sửa">
            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="filled" color="red" aria-label="xóa" onClick={()=>handleDeleteBrand(el)}>
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table.ScrollContainer minWidth={minWidth} type='native' h={400}>
      <Table striped withTableBorder withColumnBorders stickyHeader>
        <Table.Thead>
          <Table.Tr className='bg-green-600 h-10 text-white'>
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

export default TableBrand