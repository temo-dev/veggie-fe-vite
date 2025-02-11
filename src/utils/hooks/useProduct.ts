import { setAllProducts, useAppDispatch, setCurrentProduct } from "@/store";

function useProduct(){
    const dispatch = useAppDispatch()
    
    //update product
    const updateProducts = (product:any) => {
        dispatch(setAllProducts(product))
    }
    //update current product
    const updateCurrentProduct = (product: any) => {
        dispatch(setCurrentProduct(product))
    }
    //return functions
    return {
        updateProducts,
        updateCurrentProduct
    }
}

export default useProduct