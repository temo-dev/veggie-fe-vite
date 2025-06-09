export const switchExchange = (value: number, currency: string, exchange:any) => {
      let price = 0;
      if (value !== null) {
        switch (currency?.toLowerCase()) {
          case 'czk':
            price = value / exchange?.value_czk;
            break;
          case 'usd':
            price = value / exchange?.value_usd;
            break;
          case 'eur':
            price = value / exchange?.value_eur;
            break;
          case 'thb':
            price = value / exchange?.value_th;
            break;
          case 'krw':
            price = value / exchange?.value_kr;
            break;
          case 'sek':
            price = value / exchange?.value_sek;
            break;
          default:
            price = value / exchange?.value_czk;
            break;
        }
      }
      return price;
    };