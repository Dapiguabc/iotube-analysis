import axios from "axios";

export type ConinPriceResponse = {
  data: {
    [id: string]: {
      usd: number,
      usd_24h_change: number
    }
  }
}

export async function fetchCoinPrice(ids: string, vsCurrencies: string): Promise<ConinPriceResponse> {
  const url = "https://api.coingecko.com/api/v3/simple/price";
  const res = axios.get(url, {
          params: {
              ids: ids,
              vs_currencies: vsCurrencies,
              include_24hr_change: true,
          }
        });
  return res;
}
