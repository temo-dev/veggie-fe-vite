import { ProductBaseType } from '@/services/react-query/product/use-find-all-product';
import { useDeleteFileOnS3 } from '@/services/s3-aws/delete_file_on_s3';
import { Avatar, Table, Title, Text, Badge, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from '@mantine/core';
import useProduct from '@/utils/hooks/useProduct';

interface PropsInterface {
  data: ProductBaseType[] | [];
  minWidth: number;
}

const TableProduct = (prop: PropsInterface) => {
  const { data, minWidth } = prop;
  const navigate = useNavigate();
  const [nameFileS3deleted, setNameFileS3deleted] = useState<string | null>(null);
  const { mutate: deleteFileS3 } = useDeleteFileOnS3();
  const { updateCurrentProduct } = useProduct();
  //effect
  useEffect(() => {
    if (status === 'success' && nameFileS3deleted) {
      deleteFileS3(nameFileS3deleted);
    } else if (status === 'error') {
      setNameFileS3deleted(null);
    }
  }, [status]);
  //logic
  const handleShowImage = (el: ProductBaseType) => {
    modals.open({
      title: <Title order={6}>{el?.product_abbr.toUpperCase()}</Title>,
      children: (
        <Image radius="md" src={el.image_url ? el.image_url : '/public/logo/favicon-32x32.png'} />
      ),
      size: 'auto',
    });
  };

  //component
  const rows = data?.map((el, key) => {
    const elBox = el.units.filter((unit) => unit.unit_name == 'box');
    return (
      <Table.Tr key={key}>
        <Table.Td>
          <Avatar
            src={el.image_url ? el.image_url : '/logo/favicon-32x32.png'}
            alt="category"
            radius="sm"
            color="green"
            onClick={() => handleShowImage(el)}
          />
        </Table.Td>
        <Table.Td>
          {
            <Link
              to={'/products/product-detail'}
              onClick={(event) => {
                event.preventDefault();
                navigate('/products/product-detail');
                updateCurrentProduct(el);
              }}
            >
              {el.product_abbr}
            </Link>
          }
        </Table.Td>
        <Table.Td>
          <Tooltip label={el?.batch?.expiration_date.length == 0 ? "Không có hạn" : el?.batch?.expiration_date } disabled={el?.batch?.batch_id != 0 ? false : true}>
            <Badge color={el.stock > 0 ? 'green' : 'red'} fullWidth>
              {el?.batch?.batch_id != 0 ? (
                <Text
                  fw={500}
                >{`${el.stock}ks - ${el.batch.available}/${el.base_unit} - ${(el.batch.available / elBox[0]?.quantity).toFixed(0)}/${elBox[0]?.unit_name} - ${el.batch.available % elBox[0]?.quantity}ks`}</Text>
              ) : (
                <Text
                  fw={500}
                >{`${el.stock}/${el.base_unit} - ${(el.stock / elBox[0]?.quantity).toFixed(0)}/${elBox[0]?.unit_name} - ${el.stock % elBox[0]?.quantity}ks`}</Text>
              )}
            </Badge>
          </Tooltip>
        </Table.Td>
        <Table.Td>{el.product_name_vn}</Table.Td>
        <Table.Td>{el.product_name_en}</Table.Td>
        <Table.Td>{el.product_name_de}</Table.Td>
        <Table.Td>{el.product_name_cs}</Table.Td>
        <Table.Td>{el.brand?.toUpperCase()}</Table.Td>
      </Table.Tr>
    );
  });
  return (
    <>
      <Table.ScrollContainer minWidth={minWidth} type="native" h={400}>
        <Table striped withTableBorder withColumnBorders stickyHeader>
          <Table.Thead>
            <Table.Tr className="bg-green-600 text-white text-nowrap">
              <Table.Th>Hình Ảnh</Table.Th>
              <Table.Th>Code Sản Phẩm</Table.Th>
              <Table.Th>Hàng Tồn</Table.Th>
              <Table.Th>Tên Việt Nam</Table.Th>
              <Table.Th>Tên Tiếng Anh</Table.Th>
              <Table.Th>Tên Đức</Table.Th>
              <Table.Th>Tên Séc</Table.Th>
              <Table.Th>Tên Thương Hiệu</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
};

export default TableProduct;
