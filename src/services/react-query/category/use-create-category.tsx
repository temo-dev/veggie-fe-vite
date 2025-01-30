import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useCategory from "@/utils/hooks/useCategory";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";

export interface CreateCategoryInput {
  category_name_de?: string,
  category_name_eng?: string,
  category_name_th?: string,
  category_name_vn?: string,
  category_name_cz?: string,
  image_url?: string
}

const createNewCategory = async (input: CreateCategoryInput) => {
    const res = await http.post(API_ENDPOINTS.CATEGORY,input);
    return res.data;
}

export const useCreateNewCategory = () => {
    const queryClient = useQueryClient();
    const {updateCategories}=useCategory()
    return useMutation((input: CreateCategoryInput)=> createNewCategory(input),{
        onSuccess:(data) =>{
            notifications.show({
                title: 'Tạo nhóm sản phẩm Thành Công',
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
                title: 'Tạo nhóm sản phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}