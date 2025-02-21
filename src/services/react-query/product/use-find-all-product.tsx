import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useProduct from "@/utils/hooks/useProduct";
import { notifications } from "@mantine/notifications";
import {useQuery,QueryFunctionContext} from "react-query";

export interface ProductType {
    product_id: string,
    product_name_vn?: string,
    product_name_eng?: string,
    product_name_de?: string,
    product_name_th?: string,
    product_name_cz?: string,
    product_code: string,
    dph?: number,
    description?: string,
    image_url: string,
    status?: string,
    sub_category_id?: string,
    minimum_order_quantity?: number,
    maximum_order_quantity?: number,
    reorder_level?: number,
    is_stackability?: boolean,
    temperature_requirement?: number,
    is_fragility?: boolean,
    shelf_life?: number,
    note?: string,
    season?: string,
    is_published?: boolean,
    published_at?: string,
    pre_order?: boolean,
    length?: number,
    width?: number,
    height?: number,
    cubic?: number,
    net_weight?: number,
    gross_weight?: number,
    total_quantity: number,
    brand_id?: string,
    brand_name?: string,
    total_count?: number,
}

const getAllProducts = async ({ queryKey }: QueryFunctionContext<[string, number, number, string]>): Promise<ProductType> => {
    const [_,limit,page,word] = queryKey;
    const res = await http.get(`${API_ENDPOINTS.PRODUCT}?limit=${limit}&page=${page}&word=${word}`);
    return res.data;
}

export const useFindAllProduct = (limit: number, page: number, word: string) => {
    const {updateProducts} = useProduct()
    return useQuery([API_ENDPOINTS.PRODUCT, limit, page, word], getAllProducts,{
        keepPreviousData: true,
        onSuccess: (data) => {
            updateProducts(data)
        },
        onError: (error) => {
            notifications.show({
                title: 'Lấy sản phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}