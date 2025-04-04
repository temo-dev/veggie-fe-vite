import { API_ENDPOINTS } from '@/services/utils/api-endpoints';
import http from '@/services/utils/http';
import useProduct from '@/utils/hooks/useProduct';
import { notifications } from '@mantine/notifications';
import { useQuery, QueryFunctionContext } from 'react-query';

interface UnitType {
  unit_id: string;
  unit_name: string;
  quantity: number;
}

interface BatchType {
  batch_id: number;
  expiration_date: string;
  quantity: number;
  input_date: string;
  available: number;
}


interface PriceDetailType {
  name_zone:string,
  price_detail: PriceType
}

interface PriceType {
  price_net: number;
  price_gross: number;
  currency: string;
}

export interface ProductBaseType {
  product_abbr: string;
  product_name: string;
  product_name_vn: string;
  product_name_en: string;
  product_name_de: string;
  product_name_cs: string;
  image_url: string;
  origin: string;
  units: UnitType[];
  brand: string;
  article_code: string;
  group_k2: string;
  dph: number;
  base_unit: string;
  stock: number;
  batch: BatchType;
  price: PriceType;
  weight_net: number;
  weight_gross:number;
}

export interface ProductBaseDetailType{
  product_base : ProductBaseType,
  list_batch: BatchType[],
  list_price: PriceDetailType[]
}

const getAllProducts = async ({
  queryKey,
}: QueryFunctionContext<[string, string, number, string, string]>): Promise<
  ProductBaseType | any
> => {
  const [url, limit, page, word, condition] = queryKey;
  const res = await http.get(`${url}?limit=${limit}&page=${page}&abbr=${word}&cond=${condition}`);
  return res.data;
};

export const useFindProduct = (
  limit: string,
  page: number,
  word: string,
  valid: string | null,
  filter: string
) => {
  const { updateProducts } = useProduct();
  let url: string;
  let condition: string = '';
  if (word.length === 0) {
    switch (valid) {
      case 'all':
        url = API_ENDPOINTS.PRODUCT;
        break;
      case 'available':
        url = API_ENDPOINTS.PRODUCT_IN_STOCK;
        break;
      case 'sold':
        url = API_ENDPOINTS.PRODUCT_SOLD;
        break;
      case 'expired':
        url = API_ENDPOINTS.PRODUCT_OUT_EXP;
        condition = filter;
        break;
      case 'specialist':
        url = API_ENDPOINTS.PRODUCT_NON_EXP;
        break;
      case 'new':
        url = API_ENDPOINTS.PRODUCT_NEW;
        condition = filter;
        break;
      default:
        url = API_ENDPOINTS.PRODUCT;
        break;
    }
  } else {
    url = API_ENDPOINTS.PRODUCT_SEARCH_NAME;
  }
  return useQuery([url, limit, page, word, condition], getAllProducts, {
    keepPreviousData: true,
    onSuccess: (data) => {
      updateProducts(data);
    },
    onError: (error) => {
      notifications.show({
        title: 'Lỗi sản phẩm xảy ra lỗi',
        message: String(error),
        color: 'red',
        autoClose: 5000,
      });
    },
  });
};
