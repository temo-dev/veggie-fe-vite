import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useProduct from "@/utils/hooks/useProduct";
import { notifications } from "@mantine/notifications";
import {useQuery,QueryFunctionContext, useMutation} from "react-query";
import { ProductType } from "./use-find-all-product";


interface InputProps {
    code: string
}

const getAllProductsByCode = async (props:InputProps): Promise<ProductType> => {
    const {code} = props;
    const response = await http.get(`${API_ENDPOINTS.SEARCH_PRODUCT}?code=${code}`);
    return response.data;
}

export const useFindAllProductByCode = () => {
    const {updateProducts} = useProduct()
    return useMutation(API_ENDPOINTS.SEARCH_PRODUCT, getAllProductsByCode,{
        onSuccess: (response:any) => {
            const {data} = response
            updateProducts(data)
        },
        onError: (error) => {
            notifications.show({
                title: 'Lấy sản phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}