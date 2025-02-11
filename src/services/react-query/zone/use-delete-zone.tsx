import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import http from "../../utils/http";
import { notifications } from "@mantine/notifications";
import useZone from "@/utils/hooks/useZone";

const deleteZoneById = async (id: string) => {
    const res = await http.delete(`${API_ENDPOINTS.ZONE_CUSTOMER}${id}`,);
    return res.data;
}

export const useDeleteZoneById = () => {
    const queryClient = useQueryClient();
    const {updateZones} = useZone()
    return useMutation((id: string) => deleteZoneById(id), {
        onSuccess: (data) => {
            notifications.show({
                title: 'Xóa Zone Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
            queryClient.invalidateQueries(API_ENDPOINTS.ZONE_CUSTOMER).then(()=>{
                const data = queryClient.getQueryData(API_ENDPOINTS.ZONE_CUSTOMER);
                updateZones(data)
            });
        },
        onError:(error) =>{
            notifications.show({
                title: 'Xóa Zone xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}