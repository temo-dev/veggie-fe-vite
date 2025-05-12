import { useMutation } from "react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import http from "../../utils/http";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

const createShippingPrice = async (input: any) => {
    const res = await http.post(API_ENDPOINTS.CREATE_SHIPPING_PRICE, input);
    return res.data;
}

export const useCreateShippingPrice = () => {
    return useMutation((input:any) => createShippingPrice(input), {
      onSuccess: (data) => {
        notifications.show({
          title: 'Tạo giá vận chuyển thành công',
          message: `${data.message}`,
          color: 'green',
          autoClose: 5000,
        })
        //close modal
        modals.closeAll();
        return data;
      },
      onError: (error) => {
        notifications.show({
            title: 'Tạo giá vận chuyển xảy ra lỗi',
            message: String(error),
            color: 'red',
            autoClose: 5000,
        })
      },
    });
}