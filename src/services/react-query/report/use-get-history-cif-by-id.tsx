
import { API_ENDPOINTS } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import { useQuery, QueryFunctionContext } from 'react-query';
import { notifications } from '@mantine/notifications';


const getHistoryCifPriceProduct = async ({
    queryKey,
  }: QueryFunctionContext<[string,number]>): Promise<any> => {
    const [_,productId] = queryKey;
    const res = await http.get(`${API_ENDPOINTS.REPORT_HISTORY_CIF_PRICE}?id=${productId}`);
    return res.data;
  };

export const useHistoryCifPriceProduct = (
    productId:number
  ) => {
    // const {updateCurrentProduct} = useProduct()
      return useQuery([API_ENDPOINTS.REPORT_HISTORY_CIF_PRICE, productId], getHistoryCifPriceProduct, {
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