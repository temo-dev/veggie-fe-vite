import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import { notifications } from "@mantine/notifications";
import { useMutation } from "react-query";


export interface ImportExcelType {
    to_table: string,
    excel_url: string
}

const importByExel = async (input: ImportExcelType) => {
    const res = await http.post(API_ENDPOINTS.IMPORT_EXCEL, input)
    return res.data
}

export const useImportExcel = () => {
    return useMutation((input: ImportExcelType)=> importByExel(input),{
        onSuccess:(data) =>{
            notifications.show({
                title: 'Đang import data từ excel file',
                message: `${data.message}`,
                color: 'green',
                autoClose: 5000,
            })
        },
        onError:(error) =>{
            notifications.show({
                title: 'Import data từ excel file đã xảy ra lỗi',
                message: String(error),
                color: 'red',
                autoClose: 5000,
            })
        }
    })
}