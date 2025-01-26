import { combineReducers } from "redux";
import supplier, { SupplierState } from "./supplierSlice";
const reducer = combineReducers({
    supplier,
})

export type SupplierAllState = {
    supplier: SupplierState
}

export * from './supplierSlice'

export default reducer