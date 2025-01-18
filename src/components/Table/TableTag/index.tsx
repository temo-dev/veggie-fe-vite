import { useDeleteTagById } from '@/services/react-query/tag/use-delete-tag';
import { TagType } from '@/services/react-query/tag/use-find-all-tag';
import { useDeleteFileOnS3 } from '@/services/s3-aws/delete_file_on_s3';
import { ActionIcon, Avatar, Group, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import React, { useEffect } from 'react'

interface PropsInterface{
  data: TagType[]
}

const TableTag = (prop:PropsInterface) => {
  const {data} = prop
  const {mutate:deleteTagById, status} = useDeleteTagById()
  const [nameFileS3deleted, setNameFileS3deleted] = React.useState<string | null>(null)
  const {mutate: deleteFileS3} = useDeleteFileOnS3()
  useEffect(() => {
    if (status === 'success' && nameFileS3deleted) {
      deleteFileS3(nameFileS3deleted)
    }else if(status === 'error'){
      setNameFileS3deleted(null)
    }
  }, [status])
  
  //logic
  const handleDeleteTag = (el:TagType) => {
    let nameImage = el.image_url.split('amazonaws.com/')[1]
    setNameFileS3deleted(nameImage)
    deleteTagById(el.tag_id)
  }
  //component
  const rows = data?.map((element,key) => {
    return (
      <Table.Tr key={key}>
        <Table.Td>{key+1}</Table.Td>
        <Table.Td>
          <Avatar src={element.image_url ? element.image_url : "/logo/favicon-32x32.png"} alt="category" radius="sm" color="green"/>
        </Table.Td>
        <Table.Td>{element.tag_name}</Table.Td>
        <Table.Td>{element.description}</Table.Td>
        <Table.Td>
          <Group>
            <ActionIcon variant="filled" aria-label="chỉnh sửa">
              <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="filled" color="red" aria-label="xóa" onClick={()=>handleDeleteTag(element)}>
              <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    )
  });

  return (
    <Table.ScrollContainer minWidth={500} type='native' h={280}>
          <Table striped withRowBorders={false} stickyHeader>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Thứ Tự</Table.Th>
                <Table.Th>Hình Ảnh</Table.Th>
                <Table.Th>Tên Nhãn</Table.Th>
                <Table.Th>Chú Thích</Table.Th>
                <Table.Th>Hành Động</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
    </Table.ScrollContainer>
  )
}

export default TableTag