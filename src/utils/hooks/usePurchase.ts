import { useAppDispatch, setAddPurchaseProduct } from '@/store';

export function usePurchaseState() {
  const dispatch = useAppDispatch();

  const addPurchase = (product: any) => {
    dispatch(setAddPurchaseProduct(product));
  };
  //return functions
  return {
    addPurchase,
  };
}
