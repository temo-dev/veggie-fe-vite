import { createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { ProductBaseType } from "@/services/react-query/product/use-find-all-product";


export interface ProductState {
    products: ProductBaseType[],
    currentProduct: ProductBaseType | null
    totalCurrentProduct: number
}

const initialState:ProductState = {
    products:[],
    currentProduct: null,
    totalCurrentProduct: 0,
}

const productSlice = createSlice({
    name:`${SLICE_BASE_NAME}/product`,
    initialState,
    reducers: {
        setAllProducts(state, action){
            const {data,total} = action.payload
            state.products = data
            state.totalCurrentProduct = total
        },
        setCurrentProduct(state, action){
            state.currentProduct = action.payload
        }
    }
})

export const { setAllProducts, setCurrentProduct } = productSlice.actions
export default productSlice.reducer