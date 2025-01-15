import { createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { CurrencyType } from "@/services/react-query/currency/use-find-all-currency";


export interface CurrencyState {
    currencies: CurrencyType[],
    isUpdate: boolean
}

const initialState:CurrencyState = {
    currencies:[],
    isUpdate: false
}

const currencySlice = createSlice({
    name:`${SLICE_BASE_NAME}/currency`,
    initialState,
    reducers: {
        setAllCurrencies(state, action){
            const {data} = action.payload
            state.currencies = data
        },
        setIsUpdate(state, action){
            state.isUpdate = action.payload
        }
    }
})

export const { setAllCurrencies,setIsUpdate } = currencySlice.actions
export default currencySlice.reducer