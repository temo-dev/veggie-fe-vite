import { API_ENDPOINTS } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import { useQuery, QueryFunctionContext } from 'react-query';
import { ProductBaseDetailType } from './use-find-all-product';
import { notifications } from '@mantine/notifications';
import useProduct from '@/utils/hooks/useProduct';


const getProductDetail = async ({
    queryKey,
  }: QueryFunctionContext<[string,string]>): Promise<
  ProductBaseDetailType | any
  > => {
    const [_,abbr] = queryKey;
    const res = await http.put(`${API_ENDPOINTS.PRODUCT_DETAIL}/${abbr}`);
    return res.data;
  };

export const useFindProductDetail = (
    abbr:string
  ) => {
    // const {updateCurrentProduct} = useProduct()
      return useQuery([API_ENDPOINTS.PRODUCT_DETAIL,abbr], getProductDetail, {
        keepPreviousData: true,
            onSuccess: (data) => {
                // updateCurrentProduct(data)
            },
            onError: (error) => {
              notifications.show({
                title: 'Lỗi sản phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
              });
            },
      })
  }