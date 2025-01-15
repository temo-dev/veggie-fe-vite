import { combineReducers } from "redux";
import tag, { TagState } from "./tagSlice";
const reducer = combineReducers({
    tag,
})


export type TagAllState = {
    tag: TagState
}

export * from './tagSlice'

export default reducer