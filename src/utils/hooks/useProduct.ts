import { useFindAllProduct } from "@/services/react-query/product/use-find-all-product";
import { setAllProducts, useAppDispatch } from "@/store";

function useProduct(){
    const dispatch = useAppDispatch()
    
    //update tags
    const updateProducts = (product: any) => {
        dispatch(setAllProducts(product))
    }
    return {
        updateProducts
    }
}

export default useProduct