import { createSlice } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { PackageType } from "@/services/react-query/attPackage/use-find-all-package";


export interface AttPackageState {
    attPackages: PackageType[],
}

const initialState:AttPackageState = {
    attPackages:[]
}

const attPackageSlice = createSlice({
    name:`${SLICE_BASE_NAME}/attPackage`,
    initialState,
    reducers: {
        setAllPackages(state, action){
            const {data} = action.payload
            state.attPackages = data
        },
    }
})

export const { setAllPackages } = attPackageSlice.actions
export default attPackageSlice.reducer