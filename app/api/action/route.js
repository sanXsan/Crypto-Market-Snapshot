import { NextResponse } from "next/server";

const COINGECKO =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,degen-base,aerodrome-finance&vs_currencies=usd";
const BASESCAN = "https://api.basescan.org/api";

async function jfetch(url) {
  const res = await fetch(url, { next: { revalidate: 30 } });
  return res.json();
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const view = searchParams.get("view") || "btceth";

    const prices = await jfetch(COINGECKO);
    const btc = prices.bitcoin?.usd || "N/A";
    const eth = prices.ethereum?.usd || "N/A";
    const degen = prices["degen-base"]?.usd || "N/A";
    const aero = prices["aerodrome-finance"]?.usd || "N/A";

    const gasData = await jfetch(`${BASESCAN}?module=proxy&action=eth_gasPrice`);
    const gasGwei = gasData.result
      ? (parseInt(gasData.result, 16) / 1e9).toFixed(2)
      : "N/A";

    let title = "📊 Base Market Snapshot";
    let desc = "Select option";

    switch (view) {
      case "btceth":
        title = "BTC & ETH";
        desc = `BTC: $${btc} • ETH: $${eth}`;
        break;
      case "degen":
        title = "💎 DEGEN";
        desc = `Price: $${degen}`;
        break;
      case "aero":
        title = "🌀 AERO";
        desc = `Price: $${aero}`;
        break;
      case "gas":
        title = "⛽ Gas Fee";
        desc = `${gasGwei} gwei`;
        break;
      case "wallets":
        title = "👛 Wallet Stats";
        desc = "Feature coming soon...";
        break;
    }

    return NextResponse.json({ title, desc });
  } catch (err) {
    console.error("Market API error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
