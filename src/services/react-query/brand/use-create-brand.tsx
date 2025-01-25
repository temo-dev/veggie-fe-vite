import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useBrand from "@/utils/hooks/useBrand";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";

export interface CreateBrandInput {
  description: string;
  image_url?: string;
  brand_name: string;
}

const createNewBrand = async (input: CreateBrandInput) => {
    const res = await http.post(API_ENDPOINTS.BRAND, input);
    return res.data;
}

export const useCreateNewBrand = () => {
    const queryClient = useQueryClient();
    const {updateBrands} = useBrand()
    return useMutation((input: CreateBrandInput)=> createNewBrand(input),{
        onSuccess:(data) =>{
            notifications.show({
                title: 'Tạo thương hiệu Thành Công',
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
                title: 'Tạo thương hiệu xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}