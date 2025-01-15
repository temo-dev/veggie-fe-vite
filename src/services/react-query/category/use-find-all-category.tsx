import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {useQuery} from "react-query";

export interface CategoryType {
    category_id: string,
    category_name_vn: string,
    category_name_eng: string,
    category_name_de: string,
    category_name_th: string,
    image_url: string
}

const getAllCategories = async () => {
    const res = await http.get(API_ENDPOINTS.CATEGORY);
    return res.data;
}

export const useFindAllCategories = () => {
    return useQuery([API_ENDPOINTS.CATEGORY],getAllCategories)
}