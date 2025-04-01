import { ProductBaseType } from '@/services/react-query/product/use-find-all-product';
import { Table } from '@mantine/core';

interface PropsInterface {
  listBatch: any;
  productBase: any;
  minWidth: number;
}

const TableProductBatchDetail = (prop: PropsInterface) => {
  const { productBase, listBatch, minWidth } = prop;
  const elBox = productBase?.units.filter((unit: any) => unit.unit_name == 'box')[0];
  const dateOnly = (d: Date) => d.toISOString().split('T')[0];
  const isValidDate = (d: Date) => !isNaN(d.getTime());
  //logic
  //component
  const rows = listBatch?.map((el: any) => {
    const now = new Date();
    const expiredAt = new Date(`${el?.expiration_date}Z`);
    const inputAt = new Date(`${el?.input_date}Z`);
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
      <Table.Tr key={el.batch_id}>
        <Table.Td>{el.batch_id}</Table.Td>
        <Table.Td>{`${dateOnly(inputAt)}`}</Table.Td>
        <Table.Td>{el?.expiration_date !== '' ? `${dateOnly(expiredAt)}` : 'chưa có hạn'}</Table.Td>
        <Table.Td>{`${el.available} ${productBase?.base_unit} - ${el.available / elBox.quantity} ${elBox.unit_name}`}</Table.Td>
        <Table.Td>{`${dateDays} ngày`}</Table.Td>
        <Table.Td>{`${diffDays} ngày`}</Table.Td>
      </Table.Tr>
    );
  });
  return (
    <>
      <Table.ScrollContainer minWidth={minWidth} type="native" h={500}>
        <Table striped withTableBorder withColumnBorders stickyHeader>
          <Table.Thead>
            <Table.Tr className="bg-green-600 text-white text-nowrap">
              <Table.Th>Số Lô</Table.Th>
              <Table.Th>Ngày Nhập Kho</Table.Th>
              <Table.Th>Hạn Sử Dụng</Table.Th>
              <Table.Th>Số Lượng</Table.Th>
              <Table.Th>Số ngày còn lại</Table.Th>
              <Table.Th>Số ngày trong kho</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
};

export default TableProductBatchDetail;
