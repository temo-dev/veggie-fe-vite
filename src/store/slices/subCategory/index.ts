import { combineReducers } from "redux";
import subCategory, { SubCategoryState } from "./subCategorySlice";
const reducer = combineReducers({
    subCategory,
})


export type SubCategoryAllState = {
    subCategory: SubCategoryState
}

export * from './subCategorySlice'

export default reducer