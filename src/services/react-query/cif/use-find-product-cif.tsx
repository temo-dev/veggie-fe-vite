import { API_ENDPOINTS } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import { notifications } from '@mantine/notifications';
import { useQuery, QueryFunctionContext } from 'react-query';

const getProductsCif = async ({
  queryKey,
}: QueryFunctionContext<[string, string,number]>) => {
  const [url, name,page] = queryKey;
  const { data } = await http.get(`${url}?page=${page}&limit=20&name=${name}`);
  return data.data;
};

export const useFindProductsCif = (
  name: string,
  page: number
) => {
  // const {updateProductCif} = useProductCifState()
  return useQuery([API_ENDPOINTS.PRODUCT_ALL_CIF,name,page], getProductsCif, {
    onSuccess: (response) => {
      // updateProductCif(response);
    },
    onError: (error) => {
      notifications.show({
        title: 'Lỗi',
        message: 'Có lỗi xảy ra khi lấy thông tin sản phẩm',
        color: 'red',
      });
    },
  });
};
