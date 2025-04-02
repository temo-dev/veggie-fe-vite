import { createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { ProductBaseDetailType, ProductBaseType } from "@/services/react-query/product/use-find-all-product";


export interface ProductState {
    products: ProductBaseType[],
    currentProductCode: string,
    currentProduct:ProductBaseDetailType | null
    totalCurrentProduct: number,
    exchange:any | null
}

const initialState:ProductState = {
    products:[],
    currentProductCode: '',
    totalCurrentProduct: 0,
    currentProduct:null,
    exchange:null
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
        setCurrentProductCode(state, action){
            state.currentProductCode = action.payload
        },
        setCurrentProduct(state,action){
            const {data} = action.payload
            state.currentProduct = data
        },
        setExchange(state,action){
            const {data} = action.payload
            state.exchange = data
        }
    }
})

export const { setAllProducts,setCurrentProductCode,setCurrentProduct,setExchange } = productSlice.actions
export default productSlice.reducer