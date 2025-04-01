import { ProductBaseType } from '@/services/react-query/product/use-find-all-product';
import { Table } from '@mantine/core';

interface PropsInterface {
  productBase: ProductBaseType | undefined;
  minWidth: number;
}

const TableEshop = (prop: PropsInterface) => {
  const { productBase, minWidth } = prop;
  //logic
  //component

  return (
    <>
      <Table.ScrollContainer minWidth={minWidth} type="native" h={500}>
        <Table striped withTableBorder withColumnBorders stickyHeader>
          <Table.Thead>
            <Table.Tr className="bg-green-600 text-white text-nowrap">
              <Table.Th>Mã Sản Phẩm</Table.Th>
              <Table.Th>Hãng</Table.Th>
              <Table.Th>Tiếng Việt</Table.Th>
              <Table.Th>Tiếng Anh</Table.Th>
              <Table.Th>Tiếng Đức</Table.Th>
              <Table.Th>Tiếng Séc</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
                <Table.Th>
                {productBase?.product_abbr}
                </Table.Th>
                <Table.Th>
                {productBase?.brand}
                </Table.Th>
                <Table.Th>
                {productBase?.product_name_vn}
                </Table.Th>
                <Table.Th>
                {productBase?.product_name_en}
                </Table.Th>
                <Table.Th>
                {productBase?.product_name_de}
                </Table.Th>
                <Table.Th>
                {productBase?.product_name_cs}
                </Table.Th>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
};

export default TableEshop;
