import { combineReducers } from "redux";
import currency, { CurrencyState } from "./currencySlice";
const reducer = combineReducers({
    currency,
})


export type CurrencyAllState = {
    currency: CurrencyState
}

export * from './currencySlice'

export default reducer