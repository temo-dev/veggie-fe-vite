import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useProduct from "@/utils/hooks/useProduct";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";
import { ProductType } from "./use-find-all-product";

const updateProduct = async (input: ProductType) => {
    const {
        data
    } = await http.put(API_ENDPOINTS.PRODUCT, input);
    return data.data;
}

export const useUpdateProduct = () => {
    const {updateCurrentProduct} = useProduct()
    return useMutation((input: ProductType)=> updateProduct(input),{
        onSuccess:(data) =>{
            notifications.show({
                title: 'Cập nhật sản phẩm Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
            updateCurrentProduct(data)
        },
        onError:(error) =>{
            notifications.show({
                title: 'Cập nhật sản phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}