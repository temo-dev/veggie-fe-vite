
import { setAllProducts, useAppDispatch,setCurrentProductCode,setCurrentProduct, setExchange } from "@/store";

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
    const updateExchange = (exchange:any) =>{
        dispatch(setExchange(exchange))
    }
    //return functions
    return {
        updateProducts,
        updateCurrentProductCode,
        updateCurrentProduct,
        updateExchange
    }
}

export default useProduct