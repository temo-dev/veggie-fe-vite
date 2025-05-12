import { API_ENDPOINTS } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import { notifications } from '@mantine/notifications';
import { useQuery, QueryFunctionContext } from 'react-query';

const getProducts = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const [url, name] = queryKey;
  const { data } = await http.get(`${url}?page=0&limit=10&name=${name}`);
  return data.data;
};

export const useFindProducts = (
  name: string
) => {
  return useQuery([API_ENDPOINTS.PRODUCT_ALL,name], getProducts, {
    onSuccess: (response) => {
        return response;
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
