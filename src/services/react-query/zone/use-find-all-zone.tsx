import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useZone from "@/utils/hooks/useZone";
import {useQuery} from "react-query";

export interface ZoneType {
    zone_price_id: string,
    zone_name: string,
}

const getAllZones = async () => {
    const res = await http.get(API_ENDPOINTS.ZONE_CUSTOMER);
    return res.data;
}

export const useFindAllZones = () => {
    const {updateZones} = useZone()
    return useQuery([API_ENDPOINTS.ZONE_CUSTOMER],getAllZones,{
        onSuccess: (data) => {
            updateZones(data)
        },
    })
}