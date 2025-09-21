import axios from "axios";

const COINGECKO_URL = "https://api.coingecko.com/api/v3/simple/price";

export async function getTokenPrices() {
  const ids = ["bitcoin", "ethereum", "degen-base", "aerodrome-finance"];
  const res = await axios.get(COINGECKO_URL, {
    params: {
      ids: ids.join(","),
      vs_currencies: "usd",
      include_24hr_change: true
    }
  });
  return res.data;
}
