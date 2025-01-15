import { combineReducers } from "redux";
import attPackage, { AttPackageState } from "./packageSlice";

const reducer = combineReducers({
    attPackage,
})


export type PackageAllState = {
    attPackage: AttPackageState
}

export * from './packageSlice'

export default reducer