import { setAllTags, useAppDispatch } from "@/store";

function useTag(){
    const dispatch = useAppDispatch()
    
    //update tags
    const updateTags = (tags: any) => {
        dispatch(setAllTags(tags))
    }
    return {
        updateTags
    }
}

export default useTag