import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useSubCategory from "@/utils/hooks/useSubCategory";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";

export interface CreateSubCategoryInput {
  sub_category_name_de: string,
  sub_category_name_eng: string,
  sub_category_name_th: string,
  sub_category_name_vn: string,
  dph: number,
  category_id: string,
  image_url?: string
}

const createNewSubCategory = async (input: CreateSubCategoryInput) => {
    const res = await http.post(API_ENDPOINTS.SUB_CATEGORY,input);
    return res.data;
}

export const useCreateNewSubCategory = () => {
    const queryClient = useQueryClient();
    const {updateSubCategories}=useSubCategory()
    return useMutation((input: CreateSubCategoryInput)=> createNewSubCategory(input),{
        onSuccess:(data) =>{
            notifications.show({
                title: 'Tạo danh mục sản phẩm Thành Công',
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
                title: 'Tạo danh mục sản phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}