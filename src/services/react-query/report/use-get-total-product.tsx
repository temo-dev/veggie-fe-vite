import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useReport from "@/utils/hooks/useReport";
import { notifications } from "@mantine/notifications";
import {useQuery} from "react-query";



export interface ReportPieChartType {
    name: string,
    value: number
}

const getReportTotalProducts = async () :Promise<ReportPieChartType[] | any> => {
    const res = await http.get(`${API_ENDPOINTS.REPORT_TOTAL_PRODUCT}`);
    return res.data;
}

export const useReportTotalProduct = () => {
    const {updateProreportTotalProductducts} = useReport()
    return useQuery([API_ENDPOINTS.REPORT_TOTAL_PRODUCT], getReportTotalProducts,{
            keepPreviousData: true,
            onSuccess: (data) => {
                updateProreportTotalProductducts(data)
            },
            onError: (error) => {
                notifications.show({
                    title: 'Lấy báo cáo số lượng sản phẩm',
                    message: String(error),
                    color: 'red',
                    autoClose: 5000,
                })
            }
        })
}