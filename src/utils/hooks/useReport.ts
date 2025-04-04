import {  setReportTotalProduct, useAppDispatch } from "@/store";

function useReport(){
    const dispatch = useAppDispatch()
    
    //update product
    const updateProreportTotalProductducts = (report:any) => {
        dispatch(setReportTotalProduct(report))
    }
    //return functions
    return {
        updateProreportTotalProductducts,
    }
}

export default useReport