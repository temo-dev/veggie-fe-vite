import { useMutation } from "react-query";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import http from "../utils/http";
import axios from "axios";
import { notifications } from "@mantine/notifications";


const getLinkFileS3 = async (input: File) => {
    const res = await http.post(API_ENDPOINTS.S3_UPLOAD, {file_name: input.name, file_type: input.type});
    return {
        url: res.data.data,
        file: input
    };
}

export const useGetLinkFileToS3 = () => {
    return useMutation((input:File)=> getLinkFileS3(input),{
        onSuccess:async (data) => {
            // Tải ảnh trực tiếp lên S3
            try {
                await axios.put(data?.url, data?.file, {
                    headers: {
                    'Content-Type': data?.file.type,
                    'x-amz-acl': 'public-read', // Nếu cần file public
                    },
                });
                notifications.show({
                    title: 'Tải Ảnh Thành Công',
                    message: `Tải ảnh lên S3 thành công`,
                    color: 'green',
                    autoClose: 5000,
                })
            } catch (error) {
                notifications.show({
                    title: 'Tải Ảnh xảy ra lỗi',
                    message: String(error),
                    color: 'red',
                    autoClose: 5000,
                })
                return null
            }
        },
        onError:(error) =>{
            notifications.show({
                title: 'Tải Ảnh xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}