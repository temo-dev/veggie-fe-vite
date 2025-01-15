import { combineReducers } from "redux";
import category, { CategoryState } from "./categorySlice";
const reducer = combineReducers({
    category,
})


export type CategoryAllState = {
    category: CategoryState
}

export * from './categorySlice'

export default reducer