import { setAllCurrencies, useAppDispatch } from "@/store";

function useCurrency(){
    const dispatch = useAppDispatch()
    
    //update currencies
    const updateCurrencies = (currencies: any) => {
        dispatch(setAllCurrencies(currencies))
    }
    return {
        updateCurrencies
    }
}

export default useCurrency