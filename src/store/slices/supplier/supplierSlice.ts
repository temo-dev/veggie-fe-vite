import { createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { SupplierType } from "@/services/react-query/supplier/use-find-all-supplier";


export interface SupplierState {
    suppliers: SupplierType[],
}

const initialState:SupplierState = {
    suppliers:[]
}

const supplierSlice = createSlice({
    name:`${SLICE_BASE_NAME}/supplier`,
    initialState,
    reducers: {
        setAllSuppliers(state, action){
            const {data} = action.payload
            state.suppliers = data
        },
    }
})

export const { setAllSuppliers } = supplierSlice.actions
export default supplierSlice.reducer