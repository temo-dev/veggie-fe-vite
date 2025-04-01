import { useQuery } from 'react-query';
import { notifications } from '@mantine/notifications';

const getExChangeToday = async () => {
    const res = await fetch(`https://api.exchangerate.host/live?access_key=db6d277a0cb7ed98e8e853e60a548010`);
    return res.json();
  };

export const useFindExChange = () => {
    // const {updateCurrentProduct} = useProduct()
      return useQuery([], getExChangeToday, {
        keepPreviousData: true,
            onSuccess: (data) => {
                console.log('data',data)
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