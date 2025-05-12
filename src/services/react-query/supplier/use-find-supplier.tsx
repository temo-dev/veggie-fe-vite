import { API_ENDPOINTS } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import { notifications } from '@mantine/notifications';
import { useQuery } from 'react-query';

const getSuppliers = async () => {
  const { data } = await http.get(`${API_ENDPOINTS.SUPPLIER}?page=0&limit=100&name=`);
  return data.data;
};

export const useFindSuppliers = () => {
  return useQuery([API_ENDPOINTS.SUPPLIER], getSuppliers, {
    onSuccess: (response) => {
      return response;
    },
    onError: (error) => {
      notifications.show({
        title: 'Lỗi',
        message: 'Có lỗi xảy ra khi lấy thông tin nhà cung cấp',
        color: 'red',
      });
    },
  });
};
