import { createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { BrandType } from "@/services/react-query/brand/use-find-all-brand";


export interface BrandState {
    brands: BrandType[],
}

const initialState:BrandState = {
    brands:[]
}

const brandSlice = createSlice({
    name:`${SLICE_BASE_NAME}/brand`,
    initialState,
    reducers: {
        setAllBrands(state, action){
            const {data} = action.payload
            state.brands = data
        },
    }
})

export const { setAllBrands } = brandSlice.actions
export default brandSlice.reducer