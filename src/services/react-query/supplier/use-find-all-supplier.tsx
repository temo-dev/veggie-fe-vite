import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {useQuery} from "react-query";

export interface SupplierType {
    supplier_id: string,
    supplier_name: string,
    supplier_code: string,
    tax_id: string,
    description: string,
    currency_id: string,
    email_purchase: string,
    note: string,
    outstanding_balance: number,
    status:'active' | 'inactive',
    duration_pakage: number,
    contact_info: string,
    rate: number,
    image_url: string
}

const getAllSuppliers = async () => {
    const res = await http.get(API_ENDPOINTS.SUPPLIER);
    return res.data;
}

export const useFindAllSuppliers = () => {
    return useQuery([API_ENDPOINTS.SUPPLIER],getAllSuppliers)
}