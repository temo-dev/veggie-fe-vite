import { useAppDispatch, setProductCif } from '@/store';

export function useProductCifState() {
  const dispatch = useAppDispatch();

  const updateProductCif = (product: any) => {
    dispatch(setProductCif(product));
  };
  //return functions
  return {
    updateProductCif,
  };
}
