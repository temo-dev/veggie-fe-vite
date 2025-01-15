import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useTag from "@/utils/hooks/useTag";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";

export interface CreateTagInput {
  description: string;
  image_url?: string;
  tag_name: string;
}

const createNewTag = async (input: CreateTagInput) => {
    const res = await http.post(API_ENDPOINTS.TAG, input);
    return res.data;
}

export const useCreateNewTag = () => {
    const queryClient = useQueryClient();
    const {updateTags} = useTag()
    return useMutation((input: CreateTagInput)=> createNewTag(input),{
        onSuccess:(data) =>{
            notifications.show({
                title: 'Tạo nhãn sản phẩm Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
            queryClient.invalidateQueries(API_ENDPOINTS.TAG).then(()=>{
                const data = queryClient.getQueryData(API_ENDPOINTS.TAG);
                updateTags(data)
            });
        },
        onError:(error) =>{
            notifications.show({
                title: 'Tạo nhãn sản phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}