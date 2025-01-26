import { combineReducers } from "redux";
import product, { ProductState } from "./productSlice";
const reducer = combineReducers({
    product,
})


export type ProductAllState = {
    product: ProductState
}

export * from './productSlice'

export default reducer