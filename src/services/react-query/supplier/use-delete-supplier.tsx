import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import http from "../../utils/http";
import { notifications } from "@mantine/notifications";
import useTag from "@/utils/hooks/useTag";
import useSupplier from "@/utils/hooks/useSupplier";

const deleteSupplierById = async (id: string) => {
    const res = await http.delete(`${API_ENDPOINTS.SUPPLIER}${id}`,);
    return res.data;
}

export const useDeleteSupplierById = () => {
    const queryClient = useQueryClient();
    const {updateSuppliers} = useSupplier()
    return useMutation((id: string) => deleteSupplierById(id), {
        onSuccess: (data) => {
            notifications.show({
                title: 'Xóa Nhà Cung Cấp Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
            queryClient.invalidateQueries(API_ENDPOINTS.SUPPLIER).then(()=>{
                const data = queryClient.getQueryData(API_ENDPOINTS.SUPPLIER);
                updateSuppliers(data)
            });
        },
        onError:(error) =>{
            notifications.show({
                title: 'Xóa Nhà Cung Cấp xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}