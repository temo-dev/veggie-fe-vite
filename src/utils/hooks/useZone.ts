import { setAllZones, setCurrentZone, useAppDispatch } from "@/store";

function useZone(){
    const dispatch = useAppDispatch()
    
    //update tags
    const updateZones = (zones: any) => {
        dispatch(setAllZones(zones))
    }
    //update current zone
        const updateCurrentZone = (zone: any) => {
            dispatch(setCurrentZone(zone))
        }
    return {
        updateZones,
        updateCurrentZone
    }
}

export default useZone