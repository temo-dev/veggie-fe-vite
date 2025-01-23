import { useDeleteSubCategoryById } from '@/services/react-query/subCategory/use-delete-subCategory';
import { SubCategoryType } from '@/services/react-query/subCategory/use-find-subCategory';
import { useDeleteFileOnS3 } from '@/services/s3-aws/delete_file_on_s3';
import { ActionIcon, Avatar, Group, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react'

interface PropsInterface{
  data: SubCategoryType[]
}

const TableSubCategory = (prop:PropsInterface) => {
  const {data} = prop
  const {mutate:deleteSubCategory,status}= useDeleteSubCategoryById()
  const {mutate: deleteFileS3} = useDeleteFileOnS3()
  const [nameFileS3deleted, setNameFileS3deleted] = useState<string | null>(null)
  //effect
  useEffect(() => {
    if (status === 'success' && nameFileS3deleted) {
      deleteFileS3(nameFileS3deleted)
    }else if(status === 'error'){
      setNameFileS3deleted(null)
    }
  }, [status])
  const handleDeleteSubCategory = (el:SubCategoryType) => {
    let nameImage = el.image_url.split('amazonaws.com/')[1]
    setNameFileS3deleted(nameImage)
    deleteSubCategory(el.sub_category_id)
  }
    //logic
  const rows = data?.map((el,key) => (
    <Table.Tr key={key}>
      <Table.Td>{key+1}</Table.Td>
      <Table.Td>
        <Avatar src={el.image_url ? el.image_url : "/logo/favicon-32x32.png"} alt="category" radius="sm" color="green"/>
      </Table.Td>
      <Table.Td>{el.sub_category_name_vn}</Table.Td>
      <Table.Td>{el.sub_category_name_de}</Table.Td>
      <Table.Td>{el.sub_category_name_th}</Table.Td>
      <Table.Td>{el.sub_category_name_eng}</Table.Td>
      <Table.Td>{el.category_name_vn}</Table.Td>
      <Table.Td>{`${el.dph}%`}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon variant="filled" aria-label="chỉnh sửa">
            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="filled" color="red" aria-label="xóa" onClick={()=>handleDeleteSubCategory(el)}>
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
                <Table.Th>Tên Danh Mục</Table.Th>
                <Table.Th>Thuế</Table.Th>
                <Table.Th>Hành Động</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows}
            </Table.Tbody>
        </Table>
    </Table.ScrollContainer>
    
  )
}

export default TableSubCategory