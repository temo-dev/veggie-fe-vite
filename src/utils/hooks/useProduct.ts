
import { setAllProducts, useAppDispatch,setCurrentProductCode,setCurrentProduct } from "@/store";

function useProduct(){
    const dispatch = useAppDispatch()
    
    //update product
    const updateProducts = (product:any) => {
        dispatch(setAllProducts(product))
    }
    const updateCurrentProductCode = (product:string) =>{
        dispatch(setCurrentProductCode(product))
    }
    const updateCurrentProduct = (product:any) =>{
        dispatch(setCurrentProduct(product))
    }
    //return functions
    return {
        updateProducts,
        updateCurrentProductCode,
        updateCurrentProduct
    }
}

export default useProduct