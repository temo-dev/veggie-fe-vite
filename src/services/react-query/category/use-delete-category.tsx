import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import http from "../../utils/http";
import { notifications } from "@mantine/notifications";
import useCategory from "@/utils/hooks/useCategory";

const deleteCategoryById = async (id: string) => {
    const res = await http.delete(`${API_ENDPOINTS.CATEGORY}${id}`,);
    return res.data;
}

export const useDeleteCategoryById = () => {
    const queryClient = useQueryClient();
    const {updateCategories} = useCategory()
    return useMutation((id: string) => deleteCategoryById(id), {
        onSuccess: (data) => {
            notifications.show({
                title: 'Xóa Nhóm Sản Phẩm Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
            queryClient.invalidateQueries(API_ENDPOINTS.CATEGORY).then(()=>{
                const data = queryClient.getQueryData(API_ENDPOINTS.CATEGORY);
                updateCategories(data)
            });
        },
        onError:(error) =>{
            notifications.show({
                title: 'Xóa Nhóm Sản Phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}