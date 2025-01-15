import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import http from "../../utils/http";
import { notifications } from "@mantine/notifications";
import useTag from "@/utils/hooks/useTag";

const deleteTagById = async (id: string) => {
    const res = await http.delete(`${API_ENDPOINTS.TAG}${id}`,);
    return res.data;
}

export const useDeleteTagById = () => {
    const queryClient = useQueryClient();
    const {updateTags} = useTag()
    return useMutation((id: string) => deleteTagById(id), {
        onSuccess: (data) => {
            notifications.show({
                title: 'Xóa Nhãn Sản Phẩm Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
            queryClient.invalidateQueries(API_ENDPOINTS.TAG).then(()=>{
                const data = queryClient.getQueryData(API_ENDPOINTS.TAG);
                updateTags(data)
                console.log('data',data)
            });
        },
        onError:(error) =>{
            notifications.show({
                title: 'Xóa Nhãn Sản Phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}