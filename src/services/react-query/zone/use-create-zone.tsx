import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useTag from "@/utils/hooks/useTag";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";

export interface CreateZoneInput {
  zone_name: string;
}

const createNewZone = async (input: CreateZoneInput) => {
    const res = await http.post(API_ENDPOINTS.ZONE_CUSTOMER, input);
    return res.data;
}

export const useCreateNewZone = () => {
    const queryClient = useQueryClient();
    const {updateTags} = useTag()
    return useMutation((input: CreateZoneInput)=> createNewZone(input),{
        onSuccess:(data) =>{
            notifications.show({
                title: 'Tạo zone khách hàng Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
            queryClient.invalidateQueries(API_ENDPOINTS.ZONE_CUSTOMER).then(()=>{
                const data = queryClient.getQueryData(API_ENDPOINTS.ZONE_CUSTOMER);
                updateTags(data)
            });
        },
        onError:(error) =>{
            notifications.show({
                title: 'Tạo zone khách hàng xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}