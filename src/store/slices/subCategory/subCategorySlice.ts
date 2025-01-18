import { createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { SubCategoryType } from "@/services/react-query/subCategory/use-find-subCategory";


export interface SubCategoryState {
    subCategories: SubCategoryType[],
}

const initialState:SubCategoryState = {
    subCategories:[]
}

const subCategorySlice = createSlice({
    name:`${SLICE_BASE_NAME}/subCategory`,
    initialState,
    reducers: {
        setAllSubCategories(state, action){
            const {data} = action.payload
            state.subCategories = data
        },
    }
})

export const { setAllSubCategories } = subCategorySlice.actions
export default subCategorySlice.reducer