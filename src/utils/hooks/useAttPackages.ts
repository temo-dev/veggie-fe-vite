import { setAllPackages, useAppDispatch } from "@/store";

function useAttPackage(){
    const dispatch = useAppDispatch()
    
    //update tags
    const updateAttPackages = (packages: any) => {
        dispatch(setAllPackages(packages))
    }
    return {
        updateAttPackages
    }
}

export default useAttPackage