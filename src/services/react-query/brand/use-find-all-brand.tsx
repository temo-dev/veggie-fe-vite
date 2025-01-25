import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {useQuery} from "react-query";

export interface BrandType {
    brand_id: string,
    brand_name: string,
    description: string,
    image_url: string
}

const getAllBrands = async () => {
    const res = await http.get(API_ENDPOINTS.BRAND);
    return res.data;
}

export const useFindAllBrands = () => {
    return useQuery([API_ENDPOINTS.BRAND],getAllBrands)
}