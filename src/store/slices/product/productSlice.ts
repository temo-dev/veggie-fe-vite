import { createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { ProductType } from "@/services/react-query/product/use-find-all-product";


export interface ProductState {
    products: ProductType[],
    currentProduct: ProductType | null
}

const initialState:ProductState = {
    products:[],
    currentProduct: null
}

const productSlice = createSlice({
    name:`${SLICE_BASE_NAME}/product`,
    initialState,
    reducers: {
        setAllProducts(state, action){
            const {data} = action.payload
            state.products = data
        },
        setCurrentProduct(state, action){
            state.currentProduct = action.payload
        }
    }
})

export const { setAllProducts, setCurrentProduct } = productSlice.actions
export default productSlice.reducer