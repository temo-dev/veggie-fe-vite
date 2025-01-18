import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import http from "../../utils/http";
import { notifications } from "@mantine/notifications";
import useSubCategory from "@/utils/hooks/useSubCategory";

const deleteSubCategoryById = async (id: string) => {
    const res = await http.delete(`${API_ENDPOINTS.SUB_CATEGORY}${id}`,);
    return res.data;
}

export const useDeleteSubCategoryById = () => {
    const queryClient = useQueryClient();
    const {updateSubCategories} = useSubCategory()
    return useMutation((id: string) => deleteSubCategoryById(id), {
        onSuccess: (data) => {
            notifications.show({
                title: 'Xóa Danh Mục Sản Phẩm Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
            queryClient.invalidateQueries(API_ENDPOINTS.SUB_CATEGORY).then(()=>{
                const data = queryClient.getQueryData(API_ENDPOINTS.SUB_CATEGORY);
                updateSubCategories(data)
            });
        },
        onError:(error) =>{
            notifications.show({
                title: 'Xóa Danh Mục Sản Phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}