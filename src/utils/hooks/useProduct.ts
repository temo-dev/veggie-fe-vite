import { setAllProducts, useAppDispatch } from "@/store";

function useProduct(){
    const dispatch = useAppDispatch()
    
    //update product
    const updateProducts = (product:any) => {
        dispatch(setAllProducts(product))
    }
    //return functions
    return {
        updateProducts
    }
}

export default useProduct