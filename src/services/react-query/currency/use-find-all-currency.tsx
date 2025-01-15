import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import { useQuery } from "react-query";

export interface CurrencyType {
    currency_id: string;
    currency_code: string;
    currency_name: string;
    exchange_rate: number;
}

const getAllCurrencies = async () => {
    const res = await http.get(API_ENDPOINTS.CURRENCY);
    return res.data;
}

export const useFindAllCurrencies = () => {
    return useQuery([API_ENDPOINTS.CURRENCY], getAllCurrencies);
}