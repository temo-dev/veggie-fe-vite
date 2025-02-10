import { useDeleteProductById } from '@/services/react-query/product/use-delete-product';
import { ProductType } from '@/services/react-query/product/use-find-all-product';
import { useDeleteFileOnS3 } from '@/services/s3-aws/delete_file_on_s3';
import { ActionIcon, Avatar, Group, Input, Table, Title } from '@mantine/core'
import { modals } from '@mantine/modals';
import { IconEdit, IconSearch, IconTrash } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Image} from '@mantine/core'
import { getHotkeyHandler } from '@mantine/hooks';
import useProduct from '@/utils/hooks/useProduct';
import { useFindAllProductByCode } from '@/services/react-query/product/use-find-product-by-code';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';


interface PropsInterface{
  data: ProductType[] | [],
  minWidth: number
}

const TableProduct = (prop:PropsInterface) => {
  const {data,minWidth} = prop
  const navigate = useNavigate();
  const {mutate:deleteProductById, status} = useDeleteProductById()
  const [nameFileS3deleted, setNameFileS3deleted] = useState<string | null>(null)
  const {mutate: deleteFileS3} = useDeleteFileOnS3()
  const {updateCurrentProduct} = useProduct()
  //effect
  useEffect(() => {
    if (status === 'success' && nameFileS3deleted) {
      deleteFileS3(nameFileS3deleted)
    }else if(status === 'error'){
      setNameFileS3deleted(null)
    }
  }, [status])
  //logic
  const handleDeleteTag = (el:ProductType) => {
    let nameImage = el?.image_url.split('amazonaws.com/')[1]
    setNameFileS3deleted(nameImage)
    deleteProductById(el.product_id)
  }
  const handleShowImage = (el: ProductType) => {
    modals.open({
      title: <Title order={6}>{el?.product_code.toUpperCase()}</Title>,
      children: <Image
      radius="md"
      src={el.image_url ? el.image_url : "/public/logo/favicon-32x32.png"}
    />,
      size:"auto",
    });
  }
  //component
  const rows = data?.map((el,key) => (
    <Table.Tr key={key}>
      <Table.Td>
        <Avatar src={el.image_url ? el.image_url : "/logo/favicon-32x32.png"} alt="category" radius="sm" color="green" onClick={()=>handleShowImage(el)}/>
      </Table.Td>
      <Table.Td>{
            <Link to={"/products/product-detail"} onClick={(event) => {
              event.preventDefault();
              navigate("/products/product-detail");
              updateCurrentProduct(el)
            }}>
              {el.product_code}
            </Link>
        }</Table.Td>
      <Table.Td>{el.product_name_vn}</Table.Td>
      <Table.Td>{el.product_name_eng}</Table.Td>
      <Table.Td>{el.product_name_de}</Table.Td>
      <Table.Td>{el.product_name_th}</Table.Td>
      <Table.Td>{el.brand_name?.toUpperCase()}</Table.Td>
      <Table.Td>{el.total_quantity || 0}</Table.Td>
      <Table.Td>
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
      <Table.ScrollContainer minWidth={minWidth} type='native' h={400}>
        <Table striped withTableBorder withColumnBorders stickyHeader>
          <Table.Thead>
            <Table.Tr className="bg-green-600 text-white text-nowrap">
              <Table.Th>Hình Ảnh</Table.Th>
              <Table.Th>Code Sản Phẩm</Table.Th>
              <Table.Th>Tên Việt Nam</Table.Th>
              <Table.Th>Tên Tiếng Anh</Table.Th>
              <Table.Th>Tên Đức</Table.Th>
              <Table.Th>Tên Thái Lan</Table.Th>
              <Table.Th>Tên Thương Hiệu</Table.Th>
              <Table.Th>Tổng sản phẩm</Table.Th>
              <Table.Th>Hành Động</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  )
}

export default TableProduct