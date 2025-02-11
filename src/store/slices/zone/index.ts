import { combineReducers } from "redux";
import zone, { ZoneState } from "./zoneSlice";
const reducer = combineReducers({
    zone,
})


export type ZoneAllState = {
    zone: ZoneState
}

export * from './zoneSlice'

export default reducer