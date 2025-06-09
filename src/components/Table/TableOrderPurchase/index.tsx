import { useAppSelector } from '@/store';
import { Grid, Stack, Text } from '@mantine/core';
import ProductRow from './ProductRow';

interface OrderPurchaseProps {
  supplier: number | null;
  handlePurchase: (value: any[]) => void;
  productPurchase: any[];
}

const TableOrderPurchase = (props: OrderPurchaseProps) => {
  const { supplier,handlePurchase,productPurchase } = props;
  const { purchaseProducts } = useAppSelector((state) => state.product.product);
  const rows = purchaseProducts?.map((item) => ProductRow({ item, supplier, handlePurchase, productPurchase})) || [];
  return (
    <div>
      {rows}
    </div>
  );
};

export default TableOrderPurchase;
