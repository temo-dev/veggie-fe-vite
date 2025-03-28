import { createSlice } from '@reduxjs/toolkit';
import { SLICE_BASE_NAME } from './constants';
import { ReportPieChartType } from '@/services/react-query/report/use-get-total-product';

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
      array = data.filter((report: ReportPieChartType) => {
        if (report.name == 'all') {
          state.totalProduct = report.value;
        }
        if (report.name == 'available' || report.name == 'sold') {
          return report;
        }
      });
      state.reportTotalProduct = array;
    },
  },
});

export const { setReportTotalProduct } = reportSlice.actions;

export default reportSlice.reducer;
