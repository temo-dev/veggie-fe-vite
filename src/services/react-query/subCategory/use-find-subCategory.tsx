import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {useQuery} from "react-query";

export interface SubCategoryType {
    sub_category_id: string,
    sub_category_name_vn: string,
    sub_category_name_eng: string,
    sub_category_name_de: string,
    sub_category_name_th: string,
    category_id: string,
    dph: number,
    image_url: string
}

const getAllSubCategories = async () => {
    const res = await http.get(API_ENDPOINTS.SUB_CATEGORY);
    return res.data;
}

export const useFindAllSubCategories = () => {
    return useQuery([API_ENDPOINTS.SUB_CATEGORY],getAllSubCategories)
}