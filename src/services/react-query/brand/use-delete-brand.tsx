import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import http from "../../utils/http";
import { notifications } from "@mantine/notifications";
import useBrand from "@/utils/hooks/useBrand";

const deleteBrandById = async (id: string) => {
    const res = await http.delete(`${API_ENDPOINTS.BRAND}${id}`,);
    return res.data;
}

export const useDeleteBrandById = () => {
    const queryClient = useQueryClient();
    const {updateBrands} = useBrand()
    return useMutation((id: string) => deleteBrandById(id), {
        onSuccess: (data) => {
            notifications.show({
                title: 'Xóa Thương Hiệu Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
            queryClient.invalidateQueries(API_ENDPOINTS.BRAND).then(()=>{
                const data = queryClient.getQueryData(API_ENDPOINTS.BRAND);
                updateBrands(data)
            });
        },
        onError:(error) =>{
            notifications.show({
                title: 'Xóa Thương Hiệu xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}