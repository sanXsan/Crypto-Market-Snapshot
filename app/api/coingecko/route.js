import { NextResponse } from "next/server";

const COINGECKO_URL = "https://api.coingecko.com/api/v3/simple/price";

// ===== Helper =====
async function getTokenPrices() {
  const ids = ["bitcoin", "ethereum", "degen-base", "aerodrome-finance"];
  const url = new URL(COINGECKO_URL);
  url.searchParams.set("ids", ids.join(","));
  url.searchParams.set("vs_currencies", "usd");
  url.searchParams.set("include_24hr_change", "true");

  const res = await fetch(url.toString(), { next: { revalidate: 60 } }); // cache 1 menit
  return res.json();
}

// ===== API Route =====
export async function GET() {
  try {
    const data = await getTokenPrices();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Coingecko error:", err);
    return NextResponse.json({ error: "Failed to fetch from CoinGecko" }, { status: 500 });
  }
}
