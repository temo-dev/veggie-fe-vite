import { ProductBaseType } from '@/services/react-query/product/use-find-all-product';
import {
  Avatar,
  Table,
  Title,
  Text,
  Badge,
  Tooltip,
  Blockquote,
  Group,
  Code,
  Stack,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from '@mantine/core';
import { IconBellZFilled } from '@tabler/icons-react';

interface PropsInterface {
  data: ProductBaseType[] | [];
  minWidth: number;
}

interface PropExpired {
  product: ProductBaseType;
}

const ExpiredText = (prop: PropExpired) => {
  const { product } = prop;
  const dateOnly = (d: Date) => d.toISOString().split('T')[0];
  const now = new Date();
  const expiredAt = new Date(`${product?.batch.expiration_date}Z`);
  const inputAt = new Date(`${product?.batch.input_date}Z`);
  const isValidDate = (d: Date) => !isNaN(d.getTime());
  // Tính số milliseconds giữa 2 thời gian
  const diffDays =
    isValidDate(expiredAt) && isValidDate(inputAt)
      ? Math.floor((expiredAt.getTime() - inputAt.getTime()) / (1000 * 60 * 60 * 24))
      : '-';
  // Tính số milliseconds giữa 2 thời gian
  const dateDays =
    isValidDate(expiredAt) && isValidDate(now)
      ? Math.floor((expiredAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : '-';
  return (
    <>
      <Blockquote color="orange" icon={<IconBellZFilled size={30} />}>
        <Stack>
          <Group>
            <Text>Ngày Hết Hạn:</Text>
            <Code block color="red">
              {dateOnly(expiredAt)}
            </Code>
          </Group>
          <Group>
            <Text>Số ngày còn lại:</Text>
            <Code block>{`${dateDays} ngày`}</Code>
          </Group>
          <Group>
            <Text>Ngày Vào Kho:</Text>
            <Code block>{dateOnly(inputAt)}</Code>
          </Group>
          <Group>
            <Text>Số ngày trong kho:</Text>
            <Code block>{`${diffDays} ngày`}</Code>
          </Group>
          <Group>
            <Text>Số lô hàng:</Text>
            <Code block>{product?.batch.batch_id}</Code>
          </Group>
        </Stack>
      </Blockquote>
    </>
  );
};

const TableProduct = (prop: PropsInterface) => {
  const { data, minWidth } = prop;
  const navigate = useNavigate();
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
        <Table.Td>{el.brand?.toUpperCase()}</Table.Td>
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
              }}
            >
              {el.product_abbr}
            </Link>
          }
        </Table.Td>
        <Table.Td>
          <Tooltip
            label={
              el?.batch?.expiration_date.length == 0 ? 'Không có hạn' : <ExpiredText product={el} />
            }
            disabled={el?.batch?.batch_id != 0 ? false : true}
          >
            <Badge
              color={el.stock == 0 ? 'red' : el.batch.available > 0 ? 'orange' : 'green'}
              fullWidth
            >
              {el?.batch?.batch_id != 0 ? (
                <Text
                  fw={500}
                >{`${el.batch.available}/${el.base_unit} - ${(el.batch.available / elBox[0]?.quantity).toFixed(0)}/${elBox[0]?.unit_name}`}</Text>
              ) : (
                <Text
                  fw={500}
                >{`${el.stock}/${el.base_unit} - ${(el.stock / elBox[0]?.quantity).toFixed(0)}/${elBox[0]?.unit_name}`}</Text>
              )}
            </Badge>
          </Tooltip>
        </Table.Td>
        <Table.Td>{el.product_name_vn}</Table.Td>
        <Table.Td>{el.product_name_en}</Table.Td>
      </Table.Tr>
    );
  });
  return (
    <>
      <Table.ScrollContainer minWidth={minWidth} type="native" h={700}>
        <Table striped withTableBorder withColumnBorders stickyHeader>
          <Table.Thead>
            <Table.Tr className="bg-green-600 text-white text-nowrap">
              <Table.Th>Tên Thương Hiệu</Table.Th>
              <Table.Th>Hình Ảnh</Table.Th>
              <Table.Th>Code Sản Phẩm</Table.Th>
              <Table.Th>Hàng Tồn</Table.Th>
              <Table.Th>Tên Việt Nam</Table.Th>
              <Table.Th>Tên Tiếng Anh</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
};

export default TableProduct;
