import { NextResponse } from "next/server";

const BASESCAN_API = "https://api.basescan.org/api";
const API_KEY = process.env.BASESCAN_KEY; // ambil dari .env

// ===== Helpers =====
async function fetchBasescan(params) {
  const url = new URL(BASESCAN_API);
  Object.entries({ ...params, apikey: API_KEY }).forEach(([k, v]) =>
    url.searchParams.append(k, v)
  );
  const res = await fetch(url.toString());
  return res.json();
}

// Ambil total tx harian
async function getDailyTxCount() {
  const data = await fetchBasescan({ module: "stats", action: "dailytxn" });
  return data?.result || [];
}

// Ambil gas rata-rata
async function getGasAverage() {
  const data = await fetchBasescan({ module: "proxy", action: "eth_gasPrice" });
  if (!data?.result) return null;
  return (parseInt(data.result, 16) / 1e9).toFixed(2);
}

// Jumlah wallet aktif
async function getActiveWallets() {
  const data = await fetchBasescan({
    module: "stats",
    action: "dailyactiveusers",
  });
  return data?.result || [];
}

// ===== API Route =====
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "gas";

    let result;
    switch (type) {
      case "tx":
        result = await getDailyTxCount();
        break;
      case "gas":
        result = await getGasAverage();
        break;
      case "wallets":
        result = await getActiveWallets();
        break;
      default:
        result = { error: "Invalid type. Use ?type=tx|gas|wallets" };
    }

    return NextResponse.json({ type, result });
  } catch (err) {
    console.error("Basescan error:", err);
    return NextResponse.json({ error: "Failed to fetch from Basescan" }, { status: 500 });
  }
}
