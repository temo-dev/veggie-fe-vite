import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useProduct from "@/utils/hooks/useProduct";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";

export interface CreateProductInput {
    brand_id: string;
    cubic: number;
    description: string;
    dph: number;
    gross_weight: number;
    height: number;
    image_url: string;
    is_fragility: boolean;
    is_published?: boolean;
    is_stackability: boolean;
    length: number;
    maximum_order_quantity: number;
    minimum_order_quantity: number;
    net_weight: number;
    note: string;
    pre_order: boolean;
    product_code: string;
    product_name_de: string;
    product_name_eng: string;
    product_name_th: string;
    product_name_vn: string;
    product_name_cz: string;
    reorder_level: number;
    season: string;
    shelf_life: number;
    status: string;
    sub_category_id: string;
    temperature_requirement: number;
    total_quantity: number;
    width: number;
}

const createNewProduct = async (input: CreateProductInput) => {
    const res = await http.post(API_ENDPOINTS.PRODUCT, input);
    return res.data;
}

export const useCreateNewProduct = () => {
    const queryClient = useQueryClient();
    const {updateProducts} = useProduct()
    return useMutation((input: CreateProductInput)=> createNewProduct(input),{
        onSuccess:(data) =>{
            notifications.show({
                title: 'Tạo sản phẩm Thành Công',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
            queryClient.invalidateQueries(API_ENDPOINTS.PRODUCT).then(()=>{
                const data = queryClient.getQueryData(API_ENDPOINTS.PRODUCT);
                updateProducts(data)
            });
        },
        onError:(error) =>{
            notifications.show({
                title: 'Tạo sản phẩm xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}