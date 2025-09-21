import axios from "axios";

const BASESCAN_API = "https://api.basescan.org/api";
const API_KEY = process.env.BASESCAN_KEY; // ambil dari .env

// Ambil total tx harian (contoh pakai stats endpoint)
export async function getDailyTxCount() {
  const res = await axios.get(`${BASESCAN_API}`, {
    params: {
      module: "stats",
      action: "dailytxn",
      apikey: API_KEY
    }
  });
  return res.data?.result || [];
}

// Ambil gas rata-rata
export async function getGasAverage() {
  const res = await axios.get(`${BASESCAN_API}`, {
    params: {
      module: "proxy",
      action: "eth_gasPrice",
      apikey: API_KEY
    }
  });
  const gwei = parseInt(res.data.result, 16) / 1e9;
  return gwei.toFixed(2);
}

// Jumlah wallet aktif (estimasi via unique address count)
export async function getActiveWallets() {
  const res = await axios.get(`${BASESCAN_API}`, {
    params: {
      module: "stats",
      action: "dailyactiveusers",
      apikey: API_KEY
    }
  });
  return res.data?.result || [];
}
