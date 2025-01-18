import { useMutation } from "react-query";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import http from "../utils/http";
import { notifications } from "@mantine/notifications";

const deleteLinkFileS3 = async (name: string) => {
    const res = await http.delete(`${API_ENDPOINTS.S3}${name}`);
    return res.data;
}

export const useDeleteFileOnS3 = () => {
    return useMutation((name:string)=> deleteLinkFileS3(name),{
        onSuccess: (data) => {
            notifications.show({
                title: 'Xóa File S3 Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
        },
        onError:(error) =>{
            notifications.show({
                title: 'Xóa File S3 xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}