import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useAttPackage from "@/utils/hooks/useAttPackages";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";

export interface CreatePackageInput {
    attitude_product_package_code: string;
    package_cubic?: number;
    package_len: string;
    package_height?: number;
    package_length?: string;
    package_width?: number;
}

const createNewPackage = async (input: CreatePackageInput) => {
    const res = await http.post(API_ENDPOINTS.PACKAGE, input);
    return res.data;
}

export const useCreateNewPackage = () => {
    const queryClient = useQueryClient();
    const {updateAttPackages} = useAttPackage()
    return useMutation((input: CreatePackageInput)=> createNewPackage(input),{
        onSuccess:(data) =>{
            notifications.show({
                title: 'Tạo Thùng sản phẩm Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
            queryClient.invalidateQueries(API_ENDPOINTS.PACKAGE).then(()=>{
                const data = queryClient.getQueryData(API_ENDPOINTS.PACKAGE);
                updateAttPackages(data)
            });
        },
        onError:(error) =>{
            notifications.show({
                title: 'Tạo Thùng sản phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}