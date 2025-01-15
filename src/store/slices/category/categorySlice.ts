import { createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { CategoryType } from "@/services/react-query/category/use-find-all-category";


export interface CategoryState {
    categories: CategoryType[],
}

const initialState:CategoryState = {
    categories:[]
}

const categorySlice = createSlice({
    name:`${SLICE_BASE_NAME}/category`,
    initialState,
    reducers: {
        setAllCategories(state, action){
            const {data} = action.payload
            state.categories = data
        },
    }
})

export const { setAllCategories } = categorySlice.actions
export default categorySlice.reducer