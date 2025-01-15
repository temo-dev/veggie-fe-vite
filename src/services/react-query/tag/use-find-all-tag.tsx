import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {useQuery} from "react-query";

export interface TagType {
    tag_id: string,
    tag_name: string,
    description: string,
    image_url: string
}

const getAllTags = async () => {
    const res = await http.get(API_ENDPOINTS.TAG);
    return res.data;
}

export const useFindAllTag = () => {
    return useQuery([API_ENDPOINTS.TAG],getAllTags)
}