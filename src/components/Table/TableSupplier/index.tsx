
import { useDeleteSupplierById } from '@/services/react-query/supplier/use-delete-supplier';
import { SupplierType } from '@/services/react-query/supplier/use-find-all-supplier';
import { useDeleteFileOnS3 } from '@/services/s3-aws/delete_file_on_s3';
import { ActionIcon, Avatar, Group, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface PropsInterface {
  data: SupplierType[];
  minWidth: number;
}

const TableSupplier = (prop: PropsInterface) => {
  const { data,minWidth } = prop;
  const navigate = useNavigate();
  const { mutate: deleteSupplierById, status } = useDeleteSupplierById();
  const [nameFileS3deleted, setNameFileS3deleted] = React.useState<string | null>(null);
  const { mutate: deleteFileS3 } = useDeleteFileOnS3();
  //useEffect
  useEffect(() => {
    if (status === 'success' && nameFileS3deleted) {
      deleteFileS3(nameFileS3deleted);
    } else if (status === 'error') {
      setNameFileS3deleted(null);
    }
  }, [status]);
  //handle
  const handleDeleteBrand = (el: SupplierType) => {
    let nameImage = el.image_url.split('amazonaws.com/')[1];
    setNameFileS3deleted(nameImage);
    deleteSupplierById(el.supplier_id);
  };
  //component
  const rows = data?.map((el, key) => (
    <Table.Tr key={key}>
      <Table.Td>{key + 1}</Table.Td>
      <Table.Td>{el.supplier_code}</Table.Td>
      <Table.Td>
        <Avatar
          src={el.image_url ? el.image_url : '/logo/favicon-32x32.png'}
          alt="category"
          radius="sm"
          color="green"
        />
      </Table.Td>
      <Table.Td>
        {
          <Link
            to={'/suppliers/supplier-detail'}
            onClick={(event) => {
              event.preventDefault();
              navigate('/suppliers/supplier-detail');
            }}
          >
            {el.supplier_name}
          </Link>
        }
      </Table.Td>
      <Table.Td>{el.outstanding_balance}</Table.Td>
      <Table.Td>{el.currency_id}</Table.Td>
      <Table.Td>{el.duration_pakage}</Table.Td>
      <Table.Td>{el.email_purchase}</Table.Td>
      <Table.Td>{el.contact_info}</Table.Td>
      <Table.Td>{el.note}</Table.Td>
      <Table.Td>{el.description}</Table.Td>
      <Table.Td>{el.status}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon variant="filled" aria-label="chỉnh sửa">
            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            color="red"
            aria-label="xóa"
            onClick={() => handleDeleteBrand(el)}
          >
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table.ScrollContainer minWidth={minWidth} type="native" h={400}>
      <Table striped withTableBorder withColumnBorders stickyHeader>
        <Table.Thead>
          <Table.Tr className="bg-green-600 h-10 text-white">
            <Table.Th>Thứ Tự</Table.Th>
            <Table.Th>Mã Nhà Cung Cấp</Table.Th>
            <Table.Th>Hình Ảnh</Table.Th>
            <Table.Th>Tên Nhà Cung Cấp</Table.Th>
            <Table.Th>Tài Khoản</Table.Th>
            <Table.Th>Loại Tiền Thanh Toán</Table.Th>
            <Table.Th>Số Ngày Đóng Hàng</Table.Th>
            <Table.Th>Email Đặt Hàng</Table.Th>
            <Table.Th>Thông Tin Nhà Cung Cấp</Table.Th>
            <Table.Th>Chú Thích</Table.Th>
            <Table.Th>Mô Tả</Table.Th>
            <Table.Th>Trạng Thái</Table.Th>
            <Table.Th>Hành Động</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default TableSupplier;
