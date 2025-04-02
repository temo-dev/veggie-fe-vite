import { useQuery,QueryFunctionContext } from 'react-query';
import { notifications } from '@mantine/notifications';
import { API_ENDPOINTS } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import useProduct from '@/utils/hooks/useProduct';

const getExChangeToday = async ({
  queryKey,
}: QueryFunctionContext<[string,string]>): Promise<
  any
> => {
  const [_, valid] = queryKey;
  const res = await http.put(`${API_ENDPOINTS.EXCHANGE}/${valid}`);
  return res.data;
  };

export const useFindExChange = (
  valid:string
) => {
    const {updateExchange} = useProduct()
      return useQuery([API_ENDPOINTS.EXCHANGE,valid], getExChangeToday, {
        keepPreviousData: true,
            onSuccess: (data) => {
                updateExchange(data)
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