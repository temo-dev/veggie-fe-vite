import { setAllBrands, useAppDispatch } from "@/store";

function useBrand(){
    const dispatch = useAppDispatch()
    
    //update tags
    const updateBrands = (tags: any) => {
        dispatch(setAllBrands(tags))
    }
    return {
        updateBrands
    }
}

export default useBrand