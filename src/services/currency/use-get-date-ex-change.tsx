import { useQuery,QueryFunctionContext } from 'react-query';
import { notifications } from '@mantine/notifications';
import { API_ENDPOINTS } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import useProduct from '@/utils/hooks/useProduct';

const getExChangeDate = async ({
  queryKey,
}: QueryFunctionContext<[string,string,string]>): Promise<
  any
> => {
  const [_, valid, base] = queryKey;
  const res = await http.put(`${API_ENDPOINTS.EXCHANGE_DATE}/${valid}?base=${base}`);
  return res.data;
  };

export const useFindDateExChange = (
  date:string,
  base:string
) => {
    // const {updateExchange} = useProduct()
      return useQuery([API_ENDPOINTS.EXCHANGE_DATE,date,base], getExChangeDate, {
        keepPreviousData: true,
            onSuccess: (data) => {
                // updateExchange(data)
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