import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import http from "../../utils/http";
import { notifications } from "@mantine/notifications";
import useCurrency from "@/utils/hooks/useCurrency";

const deleteCurrencyById = async (id: string) => {
    const res = await http.delete(`${API_ENDPOINTS.CURRENCY}${id}`,);
    return res.data;
}

export const useDeleteCurrencyById = () => {
    const queryClient = useQueryClient();
    const {updateCurrencies} = useCurrency()
    return useMutation((id: string) => deleteCurrencyById(id), {
        onSuccess: (data) => {
            notifications.show({
                title: 'Xóa Loại Tiền Tệ Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
            queryClient.invalidateQueries(API_ENDPOINTS.CURRENCY).then(()=>{
                const data = queryClient.getQueryData(API_ENDPOINTS.CURRENCY);
                updateCurrencies(data)
            });
        },
        onError:(error) =>{
            notifications.show({
                title: 'Xóa Loại Tiền Tệ xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}