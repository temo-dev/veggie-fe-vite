import { createSlice } from '@reduxjs/toolkit';
import { SLICE_BASE_NAME } from './constants';
import { ReportPieChartType } from '@/services/react-query/report/use-get-total-product';
import { s } from 'vite/dist/node/types.d-aGj9QkWt';

export type ReportState = {
  reportTotalProduct: ReportPieChartType[];
  totalProduct: number;
  reportNumberProduct: ReportPieChartType[];
};

export const initialState: ReportState = {
  reportTotalProduct: [],
  totalProduct: 0,
  reportNumberProduct: [],
};

export const reportSlice = createSlice({
  name: `${SLICE_BASE_NAME}/report`,
  initialState,
  reducers: {
    setReportTotalProduct(state, action) {
      const { data } = action.payload;
      state.reportNumberProduct = data;
      let array: ReportPieChartType[];
      let total = 0;
      array = data.filter((report: ReportPieChartType) => {
        if (report.name == 'available' || report.name == 'sold' || report.name == 'block') {
          total += report.value;
          return report;
        }
      });
      state.totalProduct = total;
      state.reportTotalProduct = array;
    },
  },
});

export const { setReportTotalProduct } = reportSlice.actions;

export default reportSlice.reducer;
