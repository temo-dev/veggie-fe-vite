import { createSlice } from '@reduxjs/toolkit';
import { SLICE_BASE_NAME } from './constants';
import { ReportPieChartType } from '@/services/react-query/report/use-get-total-product';

export type ReportState = {
  reportTotalProduct: ReportPieChartType[];
};

export const initialState: ReportState = {
  reportTotalProduct:[]
};

export const reportSlice = createSlice({
  name: `${SLICE_BASE_NAME}/report`,
  initialState,
  reducers: {
    setReportTotalProduct(state, action){
      const {data} = action.payload
      state.reportTotalProduct = data
    }
  },
});

export const { setReportTotalProduct } = reportSlice.actions;

export default reportSlice.reducer;
