import { useQuery } from "react-query";
import {toPairs} from 'lodash'

//["USD", "2023-01-01", 0.04060],
//{date:{USD:0.04060,USD:0.04060,USD:0.04060,USD:0.04060}}
const getExchangeCurrency = async () => {
    try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/fa0bf4264f147665fcd2f2fa/latest/CZK`)
        let ex = await res.json()
        //xu ly thuat toan
        let result = []
        console.log('ex',ex)
        let obj = toPairs(ex?.rates)
        for (let i = 0; i < obj.length; i++) {
            let data = ['','',0]
            const element = obj[i];
            data[1] = element[0]
            let exchange = toPairs(element[1] as object)
            console.log('exchange',exchange)
            for (let j = 0; j < exchange.length; j++) {
                const value = exchange[j];
                console.log('value',value)
                switch (value[0]) {
                    case 'EUR':
                        data[0] = 'EUR'
                        data[2] = (1/value[1]).toFixed(2)
                        break;
                    case 'JPY':
                        data[0] = 'JPY'
                        data[2] = (1/value[1]*100).toFixed(2)
                        break;
                    case 'KRW':
                        data[0] = 'KRW'
                        data[2] = (1/value[1]*100).toFixed(2)
                        break;
                    case 'THB':
                        data[0] = 'THB'
                        data[2] = (1/value[1]*100).toFixed(2)
                        break;
                    default:
                        data[0] = 'USD'
                        data[2] = (1/value[1]).toFixed(2)
                        break;
                }
                console.log('data',data)
                result.push(data)
            }
        }
        return result
    } catch (error) {
        return error
    }
}

export const useExchangeCurrencyQuery = () => {
    return useQuery('exchange-currency', getExchangeCurrency);
}