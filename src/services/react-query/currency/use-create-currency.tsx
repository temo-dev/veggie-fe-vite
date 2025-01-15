import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import http from "../../utils/http";
import { notifications } from "@mantine/notifications";
import useCurrency from "@/utils/hooks/useCurrency";


export interface CreateCurrencyInput {
    currency_code: string;
    currency_name: string;
    exchange_rate?: number;
}

const createNewCurrency = async(input:CreateCurrencyInput) => {
    const res = await http.post(API_ENDPOINTS.CURRENCY, input);
    return res.data;
}

export const useCreateNewCurrency = () => {
    const queryClient = useQueryClient();
    const {updateCurrencies} = useCurrency()
    return useMutation((input: CreateCurrencyInput) => createNewCurrency(input), {
        onSuccess:(data) =>{
            notifications.show({
                title: 'Tạo Loại Tiền Tệ Thành Công',
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
                title: 'Tạo Loại Tiền Tệ xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}