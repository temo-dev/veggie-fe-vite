import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import http from "../../utils/http";
import { notifications } from "@mantine/notifications";
import useProduct from "@/utils/hooks/useProduct";

const deleteProductById = async (id: string) => {
    const res = await http.delete(`${API_ENDPOINTS.PRODUCT}${id}`,);
    return res.data;
}

export const useDeleteProductById = () => {
    const queryClient = useQueryClient();
    const {updateProducts} = useProduct()
    return useMutation((id: string) => deleteProductById(id), {
        onSuccess: (data) => {
            notifications.show({
                title: 'Xóa Sản Phẩm Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
            queryClient.invalidateQueries(API_ENDPOINTS.PRODUCT).then(()=>{
                const data = queryClient.getQueryData(API_ENDPOINTS.PRODUCT);
                updateProducts(data)
            });
        },
        onError:(error) =>{
            notifications.show({
                title: 'Xóa Sản Phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}