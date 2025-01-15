import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import http from "../../utils/http";
import { notifications } from "@mantine/notifications";
import useAttPackage from "@/utils/hooks/useAttPackages";

const deletePackageById = async (id: string) => {
    const res = await http.delete(`${API_ENDPOINTS.PACKAGE}${id}`,);
    return res.data;
}

export const useDeletePackageById = () => {
    const queryClient = useQueryClient();
    const {updateAttPackages} = useAttPackage()
    return useMutation((id: string) => deletePackageById(id), {
        onSuccess: (data) => {
            notifications.show({
                title: 'Xóa thùng Sản Phẩm Thành Công',
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
                title: 'Xóa thùng Sản Phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}