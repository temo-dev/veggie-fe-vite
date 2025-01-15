import { setAllCategories, useAppDispatch } from "@/store";

function useCategory(){
    const dispatch = useAppDispatch()
    
    //update tags
    const updateCategories = (data: any) => {
        dispatch(setAllCategories(data))
    }
    return {
        updateCategories
    }
}

export default useCategory