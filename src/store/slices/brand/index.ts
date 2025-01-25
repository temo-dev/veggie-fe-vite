import { combineReducers } from "redux";
import brand, { BrandState } from "./brandSlice";
const reducer = combineReducers({
    brand,
})


export type BrandAllState = {
    brand: BrandState
}

export * from './brandSlice'

export default reducer