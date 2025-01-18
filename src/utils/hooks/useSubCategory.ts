import { setAllSubCategories, useAppDispatch } from "@/store";

function useSubCategory(){
    const dispatch = useAppDispatch()
    
    //update tags
    const updateSubCategories = (data: any) => {
        dispatch(setAllSubCategories(data))
    }
    return {
        updateSubCategories
    }
}

export default useSubCategory