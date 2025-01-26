import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {useQuery} from "react-query";

export interface ProductType {
    product_id: string,
    product_name_vn: string,
    product_name_eng: string,
    product_name_de: string,
    product_name_th: string,
    product_code: string,
    dph?: number,
    description: string,
    image_url: string,
    status: string,
    sub_category_id: string,
    minimum_order_quantity: number,
    maximum_order_quantity: number,
    reorder_level: number,
    is_stackability: boolean,
    temperature_requirement: number,
    is_fragility: boolean,
    shelf_life: number,
    note: string,
    season: string,
    is_published: boolean,
    published_at: string,
    pre_order: string,
    len: string,
    length: number,
    width: number,
    height: number,
    cubic: number,
    net_weight: number,
    gross_weight: number,
    total_quantity: number,
    attitude_product_package_id: string,
    brand_id: string,
}

const getAllProducts = async () => {
    const res = await http.get(API_ENDPOINTS.PRODUCT);
    return res.data;
}

export const useFindAllProduct = () => {
    return useQuery([API_ENDPOINTS.PRODUCT],getAllProducts)
}