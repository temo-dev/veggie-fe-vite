import { useMutation } from "react-query";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import http from "../utils/http";


export interface FileType {
    file_name: string,
    file_type: string
}

const getLinkFileS3 = async (input: FileType) => {
    console.log(input)
    const res = await http.post(API_ENDPOINTS.S3_UPLOAD, input);
    return res.data;
}

export const useGetLinkFileToS3 = () => {
    return useMutation((input:FileType)=> getLinkFileS3(input),{
        onSuccess:async (data) => {
            console.log(data)
            // Tải ảnh trực tiếp lên S3
            // const res = await http.put(url, data?.file, {
            //     headers: {
            //     'Content-Type': data?.file.type,
            //     },
            // });
        },
        onError:(error) =>{
            console.log(error)
        }
    })
}