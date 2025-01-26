import { setAllSuppliers, useAppDispatch } from "@/store";

function useSupplier(){
    const dispatch = useAppDispatch()
    
    //update tags
    const updateSuppliers = (supplier: any) => {
        dispatch(setAllSuppliers(supplier))
    }
    return {
        updateSuppliers
    }
}

export default useSupplier