import { combineReducers } from '@reduxjs/toolkit'
import report, { ReportState } from './reportSlice'

const reducer = combineReducers({
  report,
})

export type ReportAllState = {
  report: ReportState
}

export * from './reportSlice'

export default reducer
