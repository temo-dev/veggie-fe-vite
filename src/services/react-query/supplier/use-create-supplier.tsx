import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useSupplier from "@/utils/hooks/useSupplier";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";

export interface CreateSupplierInput {
    contact_info: string;
    currency_id: string;
    description: string;
    duration_package:number;
    email_purchase: string;
    image_url: string;
    note: string;
    supplier_code: string;
    supplier_name: string;
    tax_id: string;
    
}

const createNewSupplier = async (input: CreateSupplierInput) => {
    const res = await http.post(API_ENDPOINTS.SUPPLIER, input);
    return res.data;
}

export const useCreateNewSupplier = () => {
    const queryClient = useQueryClient();
    const {updateSuppliers} = useSupplier()
    return useMutation((input: CreateSupplierInput)=> createNewSupplier(input),{
        onSuccess:(data) =>{
            notifications.show({
                title: 'Tạo nhà cung cấp Thành Công',
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
                title: 'Tạo nhà cung cấp xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}