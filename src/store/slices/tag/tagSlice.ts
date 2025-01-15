import { createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { TagType } from "@/services/react-query/tag/use-find-all-tag";


export interface TagState {
    tags: TagType[],
}

const initialState:TagState = {
    tags:[]
}

const tagSlice = createSlice({
    name:`${SLICE_BASE_NAME}/tag`,
    initialState,
    reducers: {
        setAllTags(state, action){
            const {data} = action.payload
            state.tags = data
        },
    }
})

export const { setAllTags } = tagSlice.actions
export default tagSlice.reducer