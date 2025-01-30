import { setAllSuppliers, useAppDispatch,setCurrentSupplier } from "@/store";

function useSupplier(){
    const dispatch = useAppDispatch()
    
    //update suppliers
    const updateSuppliers = (supplier: any) => {
        dispatch(setAllSuppliers(supplier))
    }
     //update current supplier
     const updateCurrentSupplier = (supplier: any) => {
        dispatch(setCurrentSupplier(supplier))
    }
    return {
        updateSuppliers,
        updateCurrentSupplier
    }
}

export default useSupplier