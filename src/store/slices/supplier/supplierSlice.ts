import { createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { SupplierType } from "@/services/react-query/supplier/use-find-all-supplier";
import { set } from "lodash";


export interface SupplierState {
    suppliers: SupplierType[],
    currentSupplier: SupplierType | null
}

const initialState:SupplierState = {
    suppliers:[],
    currentSupplier:null
}

const supplierSlice = createSlice({
    name:`${SLICE_BASE_NAME}/supplier`,
    initialState,
    reducers: {
        setAllSuppliers(state, action){
            const {data} = action.payload
            state.suppliers = data
        },
        setCurrentSupplier(state, action){
            const {data} = action.payload
            state.currentSupplier = data
        }
    }
})

export const { setAllSuppliers,setCurrentSupplier } = supplierSlice.actions
export default supplierSlice.reducer