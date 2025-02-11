import { createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { ZoneType } from "@/services/react-query/zone/use-find-all-zone";



export interface ZoneState {
    zones: ZoneType[],
    currentZone: ZoneType | null
}

const initialState:ZoneState = {
    zones:[],
    currentZone: null
}

const zoneSlice = createSlice({
    name:`${SLICE_BASE_NAME}/zone`,
    initialState,
    reducers: {
        setAllZones(state, action){
            const {data} = action.payload
            state.zones = data
        },
        setCurrentZone(state, action){
            state.currentZone = action.payload
        }
    }
})

export const { setAllZones,setCurrentZone } = zoneSlice.actions
export default zoneSlice.reducer