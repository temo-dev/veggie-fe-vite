import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {useQuery} from "react-query";

export interface PackageType {
    attitude_product_package_id: string,
    attitude_product_package_code: string,
    package_length: string,
    package_width: number,
    package_height: number,
    package_cubic: number,
}

const getAllPackages = async () => {
    const res = await http.get(API_ENDPOINTS.PACKAGE);
    return res.data;
}

export const useFindAllPackages = () => {
    return useQuery([API_ENDPOINTS.PACKAGE],getAllPackages)
}